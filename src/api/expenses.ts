import { api } from "./client";

export const fetchMonthlyExpenses = async (month: string) => {
  const res = await api.get(`/expenses/summary?month=${month}`);
  return res.data.data;
};