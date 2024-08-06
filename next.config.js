// @ts-check

/**
 *  @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.isjustblog.com' }],
  },
};

module.exports = nextConfig;
