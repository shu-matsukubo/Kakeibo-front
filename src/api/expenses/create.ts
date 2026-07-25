import type { ExpensesCreate } from '@/types/expenses/create';

import { api, requireData } from '@/api/client';

export const fetchExpenseCreate = async (payload: ExpensesCreate) =>
  requireData(
    await api.POST('/api/expenses', {
      body: payload,
    })
  );
