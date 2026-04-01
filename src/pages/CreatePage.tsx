import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Category, PaymentMethod } from '../types/master';

type Props = {
  onBack: () => void;
};

export const CreatePage = ({ onBack }: Props) => {
  const [amount, setAmount] = useState<string>('');
  const [pointAmount, setPointAmount] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [paymentMethodId, setPaymentMethodId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const fetchMaster = async () => {
      const pmRes = await api.get('/payment-methods');
      const catRes = await api.get('/categories');

      setPaymentMethods(pmRes.data.data);
      setCategories(catRes.data.data);
    };

    fetchMaster();
  }, []);

  const handleSubmit = async () => {
    await api.post('/expenses', {
      amount: Number(amount),
      point_amount: Number(pointAmount),
      payment_method_id: paymentMethodId,
      category_id: categoryId,
      memo,
      date,
    });

    onBack();
  };

  return (
    <div>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="金額" />

      <input
        value={pointAmount}
        onChange={e => setPointAmount(e.target.value)}
        placeholder="ポイント"
      />

      <select onChange={e => setPaymentMethodId(e.target.value)}>
        <option value="">選択してください</option>
        {paymentMethods.map(pm => (
          <option key={pm.id} value={pm.id}>
            {pm.name}
          </option>
        ))}
      </select>

      <select onChange={e => setCategoryId(e.target.value)}>
        <option value="">選択してください</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input value={memo} onChange={e => setMemo(e.target.value)} placeholder="メモ" />

      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <button onClick={onBack}>戻る</button>
      <button onClick={handleSubmit}>登録</button>
    </div>
  );
};
