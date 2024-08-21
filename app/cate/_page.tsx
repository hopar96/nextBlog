import { Suspense } from 'react';
import { BASE_IMG_URL, BASE_URL } from '../../lib/constants';
import db from '../../lib/db';
import CateBlog from './(component)/cateBlog';
import { getBlogListAndCnt } from './actions';
import { Metadata } from 'next';
import { AtFile, Blog } from '@prisma/client';

interface IParams {
  params: { blogCateId: bigint };
}
interface IBlogCate {
  blog_cate_id: bigint;
  cate_nm: string;
  ord: number | null;
  parent_blog_cate_id: bigint | null;
  reg_dt: Date;
  use_yn: string;
  blogList?: (Blog & { mainAtFile?: AtFile | null })[];
  blogCnt?: number;
}

export const generateMetadata = async ({ params: { blogCateId } }: IParams): Promise<Metadata> => {
  const blogCateList = await getBlogCateList();
  const [blogList] = await getBlogListAndCnt({ blogCateId, page: 1 });
  blogList.splice(0, Math.min(blogList.length, 6));
  const description =
    blogCateList.map((item) => item.cate_nm).join(', ') + '의 주제로 다양하고 유익한 블로그 글들을 확인하세요.';

  const ogImages = blogList
    .map((blog) => BASE_IMG_URL + blog.mainAtFile?.file_nm)
    .filter((url) => url !== BASE_IMG_URL);

  return {
    title: '카테고리 리스트와 블로그 게시물들',
    description: description,
    keywords: [...blogCateList.map((item) => item.cate_nm), '블로그', '카테고리', '주제'],
    publisher: null,
    openGraph: {
      type: 'website',
      url: BASE_URL + '/cate',
      title: 'IsJustBlog의 카테고리',
      description: description,
      siteName: 'Is Just Blog',
      images: ogImages,
    },
    alternates: {
      canonical: `${BASE_URL}/cate/${blogCateId}`,
    },
  };
};

async function getBlogCateList() {
  const blogCateList = await db.blogCate.findMany({
    where: { use_yn: 'Y' },
  });
  return blogCateList;
}

const fetchBlog = async (blogCate: IBlogCate) => {
  const [tmpBlogList, tmpBlogCnt] = await getBlogListAndCnt({ blogCateId: blogCate.blog_cate_id, page: 1, limit: 6 });
  blogCate.blogList = tmpBlogList;
  blogCate.blogCnt = tmpBlogCnt;
};

export default async function BlogList() {
  const blogCateList = await getBlogCateList();
  await Promise.all(blogCateList.map((blogCate) => fetchBlog(blogCate)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@id': BASE_URL,
    '@type': 'itemList',
    itemListElement: blogCateList.map((blogCate: IBlogCate) => {
      return {
        '@type': 'itemList',
        name: blogCate.cate_nm,
        itemListElement: blogCate.blogList?.map((blog) => {
          return {
            '@type': 'ListItem',
            name: blog.title,
            image: BASE_IMG_URL + blog?.mainAtFile?.file_nm,
          };
        }),
      };
    }),
  };

  return (
    <div className="p-[3vw] pt-10 lg:pt-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {blogCateList.map((item: IBlogCate) => (
        <CateBlog
          key={item.blog_cate_id}
          blogCateId={item.blog_cate_id}
          blogCateNm={item.cate_nm}
          presetBlogList={item.blogList}
          presetBlogCnt={item.blogCnt}
        />
      ))}
    </div>
  );
}
