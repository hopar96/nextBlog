import { Metadata } from 'next';
import db from './db';
import React from 'react';

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';
export const BASE_URL = 'https://www.isjustblog.com';
export const BASE_IMG_URL = 'https://img.isjustblog.com/';

export const IntlUsDate = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Seoul',
});

export const IntlKoDate = new Intl.DateTimeFormat('ko-KR');

export const IntlKoNumber = new Intl.NumberFormat('ko-KR');

export const blurImage = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjIyIiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzMzMyIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMyIgLz4KICA8cmVjdCBpZD0iciIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZykiIC8+CiAgPGFuaW1hdGUgeGxpbms6aHJlZj0iI3IiIGF0dHJpYnV0ZU5hbWU9IngiIGZyb209Ii0zMDAiIHRvPSIzMDAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAgLz4KPC9zdmc+`;

export const MenuItems = [
  {
    key: '/tools',
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🛠️' } }),
    label: `도구 모음`,
    children: [
      /* {
        key: '/tools/calcul',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🛠️' } }),
        label: `계산기`,
      }, */
      {
        key: '/tools/ip',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '📡' } }),
        label: `내 IP 확인`,
      },
      {
        key: '/tools/fixPixel',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🖥️' } }),
        label: `죽은픽셀 살리기`,
      },
      {
        key: '/tools/reactionTest',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html:  '👴🏻'} }),
        label: `반응속도 테스트`,
      },
      {
        key: '/tools/ifBuyMore',
        icon: React.createElement('span', { dangerouslySetInnerHTML: { __html:  '🏄🏻'} }),
        label: `물타기 계산기`,
      },
    ],
  },
  /* {
    key: String(1),
    icon: React.createElement(SmileOutlined),
    label: `유머`,
  },
  {
    key: String(2),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🙆‍♂️' } }),
    label: `노하우`,
  },
  {
    key: String(3),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '' } }),
    label: `스토리`,
  },
  {
    key: String(4),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🎬' } }),
    label: `연예가이슈`,
  },
  {
    key: String(5),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '👨‍⚖️' } }),
    label: `정치`,
  },
  {
    key: String(6),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '💰' } }),
    label: `경제`,
  },
  {
    key: String(7),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '' } }),
    label: `사회`,
  },
  {
    key: String(8),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🥊' } }),
    label: `사건사고`,
  },
  {
    key: String(9),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '⚽️' } }),
    label: `스포츠`,
  },
  {
    key: String(10),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '🐶' } }),
    label: `애완동물`,
  },
  {
    key: String(11),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '👨🏻‍🦱🎬' } }),
    label: `해외연예`,
  },
  {
    key: String(12),
    icon: React.createElement('span', { dangerouslySetInnerHTML: { __html: '' } }),
    label: `해외뉴스`,
  }, */
];
