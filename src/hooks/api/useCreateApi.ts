import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../api/client';

export const useExpenseApi = () => {
  const queryClient = useQueryClient();

  // マスタ取得
  const paymentMethodsQuery = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: async () => {
      const res = await api.get<{ data: unknown[] }>('/payment-methods');
      return res.data;
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get<{ data: unknown[] }>('/categories');
      return res.data;
    },
  });

  // 登録処理
  const createMutation = useMutation({
    mutationFn: async (payload: {
      amount: number;
      point_amount: number;
      payment_method_id: string;
      category_id: string;
      memo: string;
      date: string;
    }) => {
      await api.post('/expenses', payload);
    },
    onSuccess: () => {
      // 月次一覧を更新
      queryClient.invalidateQueries({ queryKey: ['monthlyExpenses'] });
    },
  });

  return {
    paymentMethodsQuery,
    categoriesQuery,
    createExpense: createMutation.mutateAsync,
  };
};
