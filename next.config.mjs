/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove swcMinify as it's no longer needed in Next.js 15
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
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
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  experimental: {
    // ...any existing experimental options
  },
  output: 'standalone',
}

export default nextConfig
