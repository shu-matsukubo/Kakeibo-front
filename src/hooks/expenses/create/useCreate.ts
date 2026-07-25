import { useState } from 'react';

import type { FormEvent } from 'react';

import { useExpenseApi } from '@/hooks/expenses/api/useCreateApi';

interface CreateFormValues {
  amount: string;
  pointAmount: string;
  paymentMethodId: string;
  categoryId: string;
  memo: string;
  date: string;
}

interface UseCreateProps {
  onCreated: () => void;
}

const initialFormValues: CreateFormValues = {
  amount: '',
  pointAmount: '',
  paymentMethodId: '',
  categoryId: '',
  memo: '',
  date: '',
};

export const useCreate = ({ onCreated }: UseCreateProps) => {
  const {
    paymentMethodsQuery,
    categoriesQuery,
    paymentMethodsData,
    categoriesData,
    createExpense,
    isCreating,
  } = useExpenseApi();

  const [form, setForm] = useState<CreateFormValues>(initialFormValues);

  const updateForm = (name: keyof CreateFormValues, value: string) => {
    setForm(current => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createExpense({
      amount: Number(form.amount),
      point_amount: Number(form.pointAmount),
      payment_method_id: form.paymentMethodId,
      category_id: form.categoryId,
      memo: form.memo,
      date: form.date,
    });

    onCreated();
  };

  return {
    form,
    updateForm,
    paymentMethodsData,
    categoriesData,
    handleSubmit,
    isLoading: paymentMethodsQuery.isLoading || categoriesQuery.isLoading,
    isCreating,
  };
};

export type { CreateFormValues };
