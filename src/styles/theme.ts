// Design tokens — logistics.kaz
// Built on the Sintara studio system (editorial neo-grotesk, fluid display
// type, expo-out motion) retuned for a strict, business logistics brand.
// Palette: cool steel paper, deep graphite ink, steel-blue accent (trust),
// cargo amber as a single warm highlight (containers / freight).

export const colors = {
  // Surfaces — cool neutral paper
  // Surfaces — clean cool neutral so the cyan→teal gradient pops
  bone: '#E9ECEF',
  boneDim: '#E2E6EA',
  boneLine: '#D6DBE1',
  paper: '#F3F5F7',
  white: '#FFFFFF',

  // Ink / dark — cool near-black so the gradient glows on dark sections
  ink: '#0C1116',
  inkSoft: '#11171E',
  inkLine: '#232B34',
  black: '#070A0D',

  muted: '#5B6570',
  mutedDark: '#8893A0',

  // ─── Accent system — quiet-luxe graphite → steel ─────────────────
  //  accent       : solid steel-graphite for links, dots, icons
  //  accentBright : lighter steel for dark backgrounds
  //  cargo        : cool steel for small pops (dots, leds, cue)
  // Swap these six + the rgb/grad lines in GlobalStyles to retheme the site.
  accent: '#46566A',
  accentHover: '#374454',
  accentSoft: '#E3E7EC',
  accentBright: '#9AA8B8',
  cargo: '#6B7A8C',
  cargoBright: '#8E9DAE',
  success: '#4F9C82',
} as const;

export const fonts = {
  display:
    "'PP Neue Montreal', 'Schibsted Grotesk', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  grotesk:
    "'Schibsted Grotesk', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
} as const;

export const fontSize = {
  displayXxl: 'clamp(4.5rem, 17vw, 19rem)',
  displayXl: 'clamp(3.5rem, 12vw, 13rem)',
  displayLg: 'clamp(2.75rem, 8.5vw, 8.5rem)',
  displayMd: 'clamp(2.25rem, 6vw, 5.5rem)',
  displaySm: 'clamp(1.875rem, 4.5vw, 3.75rem)',
  h1: 'clamp(2rem, 4.5vw, 3.75rem)',
  h2: 'clamp(1.75rem, 3.5vw, 2.75rem)',
  h3: 'clamp(1.375rem, 2.25vw, 2rem)',
  bodyLg: 'clamp(1.0625rem, 1.2vw, 1.3125rem)',
  body: '1rem',
  small: '0.875rem',
  caption: '0.75rem',
  micro: '0.6875rem',
} as const;

export const tracking = {
  tight: '-0.045em',
  displayTight: '-0.04em',
  normal: '-0.011em',
  wide: '0.04em',
  widest: '0.2em',
} as const;

export const space = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
  9: '96px',
  10: '128px',
  11: '160px',
  12: '208px',
  13: '256px',
} as const;

export const radii = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  pill: '9999px',
} as const;

export const motion = {
  fast: '0.25s',
  mid: '0.5s',
  slow: '0.85s',
  slower: '1.2s',
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  snap: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const layout = {
  containerMax: '1680px',
  containerPad: '40px',
  containerPadMobile: '20px',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
} as const;

export const mq = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  belowMd: `@media (max-width: ${breakpoints.md})`,
  belowLg: `@media (max-width: ${breakpoints.lg})`,
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  nav: 100,
  overlay: 500,
  modal: 1000,
  preloader: 9000,
} as const;

export const theme = {
  colors,
  fonts,
  fontSize,
  tracking,
  space,
  radii,
  motion,
  layout,
  breakpoints,
  mq,
  zIndex,
} as const;

export type Theme = typeof theme;
export default theme;
