import {
  parseISO,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

export default function formatElapsedTime(created_at) {
  const createdAtDate = parseISO(created_at);
  const now = new Date();

  const hours = differenceInHours(now, createdAtDate);
  if (hours < 24) {
    return "today";
  }

  const days = differenceInDays(now, createdAtDate);
  if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }

  const weeks = differenceInWeeks(now, createdAtDate);
  if (days < 30) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  const months = differenceInMonths(now, createdAtDate);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
