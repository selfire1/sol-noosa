import { createRouteHandler } from 'uploadthing/next'
import { ENV } from 'varlock/env'

import { uploadRouter } from './core'

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
  config: {
    token: ENV.UPLOADTHING_TOKEN,
  },
})
