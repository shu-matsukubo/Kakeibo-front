import { useState } from 'react';

import { addMonth } from '../../utils/dateUtil';
import { useMonthlyExpenses } from '../api/useExpensesApi';

export const useSummary = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data, isLoading, deleteExpense } = useMonthlyExpenses(currentMonth);

  const changeMonth = (diff: number) => {
    setCurrentMonth(addMonth(currentMonth, diff));
  };

  const handleDelete = (id: string) => {
    void deleteExpense(id);
  };

  return {
    currentMonth,
    changeMonth,
    data: data ?? [],
    isLoading,
    handleDelete,
  };
};
