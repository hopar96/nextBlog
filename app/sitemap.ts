import { MetadataRoute } from 'next';
import { BASE_URL } from '../lib/constants';
import db from '../lib/db';
import { Blog } from '.prisma/client';

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 49000;
  const end = start + 49000;
  const blogCateList = await getBlogCateList();
  const blogList = await getBlogList({ start, end });
  const defaultList = id === 0 ? [
    {url: `${BASE_URL}`},
    {url: `${BASE_URL}/cate`},
  ] : [];

  const cateUrlList = id === 0 ? blogCateList.map((blogCate) => ({
    url: `${BASE_URL}/cate/${blogCate.blog_cate_id}`
  })) : [];

  return [ ...cateUrlList,...defaultList,
    ...blogList.map((blog: Blog) => ({
      url: `${BASE_URL}/cate/${blog.blog_cate_id}/blog/${blog.blog_id}`,
      lastModified: blog.reg_dt ?? undefined,
    }))
  ];
}

async function getBlogList({ start, end }: { start: number; end: number }) {
  const blogList = await db.blog.findMany({
    where: {
      use_yn: 'Y',
      blog_id: {
        gt: start,
        lte: end,
      },
    },
    orderBy: { blog_id: 'asc' },
  });

  return blogList;
}

async function getBlogCateList() {
  const blogCateList = await db.blogCate.findMany({
    where: {
      use_yn: 'Y',
    },
    orderBy: { ord: 'asc' },
  });

  return blogCateList;
}
