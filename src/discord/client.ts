import {
    ActivityType,
    Client,
    GatewayIntentBits,
    Options,
    Partials
} from 'discord.js'
import { em } from '../common.js'
import { sendToChannel, subscribeToChannel } from '../gun.js'

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

const guilds: any = {}
const cache: any = {}

client.once('ready', async () => {
    let total = 0
    client.guilds.cache.map((guild) => {
        const guildName = guild.name.toLowerCase()
        guilds[guildName] = guild
        cache[guildName] = []
        subscribeToChannel(guild.name.toLowerCase())
        total++
    })
    client.user?.setPresence({ activities: [{ type: ActivityType.Watching, name: `${total} servers...` }], status: 'dnd' });
})

em.on('receiveBullet', function (data) {
    const bullet = JSON.parse(data)
    const guildName = bullet.focus?.toLowerCase() || 'trade'
    const guild = guilds[guildName]
    if (!guild?.systemChannelId) return
    const channel = client.channels.cache.get(guild.systemChannelId)
    cache[guildName].push(bullet.message)
    // @ts-expect-error
    channel?.send(bullet.message)
})

client.on('messageCreate', async (message) => {
    const focus = message.guild?.name.toLowerCase() || 'trade'
    if (cache[focus].includes(message.content)) return
    while (cache[focus].length > 3) cache[focus].shift()
    const data: Bullet = {
        message: message.content,
        identifier: message.author.id,
        focus,
        mode: 'cos',
        pubKey: null
    }
    sendToChannel(data)
})
