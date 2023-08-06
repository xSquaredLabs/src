import events from 'events'

export const em = new events.EventEmitter()

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
