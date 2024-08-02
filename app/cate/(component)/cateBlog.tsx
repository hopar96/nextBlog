'use client';

import { useEffect, useState } from 'react';
import Page from '../../../.next/server/vendor-chunks/next';
import { getBlogListAndCnt } from '../actions';
import { Blog } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import noImg from '/public/assets/img/noImg.jpg';
import { formatToTimeAgo } from '../../../lib/constants';
import { PlusOutlined } from '@ant-design/icons';

type Iparams = {
  blogCateId: bigint;
  blogCateNm: string;
  limit?: number;
};

const CateBlog = ({ blogCateId, blogCateNm, limit = 3 }: Iparams) => {
  const [page, setPage] = useState(1);
  const [blogList, setBlogList] = useState<Array<Blog>>([]);
  const [blogCnt, setBlogCnt] = useState(0);

  useEffect(() => {
    const fetchBlog = async () =>{
      const [tmpBlogList, tmpBlogCnt] = await getBlogListAndCnt({ blogCateId, page, limit });
      setBlogList(prevBlogList =>  {
        return page == 1 ? tmpBlogList : [...prevBlogList, ...tmpBlogList];
      });
      setBlogCnt(tmpBlogCnt);
    }
    fetchBlog();
  }, [page]);

  const onClickMoreBtn = (page:number) => {
    setPage(page);
  }

  return (
    <div>
      <div className="border-b border-solid border-stone-500 mb-4">
        <h1 className="inline-block mb-2 px-4">
          <b>{blogCateNm}</b>
        </h1>
        {page * limit < blogCnt ? (
          <button
            className="float-right text-lg text-blue-500 translate-y-1/2 mr-4"
            onClick={(e) => onClickMoreBtn(page + 1)}>
            {`더보기 `}
            <PlusOutlined />
          </button>
        ) : (
          ''
        )}
      </div>
      <ul className={'flex flex-wrap gap-x-[2vw] gap-y-10 justify-left '}>
        {blogList.map((blog) => (
          <BlogLi key={blog.blog_id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default CateBlog;


function BlogLi({ blog }: { blog: Blog }) {
  return (
    <li>
      <div>
        <Link
          href={`/cate/${blog?.blog_cate_id}/blog/${blog?.blog_id}`}
          className="flex flex-col flex-wrap gap-y-1 items-start w-[30vw] max-w-[300px]">
          <div className="relative w-[30vw] max-w-[300px] h-[30vw] max-h-[300px]">
            <Image
              className='border-stone-300 border border-solid'
              src={blog?.main_file_id ? `` : noImg.src}
              alt="블로그 게시물의 대표 이미지"
              // width={300}
              // height={300}
              fill={true}
            />
            {!blog?.main_file_id ? (
              <span
                className="absolute top-2/4 left-2/4 text-5xl text-pink-400 -translate-x-2/4 -translate-y-2/4"
                style={{ textShadow: '2px 2px 4px #eb2f96' }}>
                {`#${blog?.blog_id}`}
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className={'text-stone-800 w-full text-xl'}>{blog?.title}</span>
            {blog?.author_nm ? (
              <span className={'text-[#bfbfbf] w-full'}>
                <span className="text-[#bfbfbf] italic" style={{ fontFamily: 'Georgia, sans-serif' }}>
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
                <span className="text-[#959595]">{formatToTimeAgo(blog?.reg_dt.toString())}</span>
              </>
            ) : (
              ''
            )}
          </div>
        </Link>
      </div>
    </li>
  );
}
