## Vandebron Frontend Take-home — Daniel Vidal

### Setup

```bash
cd web/react-example

# Install dependencies
npm install

# Start the dev server
npm run dev

# Run tests
npm run test

# Production build
npm run build

# Lint
npm run lint
```

---

### Changes Made

#### Bug Fixes

- **Infinite render loop** — `useEffect` in `HouseTypeSelector` was missing its dependency array, causing constant re-fetching.
- **Off-by-one resident selection** — `ResidentsSelector` compared `value === index` instead of `value === index + 1`, so clicking never matched.
- **Default residents out of range** — `ConsumptionCalculator` initialised residents to `8`, which is outside the 1–5 range. Changed to `1`.
- **Wrong house icons** — All house types rendered the same icon. Mapped each type to its correct SVG (`apartment`, `tussenwoning`, `hoekwoning`, `2-onder-1-kap`, `vrijstaand`).
- **Missing TypeScript annotation** — Added type for the `handleResidentsSelectorChange` parameter.
- **Removed stray `console.log` calls** and unused state variables.

#### New Features

- **ProductSelector** — New controlled component for selecting energy products (Stroom, Stroom & Gas). Integrated into the calculator.
- **Consumption calculation** — Pure function (`consumption.ts`) that estimates electricity (kWh) and gas (m³) based on house type, number of residents, selected product, and solar panel toggle. Uses Dutch-average base values with per-resident scaling and product modifiers.
- **Solar panels toggle** — Checkbox that reduces estimated electricity by 30%.

#### Styling

- **Migrated from CSS Modules to Tailwind CSS v4** with the `@tailwindcss/vite` plugin.
- Matched the layout and visual design to the goal app: two-column grid, selector button groups with inset shadows, DM Sans font, neutral colour palette, dark "Ok" button.
- Defined custom Tailwind theme tokens (`--shadow-selector-inset`, `--color-slate-750`, etc.) instead of using JIT arbitrary values or `!important`.
- Deleted all `.module.css` files and `Icon.module.css`.

#### Code Quality

- **DRY refactor** — Extracted a shared `SelectorGroup` component used by all three selectors, eliminating duplicated button markup and styling.
- **Test suite** — Added tests for `SelectorGroup`, `ProductSelector`, `ResidentsSelector`, `consumption` logic, and `HouseTypeSelector`. 25 tests total, all passing with coverage.
- Clean TypeScript compilation (`tsc --noEmit`), no lint errors.
