import { api, requireData } from '@/api/client';

export const fetchExpensePaymentMethod = async () =>
  requireData(await api.GET('/api/payment-methods'));

export const fetchExpenseCategory = async () => requireData(await api.GET('/api/categories'));
