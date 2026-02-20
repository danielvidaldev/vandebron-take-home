import { Electric, ElectricAndGas } from './icons';
import SelectorGroup, { type SelectorItem } from './SelectorGroup';

const productOptions: SelectorItem[] = [
  { id: 'electricity', label: 'Stroom', icon: <Electric /> },
  { id: 'electricity-and-gas', label: 'Stroom & Gas', icon: <ElectricAndGas /> },
];

export function getProductLabel(productId: string): string {
  return productOptions.find((p) => p.id === productId)?.label ?? productId;
}

interface ProductSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSelector({ value, onChange }: ProductSelectorProps) {
  return <SelectorGroup items={productOptions} value={value} onChange={onChange} />;
}
