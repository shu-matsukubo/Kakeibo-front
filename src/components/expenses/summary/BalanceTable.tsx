import type { ExpenseSummary } from '@/types/expenses/api';

interface Props {
  data: ExpenseSummary[];
  selectedCategoryId?: string;
  onRowClick?: (row: ExpenseSummary) => void;
}

export const BalanceTable = ({ data, selectedCategoryId, onRowClick }: Props) => {
  return (
    <table className="summary-table">
      <thead>
        <tr>
          <th className="text-center text-lg">名前</th>
          <th className="text-center text-lg">収支</th>
          <th className="text-center text-lg">残高</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          const isClickable = Boolean(onRowClick && row.category_id);
          const isSelected = row.category_id === selectedCategoryId;
          const rowClassName = [
            isClickable && 'summary-table__row--clickable',
            isSelected && 'summary-table__row--selected',
          ]
            .filter(Boolean)
            .join(' ');
          const rowKey = row.category_id ?? row.payment_method_id ?? row.date ?? String(i);

          return (
            <tr
              key={rowKey}
              className={rowClassName}
              onClick={isClickable ? () => onRowClick?.(row) : undefined}
              onKeyDown={
                isClickable
                  ? event => {
                      if (event.key !== 'Enter' && event.key !== ' ') return;

                      event.preventDefault();
                      onRowClick?.(row);
                    }
                  : undefined
              }
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-pressed={isClickable ? isSelected : undefined}
            >
              <td className="border text-center text-md">
                {row.category_name ?? row.payment_method_name ?? row.date}
              </td>
              <td className="border text-center text-md">{row.net_amount}</td>
              <td className="border text-center text-md">{row.remaining_balance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
