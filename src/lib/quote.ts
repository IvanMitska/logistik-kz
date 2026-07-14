// Tiny shared store so the calculator can hand a prefilled summary to the
// lead form without a global state library.

export interface Quote {
  summary: string;
  /** Structured calculator data — forwarded to the CRM together with the lead. */
  estimate?: {
    weightKg: number;
    category: string;
    route: string;
  };
}

let current: Quote | null = null;
const subs = new Set<(q: Quote) => void>();

export const setQuote = (q: Quote) => {
  current = q;
  subs.forEach((f) => f(q));
};

export const getQuote = () => current;

export const onQuote = (f: (q: Quote) => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
