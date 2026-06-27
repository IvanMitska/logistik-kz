import { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Eyebrow from '../components/ui/Eyebrow';
import { glassPanel } from '../components/ui/glass';
import { useI18n } from '../i18n/I18nContext';

/**
 * Process — horizontal pinned scroll on a light ground. A tall section pins
 * a viewport and slides a row of step cards sideways as you scroll, so the
 * five stages read like a moving line. Vertical-stack fallback for
 * reduced-motion / touch.
 */

const Section = styled.section`
  background: var(--bone-dim);
  color: var(--ink);
  position: relative;
`;

const Track = styled.div`
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  position: absolute;
  top: clamp(96px, 13vh, 140px);
  left: clamp(20px, 5vw, 80px);
  right: clamp(20px, 5vw, 80px);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  z-index: 3;

  h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.8rem, 4vw, 3.2rem);
    letter-spacing: -0.04em;
    margin-top: 14px;
  }
  .count {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--muted);
  }
`;

const ProgressLine = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: clamp(60px, 10vh, 110px);
  height: 2px;
  background: var(--accent);
  z-index: 3;
`;

const Row = styled(motion.div)`
  display: flex;
  gap: clamp(20px, 2.4vw, 40px);
  padding: 0 clamp(20px, 5vw, 80px);
  width: max-content;
  align-items: stretch;
`;

const Card = styled.div`
  ${glassPanel};
  position: relative;
  flex: 0 0 auto;
  width: clamp(280px, 40vw, 440px);
  border-radius: 20px;
  padding: clamp(28px, 3vw, 44px);
  display: flex;
  flex-direction: column;

  .num {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(3.4rem, 7vw, 5.6rem);
    letter-spacing: -0.05em;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--accent);
    margin-bottom: auto;
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.35rem, 2.4vw, 1.9rem);
    letter-spacing: -0.03em;
    margin: clamp(30px, 6vh, 56px) 0 12px;
  }
  p {
    font-size: 0.98rem;
    line-height: 1.55;
    color: var(--muted);
    max-width: 36ch;
  }
  .dot {
    position: absolute;
    top: clamp(28px, 3vw, 44px);
    right: clamp(28px, 3vw, 44px);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--cargo);
  }
`;

const Stack = styled.div`
  display: grid;
  gap: 16px;
  padding: clamp(40px, 8vh, 80px) clamp(20px, 5vw, 80px) clamp(60px, 10vh, 120px);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const StackHead = styled.div`
  padding: clamp(60px, 10vh, 110px) clamp(20px, 5vw, 80px) 0;
  h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(2rem, 5vw, 3.4rem);
    letter-spacing: -0.04em;
    margin-top: 18px;
  }
`;

const Process = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref });

  // distance to slide so the last card's edge lands exactly at the viewport
  // edge — no empty over-scroll tail.
  useLayoutEffect(() => {
    if (reduced) return;
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      setDist(Math.max(0, row.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduced]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (reduced) {
    return (
      <Section data-nav-theme="light" id="process">
        <StackHead>
          <Eyebrow>{t.ui.process.eyebrow}</Eyebrow>
          <h2>{t.ui.process.titleStacked}</h2>
        </StackHead>
        <Stack>
          {t.process.map((s) => (
            <Card as="div" key={s.num}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Card>
          ))}
        </Stack>
      </Section>
    );
  }

  return (
    <Section data-nav-theme="light" id="process">
      <Track ref={ref} style={{ height: `calc(100vh + ${dist}px)` }}>
        <Sticky>
          <Header>
            <div>
              <Eyebrow>{t.ui.process.eyebrow}</Eyebrow>
              <h2>{t.ui.process.title}</h2>
            </div>
            <span className="count">{t.ui.process.count}</span>
          </Header>

          <Row ref={rowRef} style={{ x }}>
            {t.process.map((s) => (
              <Card key={s.num}>
                <span className="dot" />
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Card>
            ))}
          </Row>

          <ProgressLine style={{ width: lineW }} />
        </Sticky>
      </Track>
    </Section>
  );
};

export default Process;
