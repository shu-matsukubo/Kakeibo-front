import { useEffect, useState } from "react";
import { fetchMonthlyExpenses } from "../api/expenses";
import { addMonth, formatMonth } from "../utils/dateUtil";
import { api } from "../api/client";
import type { Expense } from "../types/expenses";

export const SummaryPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [data, setData] = useState<Expense[]>([]);

  const changeMonth = (diff: number) => {
    setCurrentMonth(addMonth(currentMonth, diff));
  };

  const fetchData = async () => {
      const month = formatMonth(currentMonth);
      const data = await fetchMonthlyExpenses(month);
      setData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
        const month = formatMonth(currentMonth);
        const data = await fetchMonthlyExpenses(month);
        setData(data);
    };

    fetchData();
  }, [currentMonth]);

  const handleDelete = async (id: string) => {
    await api.delete(`/expenses/${id}`);
    await fetchData();
  };

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
      <div className="center font-base">
        <table className="table text-center">
          <thead>
            <tr>
              <th>支払い方法</th>
              <th>カテゴリ</th>
              <th>金額</th>
              <th>利用日</th>
              <th>削除</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.payment_method_name}</td>
                <td>{item.category_name}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td><button onClick={() => handleDelete(item.id)}>削除</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};