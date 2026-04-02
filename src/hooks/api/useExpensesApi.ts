import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchMonthlyExpenses, deleteExpense } from '../../api/expenses';
import { formatMonth } from '../../utils/dateUtil';

export const useMonthlyExpenses = (currentMonth: Date) => {
  const queryClient = useQueryClient();
  const month = formatMonth(currentMonth);

  // GET
  const query = useQuery({
    queryKey: ['monthlyExpenses', month],
    queryFn: () => fetchMonthlyExpenses(month),
  });

  // DELETE
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteExpense(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['monthlyExpenses', month],
      });
    },
  });

  return {
    ...query,
    deleteExpense: mutation.mutateAsync,
  };
};
