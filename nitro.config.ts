import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'vercel',
  publicAssets: [
    {
      baseURL: '/',
      dir: 'public',
      maxAge: 60 * 60 * 24 * 365, // 1 year cache for static assets
    },
  ],
  compressPublicAssets: {
    gzip: true,
    brotli: true,
  },
  routeRules: {
    '/video-*.mp4': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    '/posters/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  },
})
