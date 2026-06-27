import { css } from 'styled-components';

/** Frosted light panel — the website's hero-card look. */
export const glassPanel = css`
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(10, 12, 16, 0.07);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
    0 26px 60px -34px rgba(10, 12, 16, 0.28);
`;

export const glassPanelHover = css`
  transition:
    background 0.4s var(--ease-snap),
    border-color 0.4s var(--ease-snap),
    transform 0.5s var(--ease-expo);
  &:active {
    transform: scale(0.99);
  }
`;
