import type { ExpenseGroupBy } from '@/types/expenses/api';

import { api, requireData } from '@/api/client';

export interface ExpenseSummaryParams {
  startDate: string;
  endDate: string;
  groupBy?: ExpenseGroupBy;
}

export interface ExpenseHistoryParams {
  startDate: string;
  endDate: string;
  categoryId: string;
}

export const fetchExpenseSummary = async ({
  startDate,
  endDate,
  groupBy = 'category',
}: ExpenseSummaryParams) =>
  requireData(
    await api.GET('/api/expenses/summary', {
      params: {
        query: {
          start_date: startDate,
          end_date: endDate,
          group_by: groupBy,
        },
      },
    })
  );

export const fetchExpenseHistory = async ({
  startDate,
  endDate,
  categoryId,
}: ExpenseHistoryParams) =>
  requireData(
    await api.GET('/api/expenses/history', {
      params: {
        query: {
          start_date: startDate,
          end_date: endDate,
          category_id: categoryId,
        },
      },
    })
  );
