import type { NextConfig } from "next";
// @ts-ignore
import nextPwa from "next-pwa";
import withExportImages from "next-export-optimize-images";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
  fallbacks: {
    document: "/offline",
  },
});

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = withVanillaExtract(
  withPWA(
    withExportImages({
      reactStrictMode: true,
      output: "standalone",
      images: {
        formats: ["image/webp"],
        remotePatterns: [
          {
            protocol: "http",
            hostname: "192.168.0.108",
            port: "8000",
            pathname: "/media/**",
          },
          {
            protocol: "https",
            hostname: "randomuser.me",
            pathname: "/api/portraits/**",
          },
          {
            protocol: "https",
            hostname: "aloavto-backend.mirabbosoff.uz",
            pathname: "/media/**",
          },
          {
            protocol: "https",
            hostname: "aloavto-backend.mirabbosoff.uz",
            pathname: "/media/payment_proofs/**",
          },
          {
            protocol: "http",
            hostname: "192.168.0.102",
            port: "8000",
            pathname: "/media/**",
          },
          {
            protocol: "https",
            hostname: "your-storage-or-image-host.com",
          },
        ],
      },
    })
  )
);

export default nextConfig;
