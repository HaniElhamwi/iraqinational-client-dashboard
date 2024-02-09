/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'drefbjvxi4tpm.cloudfront.net',
      'upload.wikimedia.org',
      'firebasestorage.googleapis.com',
      'https://encrypted-tbn0.gstatic.com',
      '*',
    ],
  },
};
module.exports = nextConfig;
