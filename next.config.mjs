/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'allusedautoparts.world',
      },
      {
        protocol: 'https',
        hostname: 'www.allautopartstore.com',
      },
    ],
  },
}

export default nextConfig
