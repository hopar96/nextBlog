import db from "./db";

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies'
export const BASE_URL = 'https://www.isjustblog.com'
export const BASE_IMG_URL = 'https://img.isjustblog.com/'

export const IntlUsDate = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium', timeStyle:'short', timeZone: 'Asia/Seoul'
})

export const IntlKoDate = new Intl.DateTimeFormat('ko-KR')

export const IntlKoNumber = new Intl.NumberFormat('ko-KR')

export function formatToTimeAgo(date: string): string {

  const dayInMs = 1000 * 60 * 60 * 24;
  const hourInMs = 1000 * 60 * 60;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diffDay = Math.round((time - now) / dayInMs);
  const diffHour = Math.round((time - now) / hourInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  if (-30 < diffDay && diffDay < 0) {
    return formatter.format(diffDay, 'days')
  } else if (diffDay == 0) {
    return formatter.format(diffHour, 'hours')
  } else {
    return IntlUsDate.format(time)
  }
}

export const blurImage = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iMjAlIiAvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjIyIiBvZmZzZXQ9IjUwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzMzMyIgb2Zmc2V0PSI3MCUiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMyIgLz4KICA8cmVjdCBpZD0iciIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZykiIC8+CiAgPGFuaW1hdGUgeGxpbms6aHJlZj0iI3IiIGF0dHJpYnV0ZU5hbWU9IngiIGZyb209Ii0zMDAiIHRvPSIzMDAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAgLz4KPC9zdmc+`
