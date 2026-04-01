export const formatMonth = (date: Date) => {
  return date.toISOString().slice(0, 7); // YYYY-MM
};

export const addMonth = (date: Date, diff: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + diff);
  return d;
};
