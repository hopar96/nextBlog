import { log } from 'console';
import MovieVideos from '../../../../../components/movie-videos';
import BlogContents, { getBlog } from '../../../../../components/blog/blogContents';
import { Suspense } from 'react';
import CustomLoading from '../../../../../components/custom-loading';
import RelateBlogs, { getRelateBlogs } from '../../../../../components/blog/relateBlogs';
import { BASE_IMG_URL, BASE_URL } from '../../../../../lib/constants';
import { AtFile, Blog } from '@prisma/client';

interface IParams {
  params: { blogId: number; blogCateId: number };
}

type ISelectBlog = Blog & {
  mainAtFile?: AtFile | null;
};

export async function generateMetadata({ params: { blogId, blogCateId } }: IParams) {
  const blog: ISelectBlog | null = await getBlog(blogId, blogCateId);
  const relateBlogList = await getRelateBlogs(blogId, blogCateId);
  return {
    title: blog?.title,
    description: blog?.description,
    keywords: blog?.keywords ?? blog?.title?.replaceAll(' ', ', '),
    publisher: blog?.author_nm,
    openGraph: {
      type: 'website',
      url: `${BASE_URL}/cate/${blogCateId}/blog/${blogId}`,
      title: 'IsJustBlog의 카테고리',
      description: blog?.description,
      siteName: 'Is Just Blog',
      images: BASE_IMG_URL + blog?.mainAtFile?.file_nm,
    },
    alternates: {
      canonical: `${BASE_URL}/cate/${blogCateId}`,
    },
  };
}

export default async function BlogDetail({ params: { blogId, blogCateId } }: IParams) {
  return (
    <div>
      <Suspense fallback={<CustomLoading />}>
        <BlogContents blogId={blogId} blogCateId={blogCateId} />
      </Suspense>
      <Suspense fallback={<CustomLoading />}>
        <RelateBlogs blogId={blogId} blogCateId={blogCateId} />
      </Suspense>
    </div>
  );
}
