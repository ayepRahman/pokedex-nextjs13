/** @type {import('next').NextConfig} */
const nextConfig = {
  // generateEtags: false,
  reactStrictMode: true,
  swcMinify: true,
  // @desc - hide for now
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: ["pokedex-nextjs13.s3.amazonaws.com", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
