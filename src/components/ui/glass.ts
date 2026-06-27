import { css } from 'styled-components';

/**
 * Shared glassmorphism surface. Frosted blur + saturated backdrop, a
 * 1px light edge and a soft inner highlight so panels read as polished
 * glass rather than flat translucent boxes. Use on dark grounds.
 */
export const glass = css`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(22px) saturate(1.6);
  -webkit-backdrop-filter: blur(22px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
    0 24px 60px -24px rgba(0, 0, 0, 0.7);
`;

/**
 * Light glass — frosted white panel for use on light/white grounds.
 * Subtle ink border + soft drop shadow so it reads as polished glass,
 * not a flat grey box.
 */
export const glassLight = css`
  background: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(10, 12, 16, 0.08);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
    0 22px 50px -26px rgba(10, 12, 16, 0.22);
`;

export const glassLightHover = css`
  transition:
    background 0.4s var(--ease-snap),
    border-color 0.4s var(--ease-snap),
    transform 0.5s var(--ease-expo);
  &:hover {
    background: rgba(255, 255, 255, 0.82);
    border-color: rgba(10, 12, 16, 0.16);
  }
`;

export const glassHover = css`
  transition:
    background 0.4s var(--ease-snap),
    border-color 0.4s var(--ease-snap),
    transform 0.5s var(--ease-expo);
  &:hover {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.13) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border-color: rgba(255, 255, 255, 0.22);
  }
`;

/**
 * Panel surface — the Hero card look, tuned for opaque light sections.
 * Frosted translucent white over a soft ink hairline, a glass top-edge
 * highlight and a soft diffuse drop shadow that lifts the panel off the
 * page. Use this instead of flat `var(--white)` + hard `--bone-line`
 * boxes so every "window" reads like the hero card.
 */
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
    box-shadow 0.5s var(--ease-expo),
    transform 0.5s var(--ease-expo);
  &:hover {
    background: rgba(255, 255, 255, 0.88);
    border-color: rgba(10, 12, 16, 0.12);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.95),
      0 34px 72px -34px rgba(10, 12, 16, 0.32);
  }
`;
