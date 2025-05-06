/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Set default image quality (80% is a good balance between quality and file size)
    quality: 80,
    
    // Enable image optimization for all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    
    // Set device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    
    // Set image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Enable image minimization
    minimumCacheTTL: 60,
    
    // Disable static image imports for dynamic optimization
    disableStaticImages: false,
    
    // Enable dangerously allowing SVG
    dangerouslyAllowSVG: true,
    
    // Set content security policy for SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
