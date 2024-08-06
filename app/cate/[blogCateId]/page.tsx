import { log } from 'console';
import { Pagination } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { AtFile, Blog } from '@prisma/client';
import noImg from '/public/assets/img/noImg.jpg';
import { Suspense } from 'react';
import db from '../../../lib/db';
import CustomPagination from '../../../components/pagination';
import { BASE_IMG_URL, blurImage, formatToTimeAgo } from '../../../lib/constants';
import BlogListCpnt from '../../../components/blog/blogList';

async function getBlogList({
  blogCateId,
  page,
  lastId,
  limit = 9,
}: {
  blogCateId: number;
  page: number;
  lastId?: number;
  limit?: number;
}) {
  const skip = page ? (page - 1) * limit : lastId ? 1 : 0;

  const blogList = await db.blog.findMany({
    where: { use_yn: 'Y', blog_cate_id: blogCateId },
    include: {mainAtFile: true},
    orderBy: { blog_id: 'desc' },
    take: limit,
    skip,
    ...(lastId && { cursor: { blog_id: lastId } }),
  });

  return blogList;
}

async function getBlogCnt(blogCateId: number) {
  const blogCnt = await db.blog.count({
    where: { use_yn: 'Y', blog_cate_id: blogCateId },
  });
  return blogCnt;
}

async function getBlogCate(blogCateId: number) {
  const blogCate = await db.blogCate.findUnique({
    where: { use_yn: 'Y', blog_cate_id: blogCateId },
  });
  return blogCate;
}

export default async function BlogList({
  searchParams: { page = 1, limit = 12 },
  params: { blogCateId },
}: {
  searchParams: { page?: number; limit?: number };
  params: { blogCateId: number };
}) {
  
  const [blogList, blogCnt, blogCate] = await Promise.all([
    getBlogList({ page, limit, blogCateId: blogCateId }),
    getBlogCnt(blogCateId),
    getBlogCate(blogCateId),
  ]);

  return (
    <div className="p-[3vw] pt-10 lg:pt-0">
      <div className="border-b-2 border-solid border-stone-300 mb-4">
        <h1 className="mb-2 px-4">
          <b>{blogCate?.cate_nm}</b>
        </h1>
      </div>
      <ul className={'flex flex-wrap gap-x-[1.5vw] gap-y-4 justify-left'}>
        {blogList.map((blog) => (
          <BlogListCpnt key={blog.blog_id} blog={blog} />
        ))}
      </ul>
      <div className="flex justify-center mt-5">
        <CustomPagination url={`/cate/${blogCateId}`} total={blogCnt} current={page} pageSize={limit} />
      </div>
    </div>
  );
}

// type ISelectBlog  = Blog & {
//   mainAtFile: AtFile | null
// }
// function BlogLi({ blog }: { blog: ISelectBlog }) {
//   return (
//     <li>
//       <div>
//         <Link
//           href={`/cate/${blog?.blog_cate_id}/blog/${blog?.blog_id}`}
//           className="flex flex-col flex-wrap gap-y-1 items-start w-[30vw] max-w-[300px]">
//           <div className="relative w-[30vw] max-w-[300px] h-[30vw] max-h-[300px] object-cover overflow-hidden">
//             <Image
//               className='border-stone-300 border border-solid'
//               src={blog?.mainAtFile ? BASE_IMG_URL + blog?.mainAtFile?.file_nm : noImg.src}
//               alt="블로그 게시물의 대표 이미지"
//               width={300}
//               height={300}
//               placeholder={blurImage}
//               // fill={true}
//             />
//             {!blog?.mainAtFile ? (
//               <span
//                 className="absolute top-2/4 left-2/4 text-5xl text-pink-400 -translate-x-2/4 -translate-y-2/4"
//                 style={{ textShadow: '2px 2px 4px #eb2f96' }}>
//                 {`#${blog?.blog_id}`}
//               </span>
//             ) : (
//               ''
//             )}
//           </div>
//           <div className="flex flex-col items-start">
//             <span className={'text-stone-800 w-full text-xl ellipsis'}>{blog?.title}</span>
//             {blog?.author_nm ? (
//               <span className={'text-[#bfbfbf] w-full'}>
//                 <span className="text-[#bfbfbf] italic" style={{ fontFamily: 'Georgia, sans-serif' }}>
//                   by
//                 </span>
//                 {` ${blog?.author_nm}`}
//               </span>
//             ) : (
//               ''
//             )}
//             {blog?.reg_dt ? (
//               <>
//                 {/* <span className='text-[#959595]'>{IntlUsDate.format(blog?.reg_dt)}</span> */}
//                 <span className="text-[#959595]">{formatToTimeAgo(blog?.reg_dt.toString())}</span>
//               </>
//             ) : (
//               ''
//             )}
//           </div>
//         </Link>
//       </div>
//     </li>
//   );
// }
