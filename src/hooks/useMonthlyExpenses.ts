import { useEffect, useState } from 'react';
import { fetchMonthlyExpenses } from '../api/expenses';
import type { Expense } from '../types/expenses';
import { formatMonth } from '../utils/dateUtil';

export const useMonthlyExpenses = (currentMonth: Date) => {
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    const load = async () => {
      const month = formatMonth(currentMonth);
      const result = await fetchMonthlyExpenses(month);
      setData(result);
    };
    load();
  }, [currentMonth]);

  return { data, setData };
};
