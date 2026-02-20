import { useMemo, useState } from 'react';
import { Info, X } from 'lucide-react';
import HouseTypeSelector from './HouseTypeSelector';
import ResidentsSelector from './ResidentsSelector';
import ProductSelector, { getProductLabel } from './ProductSelector';
import { SolarPanel } from './icons';
import { calculateConsumption, type ConsumptionResult } from './consumption';

const HOUSE_TYPE_LABELS: Record<string, string> = {
  'apartment': 'Appartement',
  'townhouse': 'Tussenwoning',
  'corner-house': 'Hoekwoning',
  'two-under-one-roof': '2 onder 1 Kap',
  'detatched-house': 'Vrijstaand',
};

export default function ConsumptionCalculator() {
  const [houseType, setHouseType] = useState('apartment');
  const [residents, setResidents] = useState(1);
  const [product, setProduct] = useState('electricity');
  const [hasSolarPanels, setHasSolarPanels] = useState(false);

  const consumption: ConsumptionResult = useMemo(
    () => calculateConsumption({ houseType, residents, product, hasSolarPanels }),
    [houseType, residents, product, hasSolarPanels],
  );

  const handleResidentsSelectorChange = (incomingResidents: number) => {
    if (incomingResidents > 0 && incomingResidents <= 5) {
      setResidents(incomingResidents);
    }
  };

  return (
    <div className="max-w-200 w-full bg-gray-100/40 px-10 py-8">

      <div className="flex justify-between items-start mb-10">
        <div className="flex items-baseline gap-5">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Verbruik berekenen
          </h2>
          <a
            href="#"
            className="text-neutral-500 underline underline-offset-3 decoration-neutral-400 text-sm hover:text-neutral-600 transition-colors"
          >
            Ik weet mijn verbruik
          </a>
        </div>
        <button
          className="text-neutral-800 hover:text-black cursor-pointer p-1 -mt-1 transition-colors"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-col gap-8">

        <div className="grid grid-cols-2 gap-12">
          <div>
            <p className="text-sm mb-3">
              <span className="font-bold text-neutral-900 mr-0.5">Type woning:</span>
              {'  '}
              <span className="text-neutral-500">{HOUSE_TYPE_LABELS[houseType] ?? houseType}</span>
            </p>
            <HouseTypeSelector value={houseType} onChange={setHouseType} />
          </div>
          <div>
            <p className="text-sm mb-3">
              <span className="font-bold text-neutral-900 mr-0.5">Aantal bewoners:</span>
              {'  '}
              <span className="text-neutral-500">{residents}</span>
            </p>
            <ResidentsSelector value={residents} onChange={handleResidentsSelectorChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div>
            <p className="text-sm mb-3">
              <span className="font-bold text-neutral-900 mr-0.5">Product:</span>
              {'  '}
              <span className="text-neutral-500">{getProductLabel(product)}</span>
            </p>
            <ProductSelector value={product} onChange={setProduct} />
          </div>

          <div className="flex items-center self-start">
            <input
              type="checkbox"
              id="solarPanels"
              checked={hasSolarPanels}
              onChange={(e) => setHasSolarPanels(e.target.checked)}
              className="w-3.5 h-3.5 cursor-pointer accent-neutral-700 rounded-sm mr-2"
            />
            <div className="text-neutral-600 shrink-0">
              <SolarPanel />
            </div>
            <label
              htmlFor="solarPanels"
              className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-neutral-800 select-none"
            >
              Zonnepanelen
              <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-neutral-300 text-white">
                <Info />
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4">
          <div className="text-xs text-neutral-400 tracking-wide">
            <span className="font-medium text-neutral-500">{consumption.electricity.toLocaleString('nl-NL')}</span>
            <span> kWh</span>
            {consumption.gas !== undefined && (
              <>
                <span className="mx-1.5 text-neutral-300">/</span>
                <span className="font-medium text-neutral-500">{consumption.gas.toLocaleString('nl-NL')}</span>
                <span> m³</span>
              </>
            )}
          </div>

          <button className="bg-slate-750 hover:bg-slate-850 text-white pl-8 pr-7 py-2.5 cursor-pointer flex items-center gap-4 text-base font-medium tracking-wide transition-colors">
            Ok
            <span className="text-lg">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
