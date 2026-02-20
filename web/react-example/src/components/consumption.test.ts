import { describe, it, expect } from 'vitest';
import { calculateConsumption } from './consumption';

describe('calculateConsumption', () => {
  it('returns base consumption for apartment with 1 resident', () => {
    const result = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    expect(result.electricity).toBe(1800);
    expect(result.gas).toBeUndefined();
  });

  it('returns higher consumption for larger house types', () => {
    const apartment = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    const detached = calculateConsumption({
      houseType: 'detatched-house',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    expect(detached.electricity).toBeGreaterThan(apartment.electricity);
  });

  it('increases electricity with more residents', () => {
    const one = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    const three = calculateConsumption({
      houseType: 'apartment',
      residents: 3,
      product: 'electricity',
      hasSolarPanels: false,
    });
    expect(three.electricity).toBe(one.electricity + 2 * 300);
  });

  it('reduces electricity with solar panels', () => {
    const without = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    const withSolar = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: true,
    });
    expect(withSolar.electricity).toBeLessThan(without.electricity);
    expect(withSolar.electricity).toBe(Math.round(without.electricity * 0.7));
  });

  it('includes gas only when product is electricity-and-gas', () => {
    const elecOnly = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    expect(elecOnly.gas).toBeUndefined();

    const elecAndGas = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity-and-gas',
      hasSolarPanels: false,
    });
    expect(elecAndGas.gas).toBeDefined();
    expect(elecAndGas.gas).toBe(800);
  });

  it('adds electricity for battery product', () => {
    const base = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    const battery = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'battery',
      hasSolarPanels: false,
    });
    expect(battery.electricity).toBe(base.electricity + 500);
  });

  it('adds electricity and reduces gas for heat pump', () => {
    const heatPump = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'heat-pump',
      hasSolarPanels: false,
    });
    expect(heatPump.electricity).toBe(1800 + 2000);
    expect(heatPump.gas).toBeUndefined();
  });

  it('adds electricity for charging station', () => {
    const base = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    const charging = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'charging-station',
      hasSolarPanels: false,
    });
    expect(charging.electricity).toBe(base.electricity + 2500);
  });

  it('falls back to apartment consumption for unknown house type', () => {
    const result = calculateConsumption({
      houseType: 'unknown',
      residents: 1,
      product: 'electricity',
      hasSolarPanels: false,
    });
    expect(result.electricity).toBe(1800);
  });

  it('gas never goes below zero', () => {
    const result = calculateConsumption({
      houseType: 'apartment',
      residents: 1,
      product: 'electricity-and-gas',
      hasSolarPanels: false,
    });
    expect(result.gas).toBeGreaterThanOrEqual(0);
  });
});
