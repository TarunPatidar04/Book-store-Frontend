import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["media.istockphoto.com","images.unsplash.com","unsplash.com","plus.unsplash.com","res.cloudinary.com"],
  },
};

export default nextConfig;
