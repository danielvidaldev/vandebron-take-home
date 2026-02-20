export interface HouseTypeData {
  id: string;
  label: string;
}

const houseTypes: HouseTypeData[] = [
  { id: 'apartment', label: 'Appartement' },
  { id: 'townhouse', label: 'Tussenwoning' },
  { id: 'corner-house', label: 'Hoekwoning' },
  { id: 'two-under-one-roof', label: '2 onder 1 Kap' },
  { id: 'detatched-house', label: 'Vrijstaand' },
];

/* We know this could return synchronously... Please leave it as an async Promise :) */
export const getHouseTypes = async (): Promise<HouseTypeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(houseTypes);
    }, 500);
  });
};
