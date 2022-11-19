/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["pokedex-nextjs13.s3.amazonaws.com", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
