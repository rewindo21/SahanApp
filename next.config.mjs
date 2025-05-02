/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"assets.aceternity.com",
      },
    ],
  },
  env: {
    OPEN_AI_KEY: process.env.OPEN_AI_KEY,
  },
}

export default nextConfig