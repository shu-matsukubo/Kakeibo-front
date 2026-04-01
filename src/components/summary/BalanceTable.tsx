import { calculateBalances } from '../../utils/expenseUtil';
import { getPaymentMethod } from '../../utils/expenseUtil.ts';

import type { Expense } from '../../types/expenses';

export const BalanceTable = ({ data }: { data: Expense[] }) => {
  const balances = calculateBalances(data);

  return (
    <table className="table text-center">
      <thead>
        <tr>
          <th>支払い方法</th>
          <th>初期残高</th>
          <th>利用額</th>
          <th>残り</th>
        </tr>
      </thead>
      <tbody>
        {balances.map(b => (
          <tr key={b.name}>
            <td className={`text-${getPaymentMethod(b.name).color}`}>{b.name}</td>
            <td className={`text-${getPaymentMethod(b.name).color}`}>{b.initial}円</td>
            <td className={`text-${getPaymentMethod(b.name).color}`}>{b.used}円</td>
            <td className={`text-${getPaymentMethod(b.name).color}`}>{b.balance}円</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
