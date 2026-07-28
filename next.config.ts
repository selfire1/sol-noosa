import type { NextConfig } from 'next'
import { varlockNextConfigPlugin } from '@varlock/nextjs-integration/plugin'

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [40, 75],
    remotePatterns: [{ protocol: 'https', hostname: 'fhexqicrem.ufs.sh' }],
  },
}

export default varlockNextConfigPlugin()(nextConfig)
