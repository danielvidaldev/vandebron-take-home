export type ConsumptionResult = { electricity: number; gas?: number };

interface ConsumptionParams {
  houseType: string;
  residents: number;
  product: string;
  hasSolarPanels: boolean;
}

const BASE_CONSUMPTION: Record<string, { electricity: number; gas: number }> = {
  'apartment': { electricity: 1800, gas: 800 },
  'townhouse': { electricity: 2500, gas: 1100 },
  'corner-house': { electricity: 2800, gas: 1300 },
  'two-under-one-roof': { electricity: 3200, gas: 1500 },
  'detatched-house': { electricity: 3800, gas: 1800 },
};

const ELECTRICITY_PER_EXTRA_RESIDENT = 300;
const GAS_PER_EXTRA_RESIDENT = 100;
const SOLAR_PANEL_REDUCTION = 0.3;

const PRODUCT_ELECTRICITY_MODIFIER: Record<string, number> = {
  'battery': 500,
  'heat-pump': 2000,
  'charging-station': 2500,
};

const PRODUCT_GAS_MODIFIER: Record<string, number> = {
  'heat-pump': -500,
};

export function calculateConsumption({
  houseType,
  residents,
  product,
  hasSolarPanels,
}: ConsumptionParams): ConsumptionResult {
  const base = BASE_CONSUMPTION[houseType] ?? BASE_CONSUMPTION['apartment'];
  const extraResidents = Math.max(0, residents - 1);

  let electricity = base.electricity + extraResidents * ELECTRICITY_PER_EXTRA_RESIDENT;
  let gas = base.gas + extraResidents * GAS_PER_EXTRA_RESIDENT;

  electricity += PRODUCT_ELECTRICITY_MODIFIER[product] ?? 0;
  gas += PRODUCT_GAS_MODIFIER[product] ?? 0;
  gas = Math.max(0, gas);

  if (hasSolarPanels) {
    electricity = electricity * (1 - SOLAR_PANEL_REDUCTION);
  }

  const result: ConsumptionResult = {
    electricity: Math.round(electricity),
  };

  if (product === 'electricity-and-gas') {
    result.gas = Math.round(gas);
  }

  return result;
}
