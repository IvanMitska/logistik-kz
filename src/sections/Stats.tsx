import styled from 'styled-components';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import Marquee from '../components/ui/Marquee';
import { useI18n } from '../i18n/I18nContext';

const Band = styled.section`
  background: var(--paper);
  color: var(--ink);
  padding: clamp(36px, 7vh, 80px) 0 0;
  position: relative;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Cell = styled.div`
  padding: clamp(20px, 3vh, 36px) clamp(8px, 2vw, 32px) clamp(20px, 3vh, 36px) 0;
  border-left: 1px solid var(--bone-line);
  padding-left: clamp(18px, 2vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:first-child {
    border-left: none;
    padding-left: 0;
  }

  @media (max-width: 860px) {
    &:nth-child(odd) {
      border-left: none;
      padding-left: 0;
    }
    &:nth-child(3),
    &:nth-child(4) {
      border-top: 1px solid var(--bone-line);
      padding-top: clamp(20px, 3vh, 32px);
    }
  }

  .num {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(2.4rem, 4.6vw, 4rem);
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--ink);
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .unit {
    font-size: 0.34em;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0;
  }
  .label {
    font-size: 0.64rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--muted);
    margin-top: 12px;
  }
  .note {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.4;
    opacity: 0.85;
  }
`;

const Strip = styled.div`
  margin-top: clamp(40px, 7vh, 80px);
  border-top: 1px solid var(--bone-line);
  border-bottom: 1px solid var(--bone-line);
  padding: 16px 0;
  overflow: hidden;
`;

const MarqueeItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 0 22px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1rem, 1.8vw, 1.5rem);
  letter-spacing: -0.01em;
  color: var(--muted);
  white-space: nowrap;

  &::after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cargo);
    flex: none;
  }
`;

const Stats = () => {
  const { t } = useI18n();
  return (
  <Band data-nav-theme="light" id="stats">
    <Container>
      <Reveal>
        <Row>
          {t.stats.map((s) => (
            <Cell key={s.label}>
              <span className="num">
                {s.value}
                <span className="unit">{s.unit}</span>
              </span>
              <span className="label">{s.label}</span>
              <span className="note">{s.note}</span>
            </Cell>
          ))}
        </Row>
      </Reveal>
    </Container>

    <Strip>
      <Marquee duration={36}>
        {t.routes.map((r) => (
          <MarqueeItem key={r}>{r}</MarqueeItem>
        ))}
      </Marquee>
    </Strip>
  </Band>
  );
};

export default Stats;
