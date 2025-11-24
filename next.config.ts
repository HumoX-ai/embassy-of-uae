import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.kun.uz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gazeta.uz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "1f606894a151.ngrok-free.app",
        port: "",
        pathname: "/api/v1/article/get-image",
      },
    ],
  },
};

export default nextConfig;
