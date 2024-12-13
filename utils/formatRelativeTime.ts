import { formatDistanceToNow } from "date-fns";

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};
