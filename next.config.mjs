/** @type {import('next').NextConfig} */
const nextConfig = {
  // to import images outside of the project
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
    ],
  },
};

export default nextConfig;
