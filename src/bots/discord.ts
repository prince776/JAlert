// Require the necessary discord.js classes
import { Client, Intents, TextChannel } from 'discord.js';

const data = {
    channelID: process.env.DISCORD_CHANNEL_ID,
    roleID: process.env.DISCORD_ROLE_ID,
};

export async function getClient() {
    const token = process.env.DISCORD_BOT_TOKEN;
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    await client.login(token);
    await new Promise(resolve => {
        client.on('ready', () => {
            resolve(0);
        })
    });
    return client;
}

export async function sendMessage(client: Client, message: string) {
    const channel = client.channels.cache.find(ch => ch.id === data.channelID);
    if (channel?.isText()) {
        await (<TextChannel>channel).send(`<@&${data.roleID}> ${message}`)
    }
}

export {
    data,
};
