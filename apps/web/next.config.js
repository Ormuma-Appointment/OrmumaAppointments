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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            publicPath: "https://firebasestorage.googleapis.com",
            outputPath: "static/images",
            name: "[name].[ext]",
          },
        },
      ],
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
