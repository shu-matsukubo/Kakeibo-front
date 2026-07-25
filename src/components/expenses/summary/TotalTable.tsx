import type { ExpenseSummaryMeta } from '@/types/expenses/api';

interface Props {
  data: ExpenseSummaryMeta;
}

export const TotalTable = ({ data }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="text-center text-lg">合計</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border text-center text-md">{data.total_net_amount ?? 0}</td>
        </tr>
      </tbody>
    </table>
  );
};
