/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Enable standalone output only for Docker (not for Vercel)
  // Vercel handles deployment automatically, standalone is not needed
  ...(process.env.VERCEL ? {} : { output: "standalone" }),

  // Image optimization (اسکرپر: تصاویر از دامنه‌های آمازون)
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "images-eu.ssl-images-amazon.com", pathname: "/**" },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Compression
  compress: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Experimental features
  experimental: {
    optimizePackageImports: ["iconsax-reactjs", "lucide-react"],
  },
};

export default nextConfig;
