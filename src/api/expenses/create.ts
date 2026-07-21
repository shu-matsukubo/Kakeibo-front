import { api, requireData } from '@/api/client';
import type { ExpensesCreate } from '@/types/expenses/create';

export const fetchExpenseCreate = async (payload: ExpensesCreate) =>
  requireData(
    await api.POST('/api/expenses', {
      body: payload,
    })
  );
