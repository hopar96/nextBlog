import { Metadata } from "next";
import db from "./db";

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies'
export const BASE_URL = 'https://www.isjustblog.com'
export const BASE_IMG_URL = 'https://img.isjustblog.com/'

export const IntlUsDate = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium', timeStyle:'short', timeZone: 'Asia/Seoul'
})

export const IntlKoDate = new Intl.DateTimeFormat('ko-KR')

export const IntlKoNumber = new Intl.NumberFormat('ko-KR')


export const blurImage = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjIyIiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzMzMyIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMyIgLz4KICA8cmVjdCBpZD0iciIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZykiIC8+CiAgPGFuaW1hdGUgeGxpbms6aHJlZj0iI3IiIGF0dHJpYnV0ZU5hbWU9IngiIGZyb209Ii0zMDAiIHRvPSIzMDAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAgLz4KPC9zdmc+`


export const IpMetadata: Metadata = {
  title: '내 IP 찾기',
  description: '간단하게 내 IP를 찾을 수 있습니다.',
  keywords: [
    '내',
    '나의',
    'IP',
    '아이피',
    'ip찾기',
    '내아이피',
    '나의 아이피',
    '찾기',
    'ip검색',
    '유용한 도구',
    '도구 모음',
  ],
  openGraph: {
    type: 'website',
    url: BASE_URL + '/tools/ip',
    title: '내 IP 찾기',
    description: '간단하게 내 IP를 찾을 수 있습니다.',
    siteName: 'Is Just Blog',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/ip`,
  },
};

export const PixelMetadata: Metadata = {
  title: '죽은 픽셀 살리기',
  description: '죽은 픽셀 (Dead pixel)을 사용법에 따라 살릴 수 있습니다.',
  
  keywords: [
    '내',
    '나의',
    '스마트폰',
    '핸드폰',
    '픽셀',
    'pixel',
    '죽은 픽셀',
    'dead pixel',
    'stuck pixel',
    'fix dead pixel',
    '살리기',
    '고치기',
    '해결',
    'solve',
    '방법',
    '유용한 도구',
    'useful tools',
    '도구 모음',
    'tool box',
  ],
  openGraph: {
    type: 'website',
    url: BASE_URL + '/tools/fixPixel',
    title: '죽은 픽셀 살리기',
    description: '죽은 픽셀 (Dead pixel)을 사용법에 따라 살릴 수 있습니다.',
    siteName: 'Is Just Blog',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/fixPixel`,
  },
};