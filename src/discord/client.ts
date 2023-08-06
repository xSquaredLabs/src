import {
    Client,
    GatewayIntentBits,
    Options,
    Partials
} from 'discord.js'

const token = process.env.DISCORDTOKEN

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
    partials: [Partials.Message, Partials.Channel],
    shards: 'auto',
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        ReactionManager: 0
    })
})

client.login(token as string)

client.once('ready', async () => {
    console.log('hello world')
})

client.on('messageCreate', async (message) => {
    console.log(message.content)
})
