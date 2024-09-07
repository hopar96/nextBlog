import { IntlUsDate } from "./constants";

export const getRandomNumber = (min:number, max:number):number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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