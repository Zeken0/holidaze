const { off } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: off,
  images: {
    domains: [
      "dynamic-media-cdn.tripadvisor.com",
      "images.unsplash.com",
      "www.booking.com",
      "swiperjs.com",
    ],
  },
};

module.exports = nextConfig;
