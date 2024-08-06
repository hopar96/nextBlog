'use client';

import { useEffect, useState } from 'react';
import { getBlogListAndCnt } from '../actions';
import { Blog } from '@prisma/client';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import BlogListCpnt from '../../../components/blog/blogList';

type Iparams = {
  blogCateId: bigint;
  blogCateNm: string;
  limit?: number;
};

const CateBlog = ({ blogCateId, blogCateNm, limit = 6 }: Iparams) => {
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
    <>
      {blogList && blogList.length > 0 ? (
        <div>
          <div className="border-b border-solid border-stone-500 mb-4 mt-5">
            <Link href={`/cate/${blogCateId}`} >
            <h1 className="inline-block mb-2 px-4 text-black">
              <b>{blogCateNm}</b>
            </h1>
            </Link>
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
          <ul className={'flex flex-wrap gap-x-[1.5vw] gap-y-4 justify-left'}>
            {blogList.map((blog) => (
              <BlogListCpnt key={blog.blog_id} blog={blog} />
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CateBlog;


