/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // User page (vineetsista.github.io) serves at root — no basePath needed.
};

export default nextConfig;
