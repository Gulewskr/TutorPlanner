import { getDay } from 'date-fns';

export const getDayOfWeek = (date: Date) => (getDay(date) + 6) % 7;
