import { useEffect, useState } from "react";
import { fetchMonthlyExpenses } from "../api/expenses";
import { addMonth, formatMonth } from "../utils/dateUtil";
import type { Expense } from "../types/expenses";

export const SummaryPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [data, setData] = useState<Expense[]>([]);

  const changeMonth = (diff: number) => {
  setCurrentMonth(addMonth(currentMonth, diff));
  };
  useEffect(() => {
  const fetchData = async () => {
      const month = formatMonth(currentMonth);
      const data = await fetchMonthlyExpenses(month);
      setData(data);
  };

  fetchData();
  }, [currentMonth]);

  return (
    <div>
      {/* 月表示 */}
      <h2>{currentMonth.toISOString().slice(0, 7)}</h2>

      {/* 月切り替え */}
      <button onClick={() => changeMonth(-1)}>
        ←
      </button>
      <button onClick={() => changeMonth(1)}>
        →
      </button>

      {/* 合計 */}
      <div>
        {data.map((item) => (
          <div key={item.id}>
            {item.payment_method}: {item.amount}
          </div>
        ))}
      </div>
    </div>
  );
};