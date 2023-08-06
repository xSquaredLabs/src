import Gun from 'gun'
import SEA from 'gun/sea.js'
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'
import 'gun/lib/rindexed.js'
import 'gun/lib/webrtc.js'
import 'gun/lib/yson.js'

export const gun = Gun({
    peers: ['https://59.src.eco/gun', 'https://95.src.eco/gun'],
    file: './gun',
    localStorage: false,
    radisk: true,
    axe: false
})
