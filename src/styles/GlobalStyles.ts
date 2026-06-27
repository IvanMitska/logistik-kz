import { createGlobalStyle } from 'styled-components';
import { colors, fonts, motion, tracking } from './theme';

const GlobalStyles = createGlobalStyle`
  /* @font-face for 'PP Neue Montreal' is declared statically in index.html so the
     preloaded woff2 files are referenced immediately at load. */

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

    /* rgb channels for translucent accents (glows, tints) */
    --accent-rgb: 70, 86, 106;
    --cargo-rgb: 107, 122, 140;
    /* signature brand gradient — quiet-luxe graphite → steel.
       Tonal, single cool hue family. Used on primary CTAs and as
       gradient text on accent words. */
    --grad: linear-gradient(100deg, #2B3440 0%, #45525F 52%, #6B7A8C 100%);
    --grad-text: linear-gradient(100deg, #232E3A 0%, #44535F 55%, #6A7A8C 100%);

    --font-display: ${fonts.display};
    --font-grotesk: ${fonts.grotesk};
    --font-mono: ${fonts.mono};

    --ease-expo: ${motion.expo};
    --ease-snap: ${motion.snap};
  }

  *,
  *::before,
  *::after {
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
    scroll-behavior: auto;
    background: var(--paper);
    overflow-y: scroll;
  }

  html.lenis,
  html.lenis body {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  .lenis.lenis-stopped {
    overflow: hidden;
  }

  body {
    font-family: var(--font-grotesk);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--ink);
    background: var(--paper);
    /* clip (not hidden) — hides horizontal bleed WITHOUT turning body into a
       scroll container, which would break every position: sticky on the page. */
    overflow-x: clip;
    min-height: 100vh;
    letter-spacing: ${tracking.normal};
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    position: relative;
    z-index: 1;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 500;
    line-height: 1;
    color: inherit;
  }

  p {
    line-height: 1.55;
  }

  a {
    color: inherit;
    text-decoration: none;
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

  img, svg, video, canvas {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: var(--accent);
    color: #fff;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    border-radius: 2px;
  }

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(10, 12, 16, 0.22);
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--ink);
  }

  @media (pointer: coarse) {
    html {
      overflow-y: auto;
      background: ${colors.black};
    }
    body {
      background: ${colors.black};
    }
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  [data-surface='dark'] {
    background: var(--ink);
    color: #fff;
  }
  [data-surface='dark'] ::selection {
    background: var(--accent-bright);
    color: var(--ink);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
