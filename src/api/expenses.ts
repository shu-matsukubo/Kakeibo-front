import { api } from "./client";

export const fetchMonthlyExpenses = async (month: string | null) => {
  const res = await api.get(`/expenses?month=${month}`);
  return res.data.data;
};