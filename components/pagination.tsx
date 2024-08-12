'use client';

import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';

export default function CustomPagination({
  url,
  total,
  current,
  pageSize,
}: {
  url: string;
  total: number;
  current: number;
  pageSize: number;
}) {
  const router = useRouter();
  function onChange(page: number, pageSize: number) {
    router.push(`${url}?page=${page}`);
  }

  return(
    <>
      {total > 0 ?
      <Pagination total={total} current={current} pageSize={pageSize} onChange={onChange} /> 
      : ''}
    </>);
}
