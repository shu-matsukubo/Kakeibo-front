import type { ExpenseSummaryMeta } from '@/types/expenses/api';

type Props = {
  data: ExpenseSummaryMeta['fixed_costs'];
};

export const FixedCostTable = ({ data }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="text-center text-lg">名前</th>
          <th className="text-center text-lg">支払日</th>
          <th className="text-center text-lg">金額</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={`${row.payment_date}-${row.name}-${i}`}>
            <td className="border text-center text-md">{row.name}</td>
            <td className="border text-center text-md">{row.payment_date}</td>
            <td className="border text-center text-md">{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
