import { MetadataRoute } from "next";


const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: 'Googlebot',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: 'https://www.isjust.blog/sitemap.xml',
  }
}

export default robots;