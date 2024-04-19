/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://114.116.241.37:8081/api/:path',
      },
    ];
  },
};

export default nextConfig;
