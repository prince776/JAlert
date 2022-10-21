# Automated Job Alerts: JAlert

This project is an effort to automate alerts for as many job openings as possible, to help job seekers.

![](https://media.discordapp.net/attachments/912603519054401539/983092035886129182/unknown.png)

## Get started

If you want to get alerts from this bot, you can join the following discord server:

[Invite Link](https://discord.gg/wDSm86keTU) (Then React to Dyno bot to get `job-seeker` role in `read-first` channel)

Bots on more platforms like twitter will come out soon.

I also plan to add wekhooks for anyone wanting to use the data of this system.

_Note: For now most role fetched are targetted to be for undergratuates/<1 yoe (Since spamming with higher level roles doesn't make sense)_

## Currently supported companies

- Google
- Sharechat
- BharatPe
- Uber
- Amazon
- Microsoft

Feel free to contribute to add more companies

## How to contribute

Please make an issue on feature you wish to work on, and I'll assign that to you so as to avoid duplicate efforts.

## Development

### Setup

```
git clone https://github.com/prince776/JAlert.git
cd JAlert
npm i
```

Now copy `.env.example` into `.env` (create new file).

In `src/index.ts`: Change the `mongoose.connect` line to: (keep this change locally only)

```
mongoose.connect(`mongodb+srv://${db.user}:${db.pass}@cluster0.robkk.mongodb.net/test?retryWrites=true&w=majority`);
```

and use the following env variables:

```
DB_USER=jalertTest
DB_PASS=SqR6aKGF4rCbMpxl
DISCORD_BOT_TOKEN=PUT_YOUR_OWN_BOT_TOKEN
DISCORD_CHANNEL_ID=PUT_YOUR_OWN_CHANNEL_ID
DISCORD_ROLE_ID=PUT_YOUR_OWN_ROLE_ID
```

You don't really need to use ur own discord env variables if you are not making any change in the bot.

For adding a new company's handler, follow the format from other files, you just need to add a handle and then add it into handlers list in `index.ts`
