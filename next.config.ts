import type { NextConfig } from 'next'
import { varlockNextConfigPlugin } from '@varlock/nextjs-integration/plugin'

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [40, 75],
    remotePatterns: [
      // UploadThing file host — tighten to the app-specific subdomain in U7
      // once the UploadThing app exists and its id is known.
      { protocol: 'https', hostname: 'utfs.io' },
    ],
  },
}

export default varlockNextConfigPlugin()(nextConfig)
