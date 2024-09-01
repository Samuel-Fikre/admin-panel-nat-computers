/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns: [
      {
        hostname: 'utfs.io'
      }
    ]
  }
};

export default nextConfig;
