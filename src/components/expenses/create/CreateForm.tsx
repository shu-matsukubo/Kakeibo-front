import { Plus } from 'lucide-react';

import { MasterSelect } from './MasterSelect';

import type { CreateFormValues } from '@/hooks/expenses/create/useCreate';
import type { ExpenseCategory, ExpensePaymentMethod } from '@/types/expenses/api';
import type { FormEvent } from 'react';

import { Button } from '@/components/common/Button';

interface Props {
  form: CreateFormValues;
  paymentMethods: ExpensePaymentMethod[];
  categories: ExpenseCategory[];
  isCreating: boolean;
  onBack: () => void;
  onChange: (name: keyof CreateFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const CreateForm = ({
  form,
  paymentMethods,
  categories,
  isCreating,
  onBack,
  onChange,
  onSubmit,
}: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={form.amount}
        onChange={event => onChange('amount', event.target.value)}
        placeholder="金額"
      />
      <input
        value={form.pointAmount}
        onChange={event => onChange('pointAmount', event.target.value)}
        placeholder="ポイント"
      />

      <MasterSelect
        value={form.paymentMethodId}
        items={paymentMethods}
        placeholder="支払方法を選択してください"
        onChange={value => onChange('paymentMethodId', value)}
      />

      <MasterSelect
        value={form.categoryId}
        items={categories}
        placeholder="カテゴリを選択してください"
        onChange={value => onChange('categoryId', value)}
      />

      <input
        value={form.memo}
        onChange={event => onChange('memo', event.target.value)}
        placeholder="メモ"
      />
      <input
        type="date"
        value={form.date}
        onChange={event => onChange('date', event.target.value)}
      />

      <Button type="button" variant="secondary" onClick={onBack}>
        戻る
      </Button>
      <Button type="submit" leftIcon={<Plus size={16} />} loading={isCreating}>
        登録
      </Button>
    </form>
  );
};
