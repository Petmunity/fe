/* eslint-disable*/
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@hooks": path.resolve(__dirname, "./src/app/hooks"),
      "@images": path.resolve(__dirname, "./src/app/assets/images"),
      "@svgs": path.resolve(__dirname, "./src/app/assets/svgs"),
      "@": path.resolve(__dirname, "./src/app"),
      "@components": path.resolve(__dirname, "./src/app/components"),
      "@icons": path.resolve(__dirname, "./src/app/components/icons"),
    };

    return config;
  },
  experimental: {
    turbo: {
      loaders: {
        ".svg": ["@svgr/webpack"],
      },
    },
  },
};

module.exports = nextConfig;
