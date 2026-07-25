import { CreatePage } from '@/components/expenses/create/CreatePage';

export interface Props {
  onBack: () => void;
}

export default function CreateIndex({ onBack }: Props) {
  return <CreatePage onBack={onBack} />;
}
