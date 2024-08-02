import { log } from 'console';
import { Pagination } from 'antd';
import Link from 'next/link';
import { Blog } from '@prisma/client';
import noImg from '/public/assets/img/noImg.jpg';
import { Suspense } from 'react';
import db from '../../lib/db';
import CustomPagination from '../../components/pagination';
import { formatToTimeAgo } from '../../lib/constants';
import CateBlog from './(component)/cateBlog';


async function getBlogCateList() {
  const blogCateList = await db.blogCate.findMany({
    where: { use_yn: 'Y' },
  });
  return blogCateList;
}

export default async function BlogList() {
  const blogCateList = await getBlogCateList();
  console.log(blogCateList);

  return (
    <div className="p-5 pt-28 lg:pt-0" >
      {blogCateList.map((item) => (
        <CateBlog key={item.blog_cate_id} blogCateId={item.blog_cate_id} blogCateNm={item.cate_nm} />
      ))}
    </div>
  );
}