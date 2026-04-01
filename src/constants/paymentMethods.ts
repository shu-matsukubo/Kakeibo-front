export const INITIAL_BALANCE: Record<string, number> = {
  Suica: 14000,
  PayPay: 8000,
  Cash: 35000,
  Withdrawal: 100000,
  Others: 0,
};
export const PAYMENT_METHOD_KEYS = Object.keys(INITIAL_BALANCE);

export const PAYMENT_METHODS = {
  Suica: {
    label: 'Suica',
    color: 'green',
    initial: 14000,
  },
  PayPay: {
    label: 'PayPay',
    color: 'red',
    initial: 8000,
  },
  Cash: {
    label: '現金',
    color: 'blue',
    initial: 35000,
  },
  Withdrawal: {
    label: '引き落とし',
    color: 'purple',
    initial: 100000,
  },
  Others: {
    label: 'その他',
    color: 'gray',
    initial: 0,
  },
} as const;
