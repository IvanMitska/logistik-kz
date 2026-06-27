import styled from 'styled-components';
import { LuMapPin, LuArrowRight } from 'react-icons/lu';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { glassPanel, glassPanelHover } from '../components/ui/glass';
import { useI18n } from '../i18n/I18nContext';

const Section = styled.section`
  background: var(--paper);
  color: var(--ink);
  padding: clamp(72px, 13vh, 170px) 0;
`;

const Lanes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Lane = styled.div`
  ${glassPanel};
  ${glassPanelHover};
  border-radius: 20px;
  padding: clamp(24px, 3vw, 40px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: clamp(20px, 4vw, 56px);
  align-items: center;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Pair = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.5vw, 34px);

  .node {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .node .k {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .node .city {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.5rem, 3vw, 2.3rem);
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  .conn {
    flex: none;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--accent);
  }
  .conn .dash {
    width: clamp(28px, 5vw, 70px);
    height: 2px;
    background: repeating-linear-gradient(90deg, var(--accent) 0 6px, transparent 6px 12px);
  }
`;

const Cities = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 0.98rem;

  svg {
    color: var(--accent);
    flex: none;
  }
  @media (max-width: 760px) {
    border-top: 1px solid rgba(10, 12, 16, 0.07);
    padding-top: 18px;
  }
`;

const Weeks = styled.div`
  text-align: right;
  white-space: nowrap;

  .v {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .k {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 4px;
  }
  @media (max-width: 760px) {
    text-align: left;
  }
`;

const Geography = () => {
  const { t } = useI18n();
  return (
  <Section data-nav-theme="light" id="geography">
    <Container>
      <SectionHeader
        eyebrow={t.ui.geography.eyebrow}
        index={t.ui.geography.index}
        title={
          <>
            {t.ui.geography.titlePre}<span className="accent">{t.ui.geography.titleAccent}</span>
          </>
        }
        lead={t.ui.geography.lead}
      />

      <Lanes>
        {t.lanes.map((l, i) => (
          <Reveal key={l.to} delay={i * 0.08} y={26}>
            <Lane>
              <Pair>
                <div className="node">
                  <span className="k">{t.ui.geography.from}</span>
                  <span className="city">{l.from}</span>
                </div>
                <div className="conn">
                  <span className="dash" />
                  <LuArrowRight />
                </div>
                <div className="node">
                  <span className="k">{t.ui.geography.toLabel}</span>
                  <span className="city">{l.to}</span>
                </div>
              </Pair>
              <Cities>
                <LuMapPin size={18} />
                {l.cities}
              </Cities>
              <Weeks>
                <div className="v">{l.weeks}</div>
                <div className="k">{t.ui.geography.term}</div>
              </Weeks>
            </Lane>
          </Reveal>
        ))}
      </Lanes>
    </Container>
  </Section>
  );
};

export default Geography;
