import { Metadata } from "next";
import { BASE_URL } from "./constants";

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

export const ReactionTestMetadata: Metadata = {
  title: '반응 속도 테스트',
  description: '간단한 테스트로 반응 속도를 알아보세요.',
  keywords: [
    '내',
    '나의',
    '반응속도',
    '반응 속도',
    'reaction time test',
    'reaction test',
    'time',
    '유용한 도구',
    'useful tools',
    '도구 모음',
    'tool box',
  ],
  openGraph: {
    type: 'website',
    url: BASE_URL + '/tools/reactionTest',
    title: '반응 속도 테스트',
    description: '간단한 테스트로 반응 속도를 알아보세요.',
    siteName: 'Is Just Blog',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/reactionTest`,
  },
};


export const IfBuyMoreMetadata: Metadata = {
  title: '물타기 계산기',
  description: '물타기 계산기를 통해 추가 매수 했을 경우의 평균 단가, 총 매수 비용, 보유 수량을 확인 하세요.',
  keywords: [
    '내',
    '나의',
    '주식',
    'stock',
    '코인',
    'coin',
    '물타기 계산기',
    '물타기',
    '더 매수 했을 경우',
    '평균 단가',
    '유용한 도구',
    'useful tools',
    '도구 모음',
    'tool box',
  ],
  openGraph: {
    type: 'website',
    url: BASE_URL + '/tools/ifBuyMore',
    title: '반응 속도 테스트',
    description: '간단한 테스트로 반응 속도를 알아보세요.',
    siteName: 'Is Just Blog',
  },
  alternates: {
    canonical: `${BASE_URL}/tools/ifBuyMore`,
  },
};
