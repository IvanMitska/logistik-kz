// Calculator logic — mirrors the website's Calculator (src/sections/Calculator.tsx
// + src/data/content.ts) so the mini-app produces the exact same estimate.
// Pure functions, no deps.

import type { CargoCategoryId, RouteId } from './types.ts';

export interface CargoCategory {
  id: CargoCategoryId;
  label: string;
  rate: number; // base $/kg
  hint: string;
}

export const cargoCategories: CargoCategory[] = [
  { id: 'general', label: 'Обычные товары', rate: 0.5, hint: 'Непродовольственные грузы общего назначения' },
  { id: 'textile', label: 'Текстиль и одежда', rate: 0.6, hint: 'Одежда, ткани, обувь' },
  { id: 'fragile', label: 'Хрупкие / упаковка', rate: 0.75, hint: 'Стекло, керамика, мебель' },
  { id: 'electronics', label: 'Электроника', rate: 0.9, hint: 'Техника, гаджеты, комплектующие' },
];

export interface RouteOption {
  id: RouteId;
  label: string;
  factor: number; // price multiplier
  weeks: [number, number];
}

export const routeOptions: RouteOption[] = [
  { id: 'kz', label: 'Казахстан', factor: 1, weeks: [2, 4] },
  { id: 'ru', label: 'Россия', factor: 1.15, weeks: [3, 6] },
];

export const MIN_WEIGHT_KG = 1000;
// Range spread: low = rate, high = rate × spread (packaging, season, etc.)
export const PRICE_SPREAD = 1.3;

export const SLIDER_MIN = 500;
export const SLIDER_MAX = 20000;

export interface Estimate {
  rate: number;
  low: number;
  high: number;
  weeks: [number, number];
  below: boolean;
}

export function estimate(kg: number, catId: CargoCategoryId, routeId: RouteId): Estimate {
  const category = cargoCategories.find((c) => c.id === catId) ?? cargoCategories[0]!;
  const route = routeOptions.find((r) => r.id === routeId) ?? routeOptions[0]!;
  const billable = Math.max(kg, MIN_WEIGHT_KG);
  const rate = category.rate * route.factor;
  return {
    rate,
    low: billable * rate,
    high: billable * rate * PRICE_SPREAD,
    weeks: route.weeks,
    below: kg < MIN_WEIGHT_KG,
  };
}

/** "$1,300" — rounded to the nearest $10, ru grouping. */
export function fmtUsd(n: number): string {
  return '$' + (Math.round(n / 10) * 10).toLocaleString('ru-RU');
}

/** "1.5 т" / "800 кг" */
export function fmtWeight(kg: number): string {
  return kg >= 1000 ? `${(kg / 1000).toFixed(kg % 1000 ? 1 : 0)} т` : `${kg} кг`;
}
