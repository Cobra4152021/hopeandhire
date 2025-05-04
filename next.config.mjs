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
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'ulnorqgbqtvpgfvgruen.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Use standalone output for Vercel
  output: 'standalone',
  // Add webpack configuration to handle the error
  webpack: (config) => {
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
