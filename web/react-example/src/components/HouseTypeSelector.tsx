import { ReactNode, useEffect, useState } from 'react';
import { getHouseTypes, type HouseTypeData } from './HouseTypeSelector.service';
import {
  HouseApartment,
  HouseRowHome,
  HouseCornerHouse,
  HouseSemiDetached,
  HouseFreestanding,
} from './icons';
import SelectorGroup, { type SelectorItem } from './SelectorGroup';

interface HouseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

type HouseType = HouseTypeData & {
  icon: ReactNode;
};

const ICON_MAP: Record<string, ReactNode> = {
  'apartment': <HouseApartment />,
  'townhouse': <HouseRowHome />,
  'corner-house': <HouseCornerHouse />,
  'two-under-one-roof': <HouseSemiDetached />,
  'detatched-house': <HouseFreestanding />,
};

export default function HouseTypeSelector({ value, onChange }: HouseTypeSelectorProps) {
  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      const types = await getHouseTypes();
      const typesWithIcons: HouseType[] = types.map((type) => ({
        ...type,
        icon: ICON_MAP[type.id] ?? <HouseRowHome />,
      }));
      setHouseTypes(typesWithIcons);
    };
    onLoad();
  }, []);

  const items: SelectorItem[] = houseTypes.map((type) => ({
    id: type.id,
    icon: type.icon,
    label: type.id,
  }));

  return <SelectorGroup items={items} value={value} onChange={onChange} />;
}
