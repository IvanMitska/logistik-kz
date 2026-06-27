import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { MARK_VIEWBOX, RAYS, AMBER } from './ui/mark';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Preloader — the brand mark spins up and coasts to a stop like a wheel. The
 * bare radiant burst (no tile, one ray in the brand amber) turns several times
 * and decelerates to rest as the load completes. Centred on a black ground
 * with a % counter and a thin progress line beneath.
 */
const SPINS = 3; // full turns before the wheel settles

const Shell = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: var(--black);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(22px, 4vh, 40px);
  padding: clamp(28px, 6vw, 72px);
  overflow: hidden;
`;

const Mark = styled(motion.svg)`
  width: clamp(180px, 28vw, 340px);
  height: auto;
  overflow: visible;
  transform-origin: 50% 50%;
  filter: drop-shadow(0 24px 60px rgba(var(--accent-rgb), 0.35));
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(14px, 2.4vh, 22px);
  width: min(280px, 60vw);
`;

const Counter = styled.div`
  font-family: var(--font-mono);
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.6);
  font-variant-numeric: tabular-nums;
`;

const Bar = styled.div`
  height: 2px;
  width: 100%;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  overflow: hidden;
  .fill {
    height: 100%;
    background: var(--grad);
    transform-origin: left;
  }
`;

const Sub = styled.div`
  font-family: var(--font-grotesk);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted-dark);
`;

interface Props {
  onDone: () => void;
}

const Preloader = ({ onDone }: Props) => {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const skip =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('skipintro');
    if (reduced || skip) {
      setPct(100);
      const t = setTimeout(() => {
        setGone(true);
        onDone();
      }, 200);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setGone(true);
          onDone();
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {!gone && (
        <Shell exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          {/* the bare burst spins up and coasts to rest like a wheel */}
          <Mark
            viewBox={MARK_VIEWBOX}
            role="img"
            aria-label="logistics.kaz"
            initial={reduced ? false : { opacity: 0, scale: 0.85, rotate: -SPINS * 360 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              rotate: { duration: 1.9, ease: EASE },
              scale: { duration: 0.9, ease: EASE },
              opacity: { duration: 0.5 },
            }}
          >
            {RAYS.map((r, i) => (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                transform={r.t}
                fill={r.amber ? AMBER : '#ffffff'}
              />
            ))}
          </Mark>

          <Meta>
            <Counter>{String(pct).padStart(3, '0')}%</Counter>
            <Bar>
              <motion.div
                className="fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: pct / 100 }}
                transition={{ ease: 'linear' }}
              />
            </Bar>
            <Sub>{t.ui.preloader.sub}</Sub>
          </Meta>
        </Shell>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
