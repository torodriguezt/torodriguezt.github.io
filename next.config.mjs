// Served from the root user site (torodriguezt.github.io), so no basePath.
const basePath = ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Lets a verification build run in its own folder without clobbering the
  // .next that a running `npm run dev` has open.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
