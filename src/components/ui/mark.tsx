/**
 * Brand mark — the radiant burst, no tile.
 *
 * Rendered inline so the rays inherit `currentColor` (white on dark, ink on
 * light) and adapt to whatever surface they sit on, while the single amber ray
 * stays the brand orange. Geometry is straight from logo-mark.svg (viewBox
 * 0 0 740 740). The tiled (blue-square) version still lives in
 * /public/logo-mark.svg and is used only for the favicon.
 */
export const MARK_VIEWBOX = '0 0 740 740';
export const MARK_SIZE = 739.859;
export const AMBER = '#FF8000';

export interface Ray {
  x: number;
  y: number;
  w: number;
  h: number;
  t?: string;
  amber?: boolean;
}

export const RAYS: Ray[] = [
  { x: 409.465, y: 358.635, w: 234.383, h: 19.7672, amber: true },
  { x: 110.133, y: 358.635, w: 234.383, h: 19.7672 },
  { x: 369.93, y: 336.044, w: 234.383, h: 16.9433, t: 'rotate(-90 369.93 336.044)' },
  { x: 369.93, y: 635.378, w: 234.383, h: 16.9433, t: 'rotate(-90 369.93 635.378)' },
  { x: 359.977, y: 397.576, w: 34.9497, h: 17.0083, t: 'rotate(135 359.977 397.576)' },
  { x: 292.242, y: 465.306, w: 139.493, h: 17.0083, t: 'rotate(135 292.242 465.306)' },
  { x: 394.055, y: 339.449, w: 37.4262, h: 17.0083, t: 'rotate(-45 394.055 339.449)' },
  { x: 464.355, y: 269.146, w: 135.857, h: 17.0083, t: 'rotate(-45 464.355 269.146)' },
  { x: 406.082, y: 385.545, w: 36.071, h: 17.0083, t: 'rotate(45 406.082 385.545)' },
  { x: 477.828, y: 457.308, w: 133.807, h: 17.0083, t: 'rotate(45 477.828 457.308)' },
  { x: 347.941, y: 351.473, w: 33.9318, h: 17.0083, t: 'rotate(-135 347.941 351.473)' },
  { x: 281.887, y: 285.408, w: 141.859, h: 17.0083, t: 'rotate(-135 281.887 285.408)' },
];

const LogoMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox={MARK_VIEWBOX} fill="none" aria-hidden="true">
    {RAYS.map((r, i) => (
      <rect
        key={i}
        x={r.x}
        y={r.y}
        width={r.w}
        height={r.h}
        transform={r.t}
        fill={r.amber ? AMBER : 'currentColor'}
      />
    ))}
  </svg>
);

export default LogoMark;
