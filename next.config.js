/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/dantong_frontend",
  assetPrefix: "/dantong_frontend"
}

module.exports = nextConfig
