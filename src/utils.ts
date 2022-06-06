import { MessageEmbed } from 'discord.js';
import { Job } from './types';

const unwantedTitles = [
    'II',
    'Manager',
    'Sr',
    'Staff',
    'Senior',
    '2',
    'Lead',
];

export function createDiscordMessage(job: Job) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`New Job opening at ${job.companyName}`)
        .setURL(job.url)
        .setDescription(job.name)
        .addField('JobID', job.id, true)
        .addField('Location', job.location, true);

    return embed;
}

export function filterUnwantedRoles(jobs: Job[]) {
    return jobs.filter(job => {
        for (const unwantedTitle of unwantedTitles) {
            if (job.name.toLowerCase().includes(unwantedTitle.toLowerCase()))
                return false;
        }
        return true;
    });
}
