import type { ExpenseHistory } from '@/types/expenses/api';

type Props = {
  categoryName: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  data: ExpenseHistory[];
  isLoading: boolean;
};

const formatAmount = (amount: number) => amount.toLocaleString('ja-JP');

export const HistoryTable = ({
  categoryName,
  totalAmount,
  startDate,
  endDate,
  data,
  isLoading,
}: Props) => {
  return (
    <section className="summary-detail">
      <div className="summary-detail__header">
        <h2 className="summary-detail__title">履歴詳細</h2>
        <div className="summary-detail__meta">
          <span>カテゴリ: {categoryName}</span>
          <span>
            期間: {startDate} 〜 {endDate}
          </span>
          <span className="summary-detail__amount">合計金額: {formatAmount(totalAmount)}</span>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm">Loading...</p>
      ) : (
        <table className="summary-table">
          <thead>
            <tr>
              <th className="text-center text-lg">支払日</th>
              <th className="text-center text-lg">支払金額</th>
              <th className="text-center text-lg">メモ</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="border text-center text-md" colSpan={3}>
                  履歴はありません
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={`${row.date}-${row.memo ?? ''}-${row.net_amount}-${i}`}>
                  <td className="border text-center text-md">{row.date}</td>
                  <td className="border text-center text-md">{formatAmount(row.net_amount)}</td>
                  <td className="border text-md summary-detail__memo">{row.memo ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </section>
  );
};
