/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true, // Ensure SWC is enabled
  experimental: {
    // serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'], // Add any packages that need Node.js runtime
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', 'defaultimage.com', 'cloudinary.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
    };
    // Add support for native Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      dns: false,
      tls: false,
      fs: false,
      request: false,
    };
    return config;
  },
  // Add this to handle Edge Runtime issues
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
