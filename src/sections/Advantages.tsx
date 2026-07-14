import styled from 'styled-components';
import { LuCheck } from 'react-icons/lu';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { useI18n } from '../i18n/I18nContext';

const Section = styled.section`
  background: var(--paper);
  color: var(--ink);
  padding: clamp(72px, 13vh, 170px) 0;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 7vh, 96px);
`;

const Row = styled.div<{ $flip?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 5vw, 80px);
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .media {
    order: ${({ $flip }) => ($flip ? 2 : 1)};
    @media (max-width: 860px) {
      order: -1;
    }
  }
  .body {
    order: ${({ $flip }) => ($flip ? 1 : 2)};
  }
`;

// typographic stat panel — big number on a brand gradient, corrugated-container
// texture, no photography. Dark panel for "Цена", light panel for "Белая".
const StatPanel = styled.div<{ $tone: 'dark' | 'light' }>`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 16 / 11;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(26px, 3.2vw, 48px);
  isolation: isolate;
  box-shadow:
    0 40px 80px -50px rgba(10, 12, 16, 0.45),
    inset 0 1px 0 0 rgba(255, 255, 255, ${({ $tone }) => ($tone === 'dark' ? 0.14 : 0.7)});
  border: 1px solid ${({ $tone }) => ($tone === 'light' ? 'rgba(10, 12, 16, 0.07)' : 'transparent')};
  color: ${({ $tone }) => ($tone === 'dark' ? '#fff' : 'var(--ink)')};
  background: ${({ $tone }) =>
    $tone === 'dark'
      ? 'linear-gradient(135deg, #10151c 0%, #2b3440 55%, #46566a 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #e9eef3 100%)'};

  /* background image (darkened on dark tone, faded on light) */
  .bg {
    position: absolute;
    inset: 0;
    z-index: -3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 1s var(--ease-expo);
  }
  &:hover .bg {
    transform: scale(1.05);
  }
  /* tone overlay so the big stat stays perfectly readable */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background: ${({ $tone }) =>
      $tone === 'dark'
        ? 'linear-gradient(135deg, rgba(13,18,25,0.62) 0%, rgba(24,31,40,0.58) 55%, rgba(44,54,68,0.5) 100%)'
        : 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(232,238,244,0.72) 100%)'};
  }
  /* accent glow + top sheen */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(72% 60% at 85% 8%, rgba(var(--accent-rgb), ${({ $tone }) =>
        $tone === 'dark' ? 0.32 : 0.13}), transparent 62%),
      linear-gradient(180deg, rgba(255, 255, 255, ${({ $tone }) =>
        $tone === 'dark' ? 0.06 : 0.45}) 0%, transparent 24%);
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    height: 38px;
    padding: 0 15px;
    border-radius: 999px;
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    background: ${({ $tone }) => ($tone === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(10,12,16,0.05)')};
    border: 1px solid ${({ $tone }) => ($tone === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(10,12,16,0.1)')};
    backdrop-filter: blur(8px);
  }
  .badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cargo);
  }
  .watermark {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.6rem, 6vw, 5rem);
    line-height: 1;
    letter-spacing: -0.04em;
    opacity: 0.14;
  }
  .stat {
    display: flex;
    align-items: baseline;
    gap: 0.25em;
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.88;
  }
  .stat .num {
    font-size: clamp(3.2rem, 8.5vw, 6.6rem);
  }
  .stat .unit {
    font-size: clamp(1rem, 1.8vw, 1.7rem);
    font-weight: 600;
    opacity: 0.72;
  }
  .cap {
    margin-top: 12px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.6;
  }
`;

const Body = styled.div`
  .idx {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent);
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.9rem, 3.6vw, 3rem);
    letter-spacing: -0.035em;
    line-height: 1.02;
    margin: 14px 0 18px;
  }
  .lead {
    font-size: clamp(1.02rem, 1.4vw, 1.22rem);
    line-height: 1.55;
    color: var(--muted);
    max-width: 44ch;
  }
  ul {
    list-style: none;
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    color: var(--ink);
  }
  li .ic {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
    display: grid;
    place-items: center;
    flex: none;
    font-size: 0.8rem;
  }
`;

// visual-only data (localized text lives in i18n: t.ui.advantages.cards)
const cards: Record<string, { stat: string; tone: 'dark' | 'light'; bg: string }> = {
  price: { stat: '$0.5', tone: 'dark', bg: '/adv-price.avif' },
  white: { stat: '100%', tone: 'light', bg: '/adv-white.avif' },
};

const Advantages = () => {
  const { t } = useI18n();
  const copy = t.ui.advantages;

  return (
  <Section data-nav-theme="light" id="advantages">
    <Container>
      <SectionHeader
        eyebrow={copy.eyebrow}
        index={copy.index}
        title={
          <>
            {copy.titlePre}<span className="accent">{copy.titleAccent}</span>
          </>
        }
        lead={copy.lead}
      />

      <Rows>
        {t.advantages.map((a, i) => {
          const c = cards[a.id];
          const card = copy.cards[a.id as keyof typeof copy.cards];
          const flip = i % 2 === 1;
          return (
            <Reveal key={a.id} y={36}>
              <Row $flip={flip}>
                <div className="media">
                  <StatPanel $tone={c.tone}>
                    <img className="bg" src={c.bg} alt="" aria-hidden="true" loading="lazy" />
                    <div className="top">
                      <span className="badge">
                        <span className="dot" />
                        {card.badge}
                      </span>
                      <span className="watermark">{a.index}</span>
                    </div>
                    <div>
                      <div className="stat">
                        <span className="num">{c.stat}</span>
                        <span className="unit">{card.unit}</span>
                      </div>
                      <div className="cap">{card.cap}</div>
                    </div>
                  </StatPanel>
                </div>
                <div className="body">
                  <Body>
                    <span className="idx">{a.index}</span>
                    <h3>{a.title}</h3>
                    <p className="lead">{a.body}</p>
                    <ul>
                      {a.points.map((p) => (
                        <li key={p}>
                          <span className="ic">
                            <LuCheck />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Body>
                </div>
              </Row>
            </Reveal>
          );
        })}
      </Rows>
    </Container>
  </Section>
  );
};

export default Advantages;
