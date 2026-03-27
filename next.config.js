// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Configura las imágenes externas que serán optimizadas por Next.js
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.printify.com',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

module.exports = nextConfig;