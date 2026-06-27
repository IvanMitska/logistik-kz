import styled from 'styled-components';
import LogoMark from './mark';

/**
 * Brand logo — adaptive wordmark + tile-less mark.
 *
 * Both layers inherit `currentColor`, so the whole lockup flips white on dark
 * sections and ink on light ones — only the mark's single amber ray stays the
 * brand orange. No blue square: the mark is the bare radiant burst.
 *
 *   <Logo />                       // compact lockup: wordmark + mark
 *   <Logo $variant="brand" />      // full lockup: wordmark + mark + tagline
 *   <Logo $variant="mark" />       // mark only (the burst)
 *   <Logo $height="clamp(...)"/>   // custom height; width derives from ratio
 *
 * Each variant overlays the inline mark on top of the masked wordmark at the
 * exact coordinates from the source artwork, so the lockup reproduces the
 * delivered SVG one-to-one while staying fully adaptive.
 */
type Variant = 'full' | 'brand' | 'mark';

interface Cfg {
  ratio: number; // width / height of the whole lockup
  wordmark: string | null; // mask source, null for mark-only
  mark: { left: number; top: number; width: number; height: number }; // 0..1 fractions
}

// Coordinates straight from the source artwork viewBoxes:
//   compact  logo .svg   2523 × 748, mark at x1782.5 w739.859 (right)
//   brand    logo2.svg   3683 × 748, mark at x1782.5 w739.859 (centre) + tagline
const CFG: Record<Variant, Cfg> = {
  full: {
    ratio: 2523 / 748,
    wordmark: '/logo-wordmark.svg',
    mark: { left: 1782.5 / 2523, top: 0, width: 739.859 / 2523, height: 739.859 / 748 },
  },
  brand: {
    ratio: 3683 / 748,
    wordmark: '/logo-wordmark-brand.svg',
    mark: { left: 1782.5 / 3683, top: 0, width: 739.859 / 3683, height: 739.859 / 748 },
  },
  mark: {
    ratio: 1,
    wordmark: null,
    mark: { left: 0, top: 0, width: 1, height: 1 },
  },
};

const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

const Wrap = styled.span<{ $variant: Variant; $height?: string }>`
  position: relative;
  display: block;
  flex: none;
  color: inherit;
  height: ${({ $height }) => $height ?? '26px'};
  width: ${({ $variant, $height = '26px' }) => `calc(${$height} * ${CFG[$variant].ratio})`};

  /* wordmark — masked so it inherits currentColor (adapts to the background) */
  .wm {
    position: absolute;
    inset: 0;
    ${({ $variant }) => {
      const wm = CFG[$variant].wordmark;
      return wm
        ? `background-color: currentColor;
           -webkit-mask: url(${wm}) left center / contain no-repeat;
           mask: url(${wm}) left center / contain no-repeat;`
        : 'display: none;';
    }}
  }

  /* mark — inline burst overlaid at its artwork coordinates */
  .mk {
    position: absolute;
    display: block;
    ${({ $variant }) => {
      const m = CFG[$variant].mark;
      return `left: ${pct(m.left)}; top: ${pct(m.top)}; width: ${pct(m.width)}; height: ${pct(m.height)};`;
    }}
  }
`;

interface Props {
  $variant?: Variant;
  $height?: string;
  className?: string;
}

const Logo = ({ $variant = 'full', $height, className }: Props) => (
  <Wrap $variant={$variant} $height={$height} className={className}>
    <span className="wm" aria-hidden />
    <LogoMark className="mk" />
  </Wrap>
);

export default Logo;
