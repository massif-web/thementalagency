import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config.js";
import redirects from "./redirects";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || "http://localhost:3000";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    },
  ],
  reactCompiler: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ["lucide-react", "date-fns"],
    cssChunking: true,
    useLightningcss: true,
  },
  turbopack: {
    root: path.join(__dirname, ".."),
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // localPatterns: [
    //   {
    //     pathname: "/api/media/**",
    //   },
    // ],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        } as RemotePattern;
      }),
    ],
  },
  webpack: (webpackConfig, { dev, isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (!dev && !isServer) {
      webpackConfig.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          framework: {
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
          },
        },
      };
    }

    return webpackConfig;
  },
  reactStrictMode: true,
  redirects,
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
