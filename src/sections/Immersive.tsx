import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { glass } from '../components/ui/glass';
import { VIEW, COUNTRIES, CITIES, ROUTE_D } from '../data/routeMap';

/**
 * Immersive — cinematic geographic route map. Real country silhouettes (Natural
 * Earth) on a dark globe-ish ground; as the pinned section scrolls, a glowing
 * route draws across Eurasia, a cargo marker travels it, the camera flies +
 * zooms to follow the marker (Иу → Москва), cities ignite as they're reached
 * and a live HUD counts up km / stage / days.
 *
 * Reduced-motion: whole map fit to frame, route drawn, all cities lit, static.
 */

const CITY_META = [
  { city: 'Китай', country: 'Иу · старт' },
  { city: 'Хоргос', country: 'Граница КНР / КЗ' },
  { city: 'Алматы', country: 'Казахстан' },
  { city: 'Астана', country: 'Казахстан' },
  { city: 'Москва', country: 'Россия' },
];
const TOTAL_KM = 5800;
const TOTAL_DAYS = 22;
const SCALE = 2.15; // camera zoom

const Track = styled.section`
  position: relative;
  height: 520vh; /* taller = slower, more controllable camera fly */
  background: #04070a;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 50% 50%, rgba(var(--accent-rgb), 0.16), transparent 60%),
    #04070a;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Head = styled.div`
  position: absolute;
  z-index: 3;
  top: clamp(90px, 13vh, 134px);
  left: clamp(20px, 5vw, 72px);
  right: clamp(20px, 5vw, 72px);
  color: #fff;
  pointer-events: none;

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-grotesk);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
  }
  .eyebrow .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cargo-bright);
    box-shadow: 0 0 0 4px rgba(var(--cargo-rgb), 0.22);
  }
  h2 {
    margin-top: 14px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.6rem, 3.4vw, 2.8rem);
    letter-spacing: -0.035em;
    line-height: 1.05;
    max-width: 16ch;
    text-shadow: 0 2px 30px rgba(0, 0, 0, 0.7);
  }
`;

const Hud = styled.div`
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: clamp(36px, 7vh, 80px);
  transform: translateX(-50%);
  display: flex;
  gap: clamp(10px, 1.4vw, 18px);
  flex-wrap: wrap;
  justify-content: center;
