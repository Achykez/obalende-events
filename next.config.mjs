/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',

  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', 'defaultimage.com', 'cloudinary.com'],
  },

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
