import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

import { hasValidSession } from '@/lib/auth'

const f = createUploadthing()

export const uploadRouter = {
  carImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      // FR-8: without this check the route is a public, anonymous upload endpoint.
      const authed = await hasValidSession()
      if (!authed) {
        throw new UploadThingError('Unauthorized')
      }
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl, key: file.key }
    }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
