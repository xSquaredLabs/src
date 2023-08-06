import Gun from 'gun'
import SEA from 'gun/sea.js'
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'
import 'gun/lib/rindexed.js'
import 'gun/lib/webrtc.js'
import 'gun/lib/yson.js'
import { em } from './common.js'

export const gun = Gun({
    peers: ['https://59.src.eco/gun', 'https://95.src.eco/gun'],
    file: './gun',
    localStorage: false,
    radisk: true,
    axe: false
})

const cache: any = {}

export async function subscribeToChannel(focus: string) {
    cache[focus] = []
    gun.get('src').get('bullets').get(focus).on(async (data: string) => {
        if (cache[focus].includes(data)) return
        cache[focus].push(data)
        while (cache[focus].length > 3) cache[focus].shift()
        em.emit('receiveBullet', data)
    })
}

export async function sendToChannel(data: Bullet) {
    const bullet = JSON.stringify(data)
    cache[data.focus].push(bullet)
    gun.get('src').get('bullets').get(data.focus).put(bullet)
}
