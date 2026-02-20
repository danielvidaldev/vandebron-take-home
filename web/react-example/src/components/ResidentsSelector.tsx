import { People1, People2, People3, People4, People5 } from './icons';
import SelectorGroup, { type SelectorItem } from './SelectorGroup';

const residentIcons = [<People1 />, <People2 />, <People3 />, <People4 />, <People5 />];

const items: SelectorItem[] = residentIcons.map((icon, i) => ({
  id: String(i + 1),
  icon,
  label: `${i + 1} resident${i > 0 ? 's' : ''}`,
}));

interface ResidentsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ResidentsSelector({ value, onChange }: ResidentsSelectorProps) {
  return (
    <SelectorGroup
      items={items}
      value={String(value)}
      onChange={(id) => onChange(Number(id))}
    />
  );
}
