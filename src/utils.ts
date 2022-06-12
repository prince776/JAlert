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

const unwantedJDs = [
    '2+ years',
    '1+ years',
    '2 years',
    '1 year',
    '2 yoe',
    '1 yoe',
    '2+ yoe',
    '1+ yoe',
]

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
        for (const unwantedJD of unwantedJDs) {
            if (job.jd.toLowerCase().includes(unwantedJD.toLowerCase()))
                return false;
        }
        return true;
    });
}
