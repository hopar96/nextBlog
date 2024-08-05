import { MetadataRoute } from "next";


const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: 'Googlebot',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: 'https://www.isjust.blog/sitemap/0.xml',
  }
}

export default robots;