module.exports = {
  reactStrictMode: true,

  experimental: {
    transpilePackages: ["ui"],
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  //whatever config you have
  //...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
module.exports = {
  env: {
    customKey: "my-value",
  },
};
module.exports = nextConfig;
