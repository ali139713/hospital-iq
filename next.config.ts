import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Leaflet tiles from OpenStreetMap
      "img-src 'self' data: https://*.tile.openstreetmap.org",
      // Leaflet map tiles
      "connect-src 'self' https://*.tile.openstreetmap.org",
      // Inline styles required by Leaflet's dynamic marker rendering
      "style-src 'self' 'unsafe-inline'",
      // unsafe-eval required by Next.js dev mode; unsafe-inline required by RSC hydration
      // Production hardening: configure nonce-based CSP via Next.js middleware
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "font-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Silence Prisma's node-specific warnings during build
  serverExternalPackages: ['@prisma/client', 'prisma'],

  // Leaflet's SSR issue is handled via `ssr: false` in dynamic imports — no webpack override needed
  turbopack: {},
}

export default nextConfig
