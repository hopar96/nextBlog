import Link from "next/link";
import Image from 'next/image';
import { AtFile, Blog } from "@prisma/client";
import { BASE_IMG_URL, blurImage, formatToTimeAgo } from "../../lib/constants";
import noImg from '/public/assets/img/noImg.jpg';

type ISelectBlog  = Blog & {
  mainAtFile?: AtFile | null
}

const BlogListCpnt = ({ blog }: { blog: ISelectBlog }) => {
  return (
    <li>
      <div className="card-div">
        <Link
          href={`/cate/${blog?.blog_cate_id}/blog/${blog?.blog_id}`}
          className="flex flex-col flex-wrap gap-y-1 items-start w-[29.5vw] max-w-[300px]">
          <div className="relative w-[29.5vw] max-w-[300px] h-[29.5vw] max-h-[300px] object-cover overflow-hidden">
            <Image
              // className='border-stone-300 border border-solid'
              src={blog?.mainAtFile ? BASE_IMG_URL + blog?.mainAtFile?.file_nm : noImg.src}
              alt="블로그 게시물의 대표 이미지"
              width={300}
              height={300}
              placeholder={blurImage}
              // fill={true}
              // layout='fill'
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
          </div>
          <div className="flex flex-col items-start pb-5 pt-2 px-3">
            <h2 className={'text-stone-800 w-full text-xl font-medium m-0 ellipsis'}>{blog?.title}</h2>
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

export default BlogListCpnt;
