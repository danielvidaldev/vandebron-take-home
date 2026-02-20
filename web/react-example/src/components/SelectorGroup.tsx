import { ReactNode } from 'react';

export interface SelectorItem {
  id: string;
  icon: ReactNode;
  label: string;
}

interface SelectorGroupProps {
  items: SelectorItem[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectorGroup({ items, value, onChange }: SelectorGroupProps) {
  return (
    <div className="inline-flex shadow-lg">
      {items.map((item) => {
        const isSelected = value === item.id;
        return (
          <button
            key={item.id}
            aria-label={item.label}
            onClick={() => onChange(item.id)}
            className={`
              selector-icon w-15 h-14 shadow-selector-inset flex items-center justify-center cursor-pointer transition-all outline-none
              ${isSelected
                ? 'bg-white shadow-xl text-neutral-700'
                : 'bg-neutral-50 hover:bg-gray-100/60 text-neutral-400'
              }
            `}
            aria-selected={isSelected}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
}
