/**
 * Next.js configuration.
 *
 * Image domains: we use Unsplash placeholders during the demo phase.
 * When the client provides real product photography, we'll add their CDN
 * (likely a Supabase Storage bucket on supabase.co) to remotePatterns.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
