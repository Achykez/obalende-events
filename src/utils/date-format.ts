import { Installments } from '@/redux/api/payments/types';
import dayjs from 'dayjs';

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${formattedDate} ${formattedTime} `;
};

export const dateTimeFormatter = (
  dateTime: string | Date | number,
  format = 'MMM D, YYYY HH:mm a'
) => {
  return dayjs(dateTime).format(format);
};

export const isValidDate = (dateString: any) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};


export const getDueDate = (installments: Installments[]) => {
  if (installments.length === 0) return '';
  
  const earliest = installments.reduce((earliest, current) => {
    return dayjs(current.date).isBefore(dayjs(earliest.date)) ? current : earliest;
  });

  return earliest.date;
}