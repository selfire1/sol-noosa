import type { NextConfig } from 'next'
import { varlockNextConfigPlugin } from '@varlock/nextjs-integration/plugin'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [40, 75],
  },
}

export default varlockNextConfigPlugin()(nextConfig)
