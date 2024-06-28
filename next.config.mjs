/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // to import images outside of the project
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
