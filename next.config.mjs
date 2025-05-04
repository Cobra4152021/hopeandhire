/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Remove or set to false if it exists
  output: 'standalone',
  // Add this to disable static exports
  // output: 'export', // REMOVE THIS LINE if it exists
  // Add webpack configuration to handle the error
  webpack: (config, { isServer }) => {
    // Avoid the WasmHash error
    config.optimization.moduleIds = 'named';
    
    // Increase the maximum asset size to avoid issues
    config.performance = {
      ...config.performance,
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
    };
    
    return config;
  },
}

export default nextConfig
