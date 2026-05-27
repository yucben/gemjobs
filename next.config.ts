import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/gemjobs',
  images: { unoptimized: true },
};

export default nextConfig;
