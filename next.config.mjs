/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/cssinjs',
    '@ant-design/nextjs-registry',
    'rc-pagination',
    'rc-picker',
    'rc-util',
    'rc-tree',
    'rc-table',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

