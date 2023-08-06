import 'dotenv'
import './discord/index.js'
import { gun } from './gun.js'

gun.get('src').get('bullets').get('trade').on(async (node: string) => {
    console.log(node)
})
