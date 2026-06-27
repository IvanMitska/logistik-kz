// Language-neutral data + shared types. All human-readable copy lives in the
// i18n dictionaries (src/i18n/translations.ts); this file holds only the
// contact details, numeric model constants and the TypeScript shapes that the
// translated content arrays are typed against.

export const company = {
  name: 'logistics.kaz',
  domain: 'logistics.com.kz',
  contactPerson: 'Данил Михейлис Николаевич',
  contactShort: 'Данил',
  phone: '+66638450372',
  phoneHref: '+66638450372',
  whatsapp: 'https://wa.me/66638450372',
  email: 'danilmiheilis@gmail.com',
} as const;

export const MIN_WEIGHT_KG = 1000;
// Range spread: low = rate, high = rate × spread (covers packaging, season, etc.)
export const PRICE_SPREAD = 1.3;

// ─── Shared content shapes (typed in every language) ──────────────────────
export interface Stat {
  value: string;
  unit: string;
  label: string;
  note: string;
}

export interface Advantage {
  id: string;
  index: string;
  title: string;
  body: string;
  points: string[];
}

export interface Service {
  id: string;
  num: string;
  title: string;
  desc: string;
  meta: string[];
}

export interface Step {
  num: string;
  title: string;
  body: string;
}

export interface CargoCategory {
  id: string;
  label: string;
  rate: number; // base $/kg
  hint: string;
}

export interface RouteOption {
  id: string;
  label: string;
  factor: number; // price multiplier
  weeks: [number, number];
}

export interface Guarantee {
  title: string;
  body: string;
}

export interface Lane {
  from: string;
  to: string;
  cities: string;
  weeks: string;
}

export interface QA {
  q: string;
  a: string;
}
