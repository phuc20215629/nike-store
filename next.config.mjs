/** @type {import('next').NextConfig} */
const nextConfig = {
  // to import images outside of the project
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
