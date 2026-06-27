import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiPlay } from 'react-icons/fi';
import { glass, glassLight } from '../components/ui/glass';
import { useI18n } from '../i18n/I18nContext';
import { scrollToEl } from '../lib/lenis';

/**
 * Hero — "Horizon Cargo" style, composed from layered images:
 *   sky photo (bg) → giant HTML wordmark → stacked containers (foreground) →
 *   the suspended container (centre, gentle CSS sway) → UI (card, pill, proof).
 * All container art is pre-rendered PNG with alpha — no runtime 3D.
 */

const SKY = '/sky.png';
const CONTAINER = '/container-2.png';
const STACK = '/stack.png';

const Shell = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100lvh;
  width: 100%;
  overflow: hidden;
  display: flex;
  background:
    linear-gradient(180deg, rgba(20, 40, 66, 0.28) 0%, rgba(20, 40, 66, 0) 22%),
    url(${SKY}) center / cover no-repeat,
    #5aa6df;
`;

// giant wordmark behind the suspended container
const Wordmark = styled.div`
  position: absolute;
  z-index: 1;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.6rem, 17.5vw, 16rem);
  line-height: 0.8;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  text-shadow: 0 12px 60px rgba(20, 40, 66, 0.18);

  /* mobile: lift the word up under the container so the sky gap closes */
  @media (max-width: 760px) {
    top: 38%;
    font-size: clamp(3.4rem, 21vw, 8rem);
  }
`;

// suspended container — sits ON TOP of the wordmark (overlaps only the upper
// edge of the letters) so the whole word stays readable, like it's being
// lowered onto the word. Gentle pendulum sway; wire fades into the sky.
const Hanging = styled.img`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: clamp(8px, 2vh, 40px);
  width: min(660px, 46vw);
  height: auto;
  transform-origin: 50% -10%;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.5) 12%, #000 22%);
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.5) 12%, #000 22%);
  animation: heroSway 7s ease-in-out infinite;

  @keyframes heroSway {
    0%, 100% { transform: translateX(-50%) rotate(-0.6deg); }
    50% { transform: translateX(-50%) rotate(0.6deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateX(-50%);
  }

  /* mobile: bigger and a touch lower so it anchors the top, less dead sky */
  @media (max-width: 760px) {
    width: min(660px, 72vw);
    top: clamp(40px, 7vh, 90px);
  }
`;

// foreground stack along the bottom-left
const Stack = styled.img`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 0;
  width: min(1020px, 72%);
  height: auto;
  pointer-events: none;
  user-select: none;
`;

// mirrored copy filling the bottom-right so the yard spans the full width
const StackRight = styled.img`
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  width: min(880px, 62%);
  height: auto;
  transform: scaleX(-1);
  pointer-events: none;
  user-select: none;

  @media (max-width: 760px) {
    display: none;
  }
`;

const Fg = styled.div`
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 56px);
  align-self: stretch;
`;

const Card = styled(motion.div)`
  ${glassLight};
  position: absolute;
  left: clamp(20px, 4vw, 56px);
  bottom: clamp(28px, 6vh, 64px);
  width: min(440px, 80vw);
  padding: clamp(24px, 2.4vw, 34px);
  border-radius: 24px;

  h1 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.7rem, 2.8vw, 2.6rem);
    line-height: 1.04;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin-top: 14px;
    font-size: 0.98rem;
    line-height: 1.5;
    color: var(--muted);
  }
  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;

const Cta = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
  height: 52px;
  padding: 0 8px 0 24px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: transform 0.4s var(--ease-expo), background 0.4s;

  .ic {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--grad);
    font-size: 1rem;
  }
  &:hover {
    transform: translateY(-2px);
    background: #000;
  }
`;

const Discover = styled(motion.button)`
  position: absolute;
  right: clamp(20px, 4vw, 56px);
  top: 58%;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #fff;
  text-align: left;
  text-shadow: 0 2px 20px rgba(15, 30, 50, 0.45);

  .play {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    ${glass};
    color: #fff;
    font-size: 1.1rem;
  }
  .t b {
    display: block;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
  }
  .t span {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const Vertical = styled.div`
  position: absolute;
  left: clamp(14px, 2vw, 28px);
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
  text-shadow: 0 2px 16px rgba(15, 30, 50, 0.45);

  @media (max-width: 760px) {
    display: none;
  }
`;

const Hero = () => {
  const reduced = !!useReducedMotion();
  const { t } = useI18n();
  const h = t.ui.hero;

  return (
    <Shell data-nav-theme="dark" id="top">
      <Wordmark>{h.wordmark}</Wordmark>
      <Hanging src={CONTAINER} alt={h.wordmark} />
      <Stack src={STACK} alt="" aria-hidden="true" />
      <StackRight src={STACK} alt="" aria-hidden="true" />

      <Fg>
        <Vertical>{h.vertical}</Vertical>

        <Discover
          onClick={() => scrollToEl('#process', -10)}
          initial={reduced ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label={h.discoverTitle}
        >
          <span className="play">
            <FiPlay />
          </span>
          <span className="t">
            <b>{h.discoverTitle}</b>
            <span>{h.discoverSub}</span>
          </span>
        </Discover>

        <Card
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>
            {h.titleLines[0]}
            <br />
            {h.titleLines[1]}
          </h1>
          <p dangerouslySetInnerHTML={{ __html: h.bodyHtml }} />
          <Cta onClick={() => scrollToEl('#lead', -10)}>
            {h.cta}
            <span className="ic">
              <FiArrowUpRight />
            </span>
          </Cta>
        </Card>

      </Fg>
    </Shell>
  );
};

export default Hero;
