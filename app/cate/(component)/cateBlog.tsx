'use client';

import { useEffect, useState } from 'react';
import { getBlogListAndCnt } from '../actions';
import { Blog } from '@prisma/client';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import BlogListCpnt from '../../../components/blog/blogList';
import { Button } from 'antd';

type Iparams = {
  blogCateId: bigint;
  blogCateNm: string;
  limit?: number;
  presetBlogList?: Blog[];
  presetBlogCnt?: number;
};

const CateBlog = ({ blogCateId, blogCateNm, limit = 6, presetBlogList, presetBlogCnt }: Iparams) => {
  const [page, setPage] = useState(1);
  const [blogList, setBlogList] = useState<Array<Blog>>(presetBlogList || []);
  const [blogCnt, setBlogCnt] = useState(presetBlogCnt || 0);

  useEffect(() => {
    const fetchBlog = async () =>{
      const [tmpBlogList, tmpBlogCnt] = await getBlogListAndCnt({ blogCateId, page, limit });
      setBlogList(prevBlogList =>  {
        return page == 1 ? tmpBlogList : [...prevBlogList, ...tmpBlogList];
      });
      setBlogCnt(tmpBlogCnt);
    }
    if(page != 1){
      fetchBlog();
    }
  }, [page]);

  const onClickMoreBtn = (page: number) => {
    setPage(page);
  };

  return (
    <>
      {blogList && blogList.length > 0 ? (
        <div>
          <div className="border-b border-solid border-stone-500 mb-4 mt-5">
            <Link href={`/cate/${blogCateId}`}>
              <h1 className="inline-block mb-2 px-4 text-black">
                <b>{blogCateNm}</b>
              </h1>
            </Link>
          </div>
          <ul className={'flex flex-wrap gap-x-[1.5vw] gap-y-4 justify-center'}>
            {blogList.map((blog) => (
              <BlogListCpnt key={blog.blog_id} blog={blog} />
            ))}
          </ul>
          {page * limit < blogCnt ? (
            <div className='flex items-center justify-center my-3'>
              <Button type='primary' size='large' onClick={(e) => onClickMoreBtn(page + 1)}>{`더보기 `}</Button>
              {/* <button
                className=" text-lg text-blue-500"
                onClick={(e) => onClickMoreBtn(page + 1)}>
                <PlusOutlined />
              </button> */}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CateBlog;


