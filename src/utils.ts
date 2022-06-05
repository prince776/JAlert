import { MessageEmbed } from 'discord.js';
import { Job } from './types';
import { data as discordData } from './bots/discord';

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
