/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true, // ❗Only keep this if absolutely needed
  },

  images: {
    domains: ['hopeandhire.net', 'hopeandhire.org'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Optional: Can be more restrictive
      },
    ],
  },

  // ❌ REMOVE: This is only for Docker/self-hosting
  // output: 'standalone',

  webpack: (config) => {
    config.optimization.moduleIds = 'named'; // Optional: helps debugging

    config.performance = {
      ...config.performance,
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
    };

    return config;
  },
};

export default nextConfig;
