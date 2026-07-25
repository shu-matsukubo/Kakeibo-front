import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ExpenseCategory, ExpensePaymentMethod } from '@/types/expenses/api';
import type { ExpensesCreate } from '@/types/expenses/create';

import { fetchExpenseCreate } from '@/api/expenses/create';
import { fetchExpenseCategory, fetchExpensePaymentMethod } from '@/api/expenses/master';

const defaultPaymentMethods: ExpensePaymentMethod[] = [];
const defaultCategories: ExpenseCategory[] = [];

export const useExpenseApi = () => {
  const queryClient = useQueryClient();

  const paymentMethodsQuery = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: fetchExpensePaymentMethod,
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchExpenseCategory,
  });

  const createMutation = useMutation({
    mutationFn: (payload: ExpensesCreate) => fetchExpenseCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenseSummary'] });
    },
  });

  return {
    paymentMethodsQuery,
    categoriesQuery,
    paymentMethodsData: paymentMethodsQuery.data ?? defaultPaymentMethods,
    categoriesData: categoriesQuery.data ?? defaultCategories,
    createExpense: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
