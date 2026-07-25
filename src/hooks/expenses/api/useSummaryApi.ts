import { useQuery } from '@tanstack/react-query';

import type { ExpenseGroupBy, ExpenseHistoryResponse } from '@/types/expenses/api';

import { fetchExpenseHistory, fetchExpenseSummary } from '@/api/expenses/summary';

const defaultResponse = {
  data: [],
  meta: {
    total_net_amount: 0,
    fixed_cost_net_amount: 0,
    fixed_costs: [],
  },
};

const defaultHistoryResponse: ExpenseHistoryResponse = [];

export const useSummaryApi = (startDate: string, endDate: string, groupBy: ExpenseGroupBy) => {
  const query = useQuery({
    queryKey: ['expenseSummary', startDate, endDate, groupBy],
    queryFn: () => fetchExpenseSummary({ startDate, endDate, groupBy }),
  });

  return {
    ...query,
    data: query.data ?? defaultResponse,
  };
};

export const useExpenseHistoryApi = (startDate: string, endDate: string, categoryId?: string) => {
  const query = useQuery({
    queryKey: ['expenseHistory', startDate, endDate, categoryId],
    queryFn: () =>
      fetchExpenseHistory({
        startDate,
        endDate,
        categoryId: categoryId ?? '',
      }),
    enabled: Boolean(categoryId),
  });

  return {
    ...query,
    data: query.data ?? defaultHistoryResponse,
  };
};
