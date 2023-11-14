/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "baglemonster.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
