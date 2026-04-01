import { useState } from 'react';
import { api } from '../../api/client';
import { useMonthlyExpenses } from '../../hooks/useMonthlyExpenses';
import { addMonth } from '../../utils/dateUtil';
import { BalanceTable } from './BalanceTable';
import { SummaryTable } from './SummaryTable';

export const SummaryPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data, setData } = useMonthlyExpenses(currentMonth);

  const changeMonth = (diff: number) => {
    setCurrentMonth(addMonth(currentMonth, diff));
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/expenses/${id}`);
    setData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>{currentMonth.toISOString().slice(0, 7)}</h2>

      <button onClick={() => changeMonth(-1)}>←</button>
      <button onClick={() => changeMonth(1)}>→</button>

      <div className="center font-base">
        <BalanceTable data={data} />
      </div>

      <div className="center font-base">
        <SummaryTable data={data} onDelete={handleDelete} />
      </div>
    </div>
  );
};
