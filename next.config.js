
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '103.49.169.89',
        port: '30912',
        pathname: '/api/v1.0/files/download/public/**',
      },
      {
        protocol: 'https',
        hostname: 'api.bluefiverr.bengaltroopsbd.com',
        port: '',
        pathname: '/api/v1.0/files/download/public/**',
      },
    ],
  },
 
}

module.exports = module.exports = {
  useFileSystemPublicRoutes: false,
},nextConfig
