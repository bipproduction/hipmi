/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      "@prisma/client",
      ".prisma/client",
      "resend",
      "@react-email/render",
      "html-to-text",
      "dom-serializer",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@prisma/client");
      config.externals.push(".prisma/client");
      config.externals.push("resend");
      config.externals.push("@react-email/render");
      config.externals.push("html-to-text");
      config.externals.push("dom-serializer");
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
