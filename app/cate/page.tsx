import { Suspense } from 'react';
import { BASE_IMG_URL, BASE_URL } from '../../lib/constants';
import db from '../../lib/db';
import CateBlog from './(component)/cateBlog';
import { getBlogListAndCnt } from './actions';
import { Metadata } from 'next';


interface IParams {
  params: { blogCateId: bigint };
}

export const generateMetadata = async ({ params: { blogCateId } }: IParams): Promise<Metadata> => {
  const blogCateList = await getBlogCateList();
  const [blogList] = await getBlogListAndCnt({ blogCateId, page: 1 });
  blogList.splice(0, Math.min(blogList.length, 6));
  const description =
    blogCateList.map((item) => item.cate_nm).join(', ') + '의 주제로 다양하고 유익한 블로그 글들을 확인하세요.';

  const ogImages = blogList.map((blog) => BASE_IMG_URL + blog.mainAtFile?.file_nm).filter((url) => url !== BASE_IMG_URL);

  return {
    title: 'IsJustBlog의 카테고리의 블로그 글',
    description: description,
    openGraph: {
      type: 'website',
      url: BASE_URL + '/cate',
      title: 'IsJustBlog의 카테고리',
      description: description,
      siteName: 'Is Just Blog',
      images: ogImages,
    },
  };
};

async function getBlogCateList() {
  const blogCateList = await db.blogCate.findMany({
    where: { use_yn: 'Y' },
  });
  return blogCateList;
}

export default async function BlogList() {
  const blogCateList = await getBlogCateList();

  return (
    <div className="p-[3vw] pt-10 lg:pt-0" >
      {blogCateList.map((item) => (
        <CateBlog key={item.blog_cate_id} blogCateId={item.blog_cate_id} blogCateNm={item.cate_nm} />
      ))}
    </div>
  );
}