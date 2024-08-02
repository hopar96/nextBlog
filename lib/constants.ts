import db from "./db";

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies'

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

