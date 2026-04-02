import { api } from './client';
import { ExpenseListSchema } from '../schemas/expense';

export const fetchMonthlyExpenses = async (month: string) => {
  const res = await api.get<{ data: unknown }>(`/expenses?month=${month}`);
  return ExpenseListSchema.parse(res.data);
};

export const deleteExpense = async (id: string) => {
  await api.delete(`/expenses/${id}`);
};
