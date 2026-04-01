import { INITIAL_BALANCE, PAYMENT_METHOD_KEYS, PAYMENT_METHODS } from '../constants/paymentMethods';
import type { Expense } from '../types/expenses';

export const calculateBalances = (data: Expense[]) => {
  const summary: Record<string, { amount: number; point: number }> = {};

  // まず全キーを 0 初期化しておく
  PAYMENT_METHOD_KEYS.forEach(key => {
    summary[key] = { amount: 0, point: 0 };
  });

  // データを集計
  data.forEach(item => {
    const key = INITIAL_BALANCE[item.payment_method_name] ? item.payment_method_name : 'Others';

    summary[key].amount += item.amount;
    summary[key].point += item.point_amount;
  });

  // 全キーをそのまま map
  return PAYMENT_METHOD_KEYS.map(key => {
    const val = summary[key];
    const initial = INITIAL_BALANCE[key] ?? 0;
    const used = val.amount - val.point;
    const balance = initial - used;

    return { name: key, initial, used, balance };
  });
};

export const getPaymentMethod = (name: string) => {
  return PAYMENT_METHODS[name as keyof typeof PAYMENT_METHODS] ?? PAYMENT_METHODS.Others;
};
