/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://3.36.153.201:8081/:path*",
      },
    ];
  },
};

export default nextConfig;
