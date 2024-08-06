import { MetadataRoute } from "next";


const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      // userAgent: 'Googlebot',
      userAgent: '*',
      // allow: '/',
      // disallow: '/private/',
    },
    sitemap: 'https://www.isjustblog.com/sitemap/0.xml',
  }
}

export default robots;