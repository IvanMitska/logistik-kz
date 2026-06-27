import styled from 'styled-components';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import SplitWords from '../components/ui/SplitWords';
import Reveal from '../components/ui/Reveal';
import { useI18n } from '../i18n/I18nContext';

const Section = styled.section`
  background: var(--paper);
  color: var(--ink);
  padding: clamp(80px, 16vh, 200px) 0;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: clamp(40px, 8vh, 90px);
  flex-wrap: wrap;

  .idx {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--muted);
    letter-spacing: 0.04em;
  }
`;

const Statement = styled.div`
  h2 {
    font-family: var(--font-display);
    font-weight: 600;
    /* Sensible editorial scale — large but not poster-sized, so the
       sentence reads as a headline rather than one word per line. */
    font-size: clamp(2rem, 4.6vw, 4rem);
    letter-spacing: -0.035em;
    line-height: 1.06;
    color: var(--ink);
    /* ch is relative to THIS element's font-size (the heading), so the
       line measure scales with the type — ~3 balanced lines. */
    max-width: 17ch;
  }
`;

const Tail = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(32px, 6vw, 90px);
  margin-top: clamp(48px, 9vh, 110px);
  align-items: start;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  p {
    font-size: clamp(1.05rem, 1.5vw, 1.35rem);
    line-height: 1.55;
    color: var(--ink);
  }
  .muted {
    color: var(--muted);
  }
`;

const Manifesto = () => {
  const { t } = useI18n();
  return (
  <Section data-nav-theme="light">
    <Container>
      <Head>
        <Eyebrow>{t.ui.manifesto.eyebrow}</Eyebrow>
        <span className="idx">{t.ui.manifesto.idx}</span>
      </Head>

      <Statement>
        <SplitWords
          as="h2"
          text={t.ui.manifesto.statement}
          stagger={0.05}
        />
      </Statement>

      <Tail>
        <Reveal>
          <p dangerouslySetInnerHTML={{ __html: t.ui.manifesto.p1Html }} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="muted">{t.ui.manifesto.p2}</p>
        </Reveal>
      </Tail>
    </Container>
  </Section>
  );
};

export default Manifesto;
