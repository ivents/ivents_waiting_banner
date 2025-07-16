/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'], // Add any other domains you need
  },
  // Server Actions are enabled by default in Next.js 14+
  // Remove static export to support server-side features
  trailingSlash: true,
  // Optional: Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      // Don't include certain packages in the client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
