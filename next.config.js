/* eslint-disable*/
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@svgs": path.resolve(__dirname, "./src/assets/svgs"),
      "@": path.resolve(__dirname, "./src/"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@icons": path.resolve(__dirname, "./src/components/icons"),
    };

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

module.exports = nextConfig;
