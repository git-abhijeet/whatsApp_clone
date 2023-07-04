/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 1515400671,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "1fe289afb13fc9c45ab26e8d16f0fd35",
  },
  images: {
    domains: ["localhost"],
  },
  // experiments: {
  //   topLevelAwait: true,
  // },
};

module.exports = nextConfig;