`;

const Cell = styled.div`
  ${glass};
  min-width: 150px;
  padding: 13px 20px;
  border-radius: 16px;
  color: #fff;
  text-align: left;

  .v {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.45rem;
    letter-spacing: -0.03em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .l {
    margin-top: 7px;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
`;

// faint route with dashes flowing toward the destination (sense of movement)
const FlowLine = styled.path`
  stroke-dasharray: 3 11;
  animation: dashFlow 0.9s linear infinite;
  @keyframes dashFlow {
    to {
      stroke-dashoffset: -28;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const City = ({
  c,
  meta,
  at,
  draw,
  reduced,
}: {
  c: (typeof CITIES)[number];
  meta: { city: string; country: string };
  at: number;
  draw: MotionValue<number>;
  reduced: boolean;
}) => {
  const lit = useTransform(draw, [at - 0.04, at], [0, 1]);
  const ring = useTransform(lit, [0, 1], [0.4, 1.6]);
  const a = reduced ? 1 : lit;
  return (
    <g>
      <motion.circle cx={c.x} cy={c.y} r={22} fill="rgba(86,224,220,0.10)" style={{ scale: reduced ? 1.3 : ring, opacity: a, transformOrigin: `${c.x}px ${c.y}px` } as never} />
      <circle cx={c.x} cy={c.y} r={6} fill="#04070a" stroke="var(--cargo-bright)" strokeWidth={2.5} />
      <motion.circle cx={c.x} cy={c.y} r={2.6} fill="var(--cargo-bright)" style={{ opacity: a }} />
      <motion.text x={c.x} y={c.y - 18} textAnchor="middle" style={{ opacity: a }} fill="#fff" fontFamily="var(--font-display)" fontWeight={600} fontSize={22} letterSpacing="-0.02em">
        {meta.city}
      </motion.text>
      <motion.text x={c.x} y={c.y + 30} textAnchor="middle" style={{ opacity: a }} fill="rgba(255,255,255,0.55)" fontFamily="var(--font-grotesk)" fontSize={12} letterSpacing="0.08em">
        {meta.country}
      </motion.text>
    </g>
  );
};

const Immersive = () => {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const draw = useTransform(scrollYProgress, [0.05, 0.92], [0, 1]);

  // marker position + svg ref (the viewBox IS the camera)
  const mx = useMotionValue(CITIES[0].x);
  const my = useMotionValue(CITIES[0].y);
  const svgRef = useRef<SVGSVGElement>(null);
  const [ats, setAts] = useState<number[]>(CITIES.map((_, i) => i / (CITIES.length - 1)));

  // measure path: total length + each city's length-fraction (for accurate lighting)
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const N = 600;
    const samples: { x: number; y: number; t: number }[] = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const p = path.getPointAtLength(t * len);
      samples.push({ x: p.x, y: p.y, t });
    }
    setAts(
      CITIES.map((c) => {
        let best = 0, bd = Infinity;
        for (const s of samples) {
          const d = (s.x - c.x) ** 2 + (s.y - c.y) ** 2;
          if (d < bd) { bd = d; best = s.t; }
        }
        return best;
      }),
    );

    // camera = viewBox window (zoomed), centred on the marker, marker a bit
    // ABOVE centre (44%) so it never hides behind the bottom HUD.
    const WW = VIEW.w / SCALE;
    const WH = VIEW.h / SCALE;
    const apply = (t: number) => {
      const p = path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
      mx.set(p.x);
      my.set(p.y);
      svgRef.current?.setAttribute('viewBox', `${p.x - WW / 2} ${p.y - WH * 0.44} ${WW} ${WH}`);
    };
    if (reduced) {
      svgRef.current?.setAttribute('viewBox', `0 0 ${VIEW.w} ${VIEW.h}`);
      return;
    }
    apply(draw.get());
    const un = draw.on('change', apply);
    return () => un();
  }, [draw, mx, my, reduced]);

  const [tele, setTele] = useState(
    reduced
      ? { km: TOTAL_KM, stage: CITIES.length, days: TOTAL_DAYS, leg: 'Астана → Москва' }
      : { km: 0, stage: 1, days: 0, leg: 'Иу → Хоргос' },
  );
  useMotionValueEvent(draw, 'change', (p) => {
    if (reduced) return;
    const km = Math.max(0, Math.round((Math.max(0, p) * TOTAL_KM) / 25) * 25);
    const days = Math.max(0, Math.round(Math.max(0, p) * TOTAL_DAYS));
    const reached = ats.filter((a) => p >= a - 1e-3).length;
    const stage = Math.min(CITIES.length, Math.max(1, reached));
    const seg = Math.min(CITIES.length - 2, Math.max(0, stage - 1));
    const leg = `${CITY_META[seg].city} → ${CITY_META[seg + 1].city}`;
    setTele((prev) => (prev.km === km && prev.stage === stage && prev.days === days && prev.leg === leg ? prev : { km, stage, days, leg }));
  });

  const markerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.93, 1], [0, 1, 1, 0]);

  return (
    <Track ref={ref} data-nav-theme="dark" id="immersive">
      <Sticky>
        <svg ref={svgRef} viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Маршрут Китай — Казахстан — Россия">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-bright)" />
              <stop offset="100%" stopColor="var(--cargo-bright)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g>
            {/* context countries (faint) + main three (brighter) */}
            {COUNTRIES.map((c) => (
              <path
                key={c.name}
                d={c.d}
                fill={c.main ? 'rgba(86,224,220,0.05)' : 'rgba(255,255,255,0.015)'}
                stroke={c.main ? 'rgba(86,224,220,0.35)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={c.main ? 1.2 : 0.8}
                strokeLinejoin="round"
              />
            ))}

            {/* route: faint full (dashes flowing) + animated draw */}
            <FlowLine d={ROUTE_D} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={2} strokeLinecap="round" />
            <motion.path
              ref={pathRef}
              d={ROUTE_D}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth={3.5}
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ pathLength: reduced ? 1 : draw }}
            />

            {CITIES.map((c, i) => (
              <City key={c.city} c={c} meta={CITY_META[i]} at={ats[i]} draw={draw} reduced={reduced} />
            ))}

            {/* travelling cargo marker — a little truck with a pulsing halo */}
            <motion.g style={{ x: mx, y: my, opacity: reduced ? 1 : markerOpacity } as never}>
              <motion.circle
                r={16}
                fill="rgba(86,224,220,0.18)"
                animate={reduced ? undefined : { scale: [1, 1.9, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                style={{ transformOrigin: '0px 0px' } as never}
              />
              {/* clean Lucide-style truck, mirrored to face left (destination) */}
              <g transform="scale(-1.3 1.3)" filter="url(#glow)">
                <g
                  transform="translate(-12 -11)"
                  fill="none"
                  stroke="var(--cargo-bright)"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </g>
              </g>
            </motion.g>
          </g>
        </svg>

        <Head>
          <span className="eyebrow">
            <span className="dot" />
            Маршрут в движении
          </span>
          <h2>От склада в&nbsp;Китае до вашего адреса</h2>
        </Head>

        <Hud>
          <Cell>
            <div className="v">{tele.km.toLocaleString('ru-RU')}</div>
            <div className="l">км пройдено</div>
          </Cell>
          <Cell>
            <div className="v">{tele.stage} / {CITIES.length}</div>
            <div className="l">{tele.leg}</div>
          </Cell>
          <Cell>
            <div className="v">~{tele.days}</div>
            <div className="l">дней в пути</div>
          </Cell>
        </Hud>
      </Sticky>
    </Track>
  );
};

export default Immersive;
