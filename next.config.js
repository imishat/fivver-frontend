
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
  },
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

module.exports =nextConfig
