/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.thucchien.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
