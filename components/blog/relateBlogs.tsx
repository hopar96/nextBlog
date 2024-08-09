// 'use client'

import Link from 'next/link';
import db from '../../lib/db';
import Image from 'next/image';
import noImg from '/public/assets/img/noImg.jpg';
import { BASE_IMG_URL, BASE_URL, blurImage, formatToTimeAgo } from '../../lib/constants';
import { AtFile, Blog, Prisma } from '@prisma/client';

export async function getRelateBlogs(blogId: number, blogCateId: number) {
  const relateBlogs = await db.blog.findMany({
    where: {
      AND: [{ blog_cate_id: blogCateId }, { blog_id: { not: blogId } }, { use_yn: 'Y' }],
    },
    // relationLoadStrategy: 'join',
    include: {
      mainAtFile: true,
    },
    take: 4,
    orderBy: { blog_id: 'asc' },
  });
  return relateBlogs;
}

export async function getRecentBlog(blogId: number) {
  const recentBlogs = await db.blog.findMany({
    where: {
      blog_id: { not: blogId },
      use_yn: 'Y',
    },
    include: {
      mainAtFile: true,
    },
    // relationLoadStrategy: 'join',
    take: 4,
    orderBy: { blog_id: 'desc' },
  });
  return recentBlogs;
}

export default async function RelateBlogs({ blogId, blogCateId }: { blogId: number; blogCateId: number }) {
  const [relatedBlogs, recentBlogs] = await Promise.all([getRelateBlogs(blogId, blogCateId), getRecentBlog(blogId)]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@id': BASE_URL,
    '@type': 'RelateBlogs',
    relatedBlogs: relatedBlogs.map((blog) => {
      return {
        '@type': 'ListItem',
        name: blog.title,
        image: BASE_IMG_URL + blog.mainAtFile?.file_nm,
      };
    }),
  };
  return (
    <div className="mt-10 p-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div>
        <h3 className="font-semibold">{`관련 글`}</h3>
        <div>
          <ul className="flex gap-1 flex-wrap">
            {relatedBlogs.map((blog) => (
              <BlogCard key={`relate_${blog?.blog_id}`} blog={blog} />
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="font-semibold">{'최신 글'}</h3>
        <div>
          <ul className="flex gap-1 flex-wrap">
            {recentBlogs.map((blog) => (
              <BlogCard key={`recent_${blog?.blog_id}`} blog={blog} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type ISelectBlog = Blog & {
  mainAtFile: AtFile | null;
};

function BlogCard({ blog }: { blog: ISelectBlog }) {
  return (
    <li key={blog.blog_id}>
      <div className="card-div">
        <Link
          href={`/cate/${blog?.blog_cate_id}/blog/${blog?.blog_id}`}
          className="flex flex-col flex-wrap gap-y-1 items-start w-[200px]">
          <div className="relative w-[200px] h-[200px] object-cover overflow-hidden">
            <Image
              src={blog?.mainAtFile ? BASE_IMG_URL + blog?.mainAtFile?.file_nm : noImg.src}
              alt="블로그 게시물의 대표 이미지"
              width={200}
              height={200}
              placeholder={blurImage}
              // fill={true}
            />
            {!blog?.mainAtFile ? (
              <span
                className="absolute top-2/4 left-2/4 text-5xl text-pink-400 -translate-x-2/4 -translate-y-2/4"
                style={{ textShadow: '2px 2px 4px #eb2f96' }}>
                {`#${blog?.blog_id}`}
              </span>
            ) : (
              ''
            )}
            <div className="absolute text-gray-300 bg-black bg-opacity-60 w-full h-auto bottom-0 left-0 flex flex-col content-center justify-end p-2">
              <h3 className={'text-white w-full text-lg font-semibold mb-2 ellipsis'}>{blog?.title}</h3>
              {blog?.author_nm ? (
                <span className={'w-full text-sm mb-1'}>
                  <span className="italic" style={{ fontFamily: 'Georgia, sans-serif' }}>
                    by
                  </span>
                  {` ${blog?.author_nm}`}
                </span>
              ) : (
                ''
              )}
              {blog?.reg_dt ? (
                <>
                  {/* <span className='text-[#959595]'>{IntlUsDate.format(blog?.reg_dt)}</span> */}
                  <span className="text-xs">{formatToTimeAgo(blog?.reg_dt.toString())}</span>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
}
