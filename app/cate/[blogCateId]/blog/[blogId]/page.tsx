import { log } from 'console';
import MovieVideos from '../../../../../components/movie-videos';
import BlogContents, { getBlog } from '../../../../../components/blog/blogContents';
import { Suspense } from 'react';
import CustomLoading from '../../../../../components/custom-loading';
import RelateBlogs from '../../../../../components/blog/relateBlogs';

interface IParams {
  params: { blogId: number; blogCateId: number };
}

export async function generateMetadata({ params: { blogId, blogCateId } }: IParams) {
  const blog = await getBlog(blogId, blogCateId);
  return {
    title: blog?.title,
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
