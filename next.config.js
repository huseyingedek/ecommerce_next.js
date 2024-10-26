const nextTranslate = require("next-translate-plugin");
const { resolve } = require("path");

module.exports = nextTranslate({
  poweredByHeader: false,
  reactStrictMode: false,
  images: {
    domains: ['picsum.photos', '8f08a8.cdn.akinoncloud.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
