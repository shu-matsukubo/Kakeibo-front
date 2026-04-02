import { BalanceTable } from './BalanceTable';
import { SummaryTable } from './SummaryTable';
import { useSummary } from '../../hooks/summary/useSummary';

export const SummaryPage = () => {
  const { currentMonth, changeMonth, data, isLoading, handleDelete } = useSummary();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{currentMonth.toISOString().slice(0, 7)}</h2>

      <button onClick={() => changeMonth(-1)}>←</button>
      <button onClick={() => changeMonth(1)}>→</button>

      <BalanceTable data={data} />
      <SummaryTable data={data} onDelete={handleDelete} />
    </div>
  );
};
