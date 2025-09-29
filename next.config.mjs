/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  
  // Enable compression
  compress: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

export default nextConfig