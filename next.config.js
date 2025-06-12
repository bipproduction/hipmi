/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  output: "standalone",
  staticPageGenerationTimeout: 180, // tingkatkan menjadi 3 menit
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "no-store, max-age=0",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
