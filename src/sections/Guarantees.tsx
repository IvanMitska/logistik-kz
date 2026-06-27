import styled from 'styled-components';
import { LuShieldCheck, LuFileText, LuBadgeDollarSign, LuUserCheck } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { useI18n } from '../i18n/I18nContext';

const Section = styled.section`
  background: var(--ink);
  color: #fff;
  padding: clamp(72px, 13vh, 170px) 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid var(--ink-line);
  border-radius: 18px;
  padding: clamp(24px, 2.4vw, 34px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0));
  display: flex;
  flex-direction: column;
  min-height: 240px;
  transition: border-color 0.4s var(--ease-snap), transform 0.5s var(--ease-expo);

  &:hover {
    border-color: rgba(var(--accent-rgb), 0.5);
    transform: translateY(-4px);
  }

  .ic {
    width: 50px;
    height: 50px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    background: rgba(var(--accent-rgb), 0.14);
    color: var(--accent-bright);
    font-size: 1.4rem;
    margin-bottom: auto;
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: -0.02em;
    margin: 26px 0 10px;
  }
  p {
    font-size: 0.92rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.66);
  }
`;

const icons: IconType[] = [LuShieldCheck, LuFileText, LuBadgeDollarSign, LuUserCheck];

const Guarantees = () => {
  const { t } = useI18n();

  return (
    <Section data-nav-theme="dark" data-surface="dark" id="guarantees">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow={t.ui.guarantees.eyebrow}
          index={t.ui.guarantees.index}
          title={
            <>
              {t.ui.guarantees.titlePre}<span className="accent">{t.ui.guarantees.titleAccent}</span>
            </>
          }
          lead={t.ui.guarantees.lead}
        />

        <Grid>
          {t.guarantees.map((g, i) => {
            const Icon = icons[i] ?? LuShieldCheck;
            return (
              <Reveal key={g.title} delay={i * 0.06} y={26}>
                <Card>
                  <span className="ic">
                    <Icon />
                  </span>
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                </Card>
              </Reveal>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default Guarantees;
