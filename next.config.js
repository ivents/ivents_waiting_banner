/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'], // Add any other domains you need
  },
  // Enable static exports for Netlify
  output: 'export',
  // Optional: Add a trailing slash for better compatibility
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
