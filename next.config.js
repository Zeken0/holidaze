/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
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
