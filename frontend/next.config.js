/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/auth/:path*', destination: 'http://localhost:3001/auth/:path*' },
      { source: '/api/:path*', destination: 'http://localhost:3001/api/:path*'},
    ]
  },
}

module.exports = nextConfig
