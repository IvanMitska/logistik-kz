import { createGlobalStyle } from 'styled-components';
import { colors, fonts, motion } from './theme';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'PP Neue Montreal';
    src: url('/fonts/PPNeueMontreal-Regular.woff2') format('woff2');
    font-weight: 400; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'PP Neue Montreal';
    src: url('/fonts/PPNeueMontreal-Semibold.woff2') format('woff2');
    font-weight: 600; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'PP Neue Montreal';
    src: url('/fonts/PPNeueMontreal-Extrabold.woff2') format('woff2');
    font-weight: 800; font-style: normal; font-display: swap;
  }

  :root {
    --bone: ${colors.bone};
    --bone-dim: ${colors.boneDim};
    --bone-line: ${colors.boneLine};
    --paper: ${colors.paper};
    --white: ${colors.white};
    --ink: ${colors.ink};
    --ink-soft: ${colors.inkSoft};
    --ink-line: ${colors.inkLine};
    --black: ${colors.black};
    --muted: ${colors.muted};
    --muted-dark: ${colors.mutedDark};
    --accent: ${colors.accent};
    --accent-hover: ${colors.accentHover};
    --accent-soft: ${colors.accentSoft};
    --accent-bright: ${colors.accentBright};
    --cargo: ${colors.cargo};
    --cargo-bright: ${colors.cargoBright};
    --success: ${colors.success};

    --accent-rgb: 70, 86, 106;
    --cargo-rgb: 107, 122, 140;
    --grad: linear-gradient(100deg, #2B3440 0%, #45525F 52%, #6B7A8C 100%);
    --grad-text: linear-gradient(100deg, #232E3A 0%, #44535F 55%, #6A7A8C 100%);

    --font-display: ${fonts.display};
    --font-mono: ${fonts.mono};
    --ease-expo: ${motion.expo};
    --ease-snap: ${motion.snap};

    /* Telegram safe-area insets (fallback to env() for browsers). */
    --tg-top: var(--tg-content-safe-area-inset-top, env(safe-area-inset-top, 0px));
    --tg-bottom: env(safe-area-inset-bottom, 0px);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background: var(--paper);
  }

  body {
    font-family: var(--font-display);
    font-weight: 400;
    line-height: 1.5;
    color: var(--ink);
    background: var(--paper);
    letter-spacing: -0.011em;
    overflow-x: hidden;
    /* radial brand wash so the app never reads as a flat white box */
    background-image:
      radial-gradient(120% 80% at 100% 0%, rgba(var(--cargo-rgb), 0.10), transparent 60%),
      radial-gradient(100% 70% at 0% 100%, rgba(var(--accent-rgb), 0.08), transparent 55%);
    background-attachment: fixed;
  }

  #root {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 500;
    line-height: 1.05;
  }

  button {
    font-family: inherit;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  img, svg { display: block; max-width: 100%; }

  ::selection { background: var(--accent); color: #fff; }

  /* Hide scrollbars but keep scroll. */
  ::-webkit-scrollbar { width: 0; height: 0; }

  .accent {
    background: var(--grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
