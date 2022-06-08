const dotenv = require('dotenv');
dotenv.config();

import { Company, Handler, Job } from "./types";
import mongoose from 'mongoose';
import JobModel from "./models/job";

import { getClient as getDiscordClient, sendMessage as sendDiscordMessage } from './bots/discord';

import { createDiscordMessage, filterUnwantedRoles } from "./utils";
import { Client } from "discord.js";

// Handlers
import googleHandler from "./handlers/GoogleHandler";
import bharatPeHandler from "./handlers/BharatPeHandler";
import sharechatHandler from "./handlers/SharechatHandler";
import uberHandler from "./handlers/UberHandler";
import amazonHandler from "./handlers/AmazonHandler";

const db = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
};

mongoose.connect(`mongodb+srv://${db.user}:${db.pass}@mongodb-cluster.5gkbu.mongodb.net/JAlert?retryWrites=true&w=majority`);
let discordClient: Client;

const handlers: Handler[] = [
    googleHandler,
    bharatPeHandler,
    sharechatHandler,
    uberHandler,
    amazonHandler,
];

async function main() {
    discordClient = await getDiscordClient();
    for (const handler of handlers) {
        try {
            const allNewJobs = await handler.getJobs();
            const newJobs = await postProcessJobs(allNewJobs);
            await updateJobs(newJobs, handler.company);
        } catch (err: any) {
            console.log(`Error processing jobs for ${handler.company.name}: ${err}`);
        }
    }
    console.log("Starting cleanup");
    await cleanUp();
    console.log("Cleanup Finished");
}

async function postProcessJobs(jobs: Job[]) {
    return filterUnwantedRoles(jobs);
}

async function updateJobs(jobs: Job[], company: Company) {
    // Get prev jobs
    const prevJobs: Job[] = await JobModel.find({
        companyName: company.name
    }).exec();
    const prevJobIds = new Set<string>();
    prevJobs.forEach(job => prevJobIds.add(job.id));

    // Get diff
    const newJobs = jobs.filter(job => !prevJobIds.has(job.id));

    // Cleanup all old jobs, and add the ones we got in this fetch
    await JobModel.deleteMany({ companyName: company.name });
    for (const job of jobs) {
        const newJob = new JobModel(job);
        await newJob.save();
    }

    // alert about new jobs
    await sendNotifications(newJobs, company);
}

async function sendNotifications(jobs: Job[], company: Company) {
    // Send discord messages.
    console.log("Sending notifications for:", company.name, jobs.length);
    for (const job of jobs) {
        await sendDiscordMessage(discordClient, createDiscordMessage(job));
    }
}

async function cleanUp() {
    mongoose.disconnect();
    discordClient.destroy();
}

main();
