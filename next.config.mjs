/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@clerk/nextjs', '@clerk/backend', '@clerk/shared'],
  bundler: 'webpack',
}

export default nextConfig