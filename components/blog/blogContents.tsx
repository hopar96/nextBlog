import Title from 'antd/lib/typography/Title';
import db from '../../lib/db';
import styles from '../../styles/blogContents.module.css';
import noImg from '/public/assets/img/noImg.jpg';
import { API_URL, BASE_IMG_URL, BASE_URL, IntlKoNumber, formatToTimeAgo } from '../../lib/constants';
import Link from 'next/link';
import { UserOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { Blog, BlogCate } from '@prisma/client';
import RelateBlogs from './relateBlogs';

export async function getBlog(blogId: number, blogCateId: number, updateFlg: boolean = false) {
  try {
    const blog = updateFlg
      ? await db.blog.update({
          where: {
            blog_id: blogId,
          },
          data: {
            views: {
              increment: 1,
            },
          },
          include: {
            blogCate: true,
          },
        })
      : await db.blog.findUnique({
          where: {
            blog_id: blogId,
          },
          include: {
            blogCate: true,
          },
        });
    return blog;
  } catch (e) {
    return null;
  }
}

export default async function BlogContents({ blogCateId, blogId }: { blogId: number; blogCateId: number }) {
  const blog = await getBlog(blogId, blogCateId, true);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@id': BASE_URL,
    '@type': 'BlogPosting',
    headline: blog?.title,
    author: {
      '@type': 'Person',
      name: blog?.author_nm,
      // "url": "https://example.com/author-profile"
    },
    genre: blog?.blogCate.cate_nm, // 예: "기술", "건강", "여행" 등
    keywords: blog?.keywords ?? blog?.title?.replaceAll(' ', ', '),
    publisher: {
      '@type': 'Organization',
      name: 'IsJustBlog',
      logo: {
        '@type': 'ImageObject',
        url: BASE_URL + '/favicon.ico',
      },
    },
    url: 'https://example.com/blog-post-url',
    datePublished: blog?.reg_dt,
    dateModified: blog?.upd_dt,
    description: blog?.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/cate/${blogCateId}/blog/${blogId}`,
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {blog ? <ContentHeader blog={blog} blogCate={blog?.blogCate} /> : <></>}
      <div className="p-7" dangerouslySetInnerHTML={{ __html: blog?.content ?? '' }}></div>
      <div>{blog?.description}</div>
    </div>
  );
}

const ContentHeader = ({ blog, blogCate }: { blog: Blog; blogCate?: BlogCate }) => {
  return (
    <div style={{ backgroundImage: `url(${noImg.src})` }} className={styles.articleHeader}>
      <header className="h-1/3 flex flex-col items-center justify-center text-center">
        <div className={`${styles.articleH1} ${styles.container} z-[3] relative`}>
          <div className="flex content-center items-center text-center justify-center">
            <ul className={styles.carouselLayers}>
              <li>
                <Link
                  className={`${styles.categoryText} text-white bg-[rgb(246,93,96)] bg-op-[1] will-change-transform transition-all duration-300 leading-tight`}
                  href={`/cate/${blog?.blog_cate_id}`}>
                  {blogCate?.cate_nm}
                </Link>
              </li>
              <li>
                <h1 className={styles.h1}>{blog?.title}</h1>
              </li>
              <li className="text-lg text-white tracking-wide">
                <div className="text-center items-center">
                  <span className="text-[rgb(246,93,96)]">
                    <UserOutlined />
                    <span className="text-[rgb(246,93,96)] pl-1">{blog?.author_nm}</span>
                  </span>
                  <span className="mx-[5px]">·</span>
                  {blog?.reg_dt ? (
                    <span>
                      <CalendarOutlined />
                      <span className="pl-1">{formatToTimeAgo(blog?.reg_dt?.toString())}</span>
                    </span>
                  ) : (
                    ''
                  )}
                  <span className="mx-[5px]">·</span>
                  {blog?.views && blog?.views >= 0 ? (
                    <span>
                      <EyeOutlined />
                      <span className="pl-1">{IntlKoNumber.format(blog?.views)}</span>
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

// api 사용
/* 
export async function getBlog(id: number) {
  const response = await fetch(`${API_URL}/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 5000))
  return response.json();
}
   */
