import { format } from 'date-fns';

export function fDate(date) {
  return format(new Date(date), 'EEE, dd-MMM');
}

export function fDateString(date) {
  return format(new Date(date), 'yyyy-MM-dd');
}
