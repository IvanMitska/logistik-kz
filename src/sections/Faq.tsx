import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { LuPlus } from 'react-icons/lu';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { glassPanel } from '../components/ui/glass';
import { useI18n } from '../i18n/I18nContext';
import { scrollToEl } from '../lib/lenis';

const Section = styled.section`
  background: var(--paper);
  color: var(--ink);
  padding: clamp(72px, 13vh, 170px) 0;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const Aside = styled.div`
  position: sticky;
  top: 120px;

  @media (max-width: 900px) {
    position: static;
  }

  .ask {
    ${glassPanel};
    margin-top: 24px;
    padding: 26px;
    border-radius: 18px;
  }
  .ask p {
    color: var(--muted);
    font-size: 0.96rem;
    line-height: 1.5;
    margin-bottom: 18px;
  }
  .ask button {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    height: 50px;
    padding: 0 24px;
    border-radius: 999px;
    background: var(--grad);
    color: #fff;
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    box-shadow: 0 12px 30px -16px rgba(var(--accent-rgb), 0.7);
    transition: filter 0.3s var(--ease-snap);
  }
  .ask button:hover {
    filter: brightness(1.06);
  }
`;

const List = styled.div`
  border-top: 1px solid rgba(10, 12, 16, 0.1);
`;

const Item = styled.div`
  border-bottom: 1px solid rgba(10, 12, 16, 0.1);
`;

const Q = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-align: left;
  padding: clamp(20px, 3vh, 30px) 4px;

  .qt {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.1rem, 1.8vw, 1.45rem);
    letter-spacing: -0.02em;
    color: var(--ink);
    transition: color 0.3s;
  }
  &:hover .qt {
    color: var(--accent);
  }
  .ic {
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(10, 12, 16, 0.12);
    display: grid;
    place-items: center;
    color: var(--accent);
    transition: transform 0.4s var(--ease-expo), background 0.3s, color 0.3s;
    transform: rotate(${({ $open }) => ($open ? '135deg' : '0deg')});
    background: ${({ $open }) => ($open ? 'var(--accent)' : 'transparent')};
    color: ${({ $open }) => ($open ? '#fff' : 'var(--accent)')};
  }
`;

const A = styled(motion.div)`
  overflow: hidden;

  p {
    padding: 0 4px clamp(22px, 3vh, 30px);
    max-width: 64ch;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--muted);
  }
`;

const Faq = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section data-nav-theme="light" id="faq">
      <Container>
        <Layout>
          <Aside>
            <SectionHeader
              eyebrow={t.ui.faq.eyebrow}
              title={
                <>
                  {t.ui.faq.titlePre}<span className="accent">{t.ui.faq.titleAccent}</span>
                </>
              }
            />
            <div className="ask">
              <p>{t.ui.faq.askText}</p>
              <button onClick={() => scrollToEl('#lead', -10)}>{t.ui.faq.askBtn}</button>
            </div>
          </Aside>

          <Reveal>
            <List>
              {t.faq.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Item key={item.q}>
                    <Q $open={isOpen} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                      <span className="qt">{item.q}</span>
                      <span className="ic">
                        <LuPlus />
                      </span>
                    </Q>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <A
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p>{item.a}</p>
                        </A>
                      )}
                    </AnimatePresence>
                  </Item>
                );
              })}
            </List>
          </Reveal>
        </Layout>
      </Container>
    </Section>
  );
};

export default Faq;
