import { format } from 'date-fns';

export function fDate(date) {
  return format(date, 'EEE, dd-MMM');
}
