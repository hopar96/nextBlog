'use server';

import { Blog } from '@prisma/client';
import db from '../../lib/db';

export async function getBlogListAndCnt({
  blogCateId,
  page,
  lastId,
  limit = 20,
}: {
  blogCateId: bigint;
  page: number;
  lastId?: number;
  limit?: number;
}) : Promise<[Array<Blog>, number]>{
  const skip = page ? (page - 1) * limit : lastId ? 1 : 0;

  console.log('call function: getBlogListAndCnt')
  const blogList = await db.blog.findMany({
    where: { use_yn: 'Y', blog_cate_id: blogCateId },
    orderBy: { blog_id: 'desc' },
    include: {mainAtFile: true},
    take: limit,
    skip,
    ...(lastId && { cursor: { blog_id: lastId } }),
  });

  const blogCnt = await db.blog.count({
    where: { use_yn: 'Y', blog_cate_id: blogCateId },
  });

  console.log(blogList)

  return [blogList, blogCnt];
}

/* 
export async function likePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
} */
