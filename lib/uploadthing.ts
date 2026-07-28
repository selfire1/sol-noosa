import { UTApi } from 'uploadthing/server'
import { ENV } from 'varlock/env'

export const utapi = new UTApi({
  token: ENV.UPLOADTHING_TOKEN,
})
