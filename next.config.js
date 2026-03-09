/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", ".prisma/client"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@prisma/client");
      config.externals.push(".prisma/client");
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Content-Type", value: "application/json" },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
