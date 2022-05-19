/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dynamic-media-cdn.tripadvisor.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
