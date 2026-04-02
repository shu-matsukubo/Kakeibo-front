import { getPaymentMethod } from '../../utils/expenseUtil.ts';

import type { Expense } from '../../types/expenses';

export const SummaryTable = ({
  data,
  onDelete,
}: {
  data: Expense[];
  onDelete: (id: string) => void;
}) => {
  return (
    <table className="table text-center">
      <thead>
        <tr>
          <th>支払い方法</th>
          <th>カテゴリ</th>
          <th>金額</th>
          <th>ポイント利用</th>
          <th>利用日</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td className={`text-${getPaymentMethod(item.payment_method_name).color}`}>
              {item.payment_method_name}
            </td>
            <td className={`text-${getPaymentMethod(item.payment_method_name).color}`}>
              {item.category_name}
            </td>
            <td className={`text-${getPaymentMethod(item.payment_method_name).color}`}>
              {item.amount}円
            </td>
            <td className={`text-${getPaymentMethod(item.payment_method_name).color}`}>
              {item.point_amount}ポイント
            </td>
            <td className={`text-${getPaymentMethod(item.payment_method_name).color}`}>
              {item.date}
            </td>
            <td>
              <button
                onClick={() => {
                  void onDelete(item.id);
                }}
              >
                削除
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
