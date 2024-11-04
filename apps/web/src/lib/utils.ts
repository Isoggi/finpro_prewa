// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type AlertOptions = {
  title: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  text?: string;
};

export const showAlert = async ({
  title,
  text,
  icon = 'info',
}: AlertOptions) => {
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  return await Toast.fire({
    title,
    text,
    icon,
  });
};

export const formatStyledDate = (utcDate: string) => {
  const date = new Date(utcDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // Short weekday (Sen)
    day: 'numeric', // Day of the month (21)
    month: 'short', // Short month (Okt)
    year: 'numeric', // Full year (2024)
  };

  // Create a custom formatter for Indonesian locale
  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
  return formattedDate;
};

export const dateDiffNum = (start: Date, end: Date) => {
  const diffInMs = end.getTime() - start.getTime();

  // Calculate difference in days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
};

export const dateDiff = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();

  // Calculate difference in days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 7) {
    // Less than 7 days, just return the days
    return `${Math.round(diffInDays)} hari`;
  } else if (diffInDays < 30) {
    // Calculate weeks and remaining days
    const weeks = Math.floor(diffInDays / 7);
    const remainingDays = Math.round(diffInDays % 7);
    return `${weeks} minggu ${remainingDays ? `${remainingDays} hari` : ''}`;
  } else {
    // Calculate months and remaining days
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    let diffInMonths = yearDiff * 12 + monthDiff;

    // Calculate the remaining days after months
    const tempStart = new Date(start);
    tempStart.setMonth(tempStart.getMonth() + diffInMonths);
    const remainingDays = Math.round(
      (end.getTime() - tempStart.getTime()) / (1000 * 60 * 60 * 24),
    );

    return `${diffInMonths} bulan ${remainingDays ? `${remainingDays} hari` : ''}`;
  }
};
