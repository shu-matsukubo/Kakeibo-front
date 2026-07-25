interface MasterItem {
  id: string;
  name: string;
}

interface Props {
  value: string;
  items: MasterItem[];
  placeholder: string;
  onChange: (value: string) => void;
}

export const MasterSelect = ({ value, items, placeholder, onChange }: Props) => {
  return (
    <select value={value} onChange={event => onChange(event.target.value)}>
      <option value="">{placeholder}</option>
      {items.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
