export const addMonth = (date: Date, num: number) => {
  return new Date(date.setMonth(date.getMonth() + num));
};
export const subtractMonth = (date: Date, num: number) => {
  return new Date(date.setMonth(date.getMonth() - num));
};
export const intervalBetweenDay = (start: Date, end: Date) => {
  const diffInMs = end.getTime() - start.getTime();

  // Calculate difference in days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const arrayDay: Date[] = [];
  for (let i = 0; i <= diffInDays; i++) {
    const checkDay = new Date(start);
    arrayDay.push(new Date(checkDay.setDate(start.getDate() + 1)));
  }
  return arrayDay;
};
