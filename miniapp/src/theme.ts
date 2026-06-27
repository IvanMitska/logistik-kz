// Design tokens — shared brand language with the logistics.kaz website
// (src/styles/theme.ts). Quiet-luxe graphite → steel palette, PP Neue Montreal.

export const colors = {
  bone: '#E9ECEF',
  boneDim: '#E2E6EA',
  boneLine: '#D6DBE1',
  paper: '#F3F5F7',
  white: '#FFFFFF',

  ink: '#0C1116',
  inkSoft: '#11171E',
  inkLine: '#232B34',
  black: '#070A0D',

  muted: '#5B6570',
  mutedDark: '#8893A0',

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
    "'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
} as const;

export const motion = {
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  snap: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
