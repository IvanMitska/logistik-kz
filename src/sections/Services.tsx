import styled from 'styled-components';
import { LuContainer, LuFileCheck, LuWarehouse, LuTruck, LuArrowUpRight } from 'react-icons/lu';
import type { IconType } from 'react-icons';
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
  grid-template-columns: 1.05fr 1fr;
  gap: 18px;
  align-items: stretch;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

// ── flagship feature card (photo) ───────────────────────────────────────
const Feature = styled.button`
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(28px, 3vw, 44px);
  text-align: left;
  color: #fff;
  isolation: isolate;

  /* hero-style composition: bright sky + a floating cutout container */
  .photo {
    position: absolute;
    inset: 0;
    z-index: -2;
    overflow: hidden;
  }
  .photo .sky {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo .cargo {
    position: absolute;
    top: 3%;
    left: 50%;
    width: 88%;
    height: auto;
    transform: translateX(-50%);
    /* fade the crane wire into the sky, like the hero */
    -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.5) 12%, #000 22%);
    mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.5) 12%, #000 22%);
    animation: cardFloat 7s ease-in-out infinite;
  }
  @keyframes cardFloat {
    0%, 100% { transform: translateX(-50%) translateY(0) rotate(-0.6deg); }
    50% { transform: translateX(-50%) translateY(-10px) rotate(0.6deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .photo .cargo { animation: none; }
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(180deg, rgba(7, 10, 17, 0) 0%, rgba(7, 10, 17, 0.06) 46%, rgba(7, 10, 17, 0.62) 78%, rgba(7, 10, 17, 0.9) 100%);
  }

  .head {
    position: absolute;
    top: clamp(24px, 3vw, 40px);
    left: clamp(28px, 3vw, 44px);
    right: clamp(28px, 3vw, 44px);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon {
    width: 56px;
    height: 56px;
    border-radius: 15px;
    display: grid;
    place-items: center;
    font-size: 1.6rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(10px);
  }
  .flag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(10px);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .flag .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cargo);
  }

  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.7rem, 3vw, 2.6rem);
    letter-spacing: -0.035em;
    line-height: 1.02;
    max-width: 16ch;
  }
  .desc {
    margin: 14px 0 22px;
    max-width: 42ch;
    font-size: 1.02rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.78);
  }
  .tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .tag {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 8px 14px;
    border-radius: 999px;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(6px);
  }
  .cta {
    position: absolute;
    top: clamp(24px, 3vw, 40px);
    right: clamp(28px, 3vw, 44px);
  }
`;

// ── supporting services list ────────────────────────────────────────────
const List = styled.div`
  ${glassPanel};
  display: flex;
  flex-direction: column;
  border-radius: 26px;
  overflow: hidden;
`;

const Row = styled.button`
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: clamp(16px, 2vw, 26px);
  padding: clamp(22px, 2.6vw, 34px) clamp(22px, 2.4vw, 36px);
  text-align: left;
  transition: background 0.4s var(--ease-snap);

  & + & {
    border-top: 1px solid rgba(10, 12, 16, 0.06);
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 0.45s var(--ease-expo);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.55);
  }
  &:hover::before {
    transform: scaleY(1);
  }

  .icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    flex: none;
    display: grid;
    place-items: center;
    font-size: 1.4rem;
    background: var(--accent-soft);
    color: var(--accent);
    transition: background 0.4s var(--ease-snap), color 0.4s var(--ease-snap);
  }
  &:hover .icon {
    background: var(--accent);
    color: #fff;
  }

  .mid {
    min-width: 0;
  }
  .row-top {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  h4 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.15rem, 1.7vw, 1.45rem);
    letter-spacing: -0.025em;
    color: var(--ink);
  }
  .num {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
  }
  .desc {
    margin-top: 6px;
    font-size: 0.92rem;
    line-height: 1.45;
    color: var(--muted);
    max-width: 46ch;
  }
  .meta {
    margin-top: 12px;
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
  }
  .tag {
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 5px 11px;
    border-radius: 999px;
    background: var(--bone);
    color: var(--muted);
  }

  .arrow {
    flex: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(10, 12, 16, 0.12);
    display: grid;
    place-items: center;
    color: var(--accent);
    transition: transform 0.45s var(--ease-expo), background 0.3s, color 0.3s, border-color 0.3s;
  }
  &:hover .arrow {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    transform: translate(3px, -3px);
  }

  @media (max-width: 520px) {
    grid-template-columns: auto 1fr;
    .arrow {
      display: none;
    }
  }
`;

const icons: Record<string, IconType> = {
  rail: LuContainer,
  customs: LuFileCheck,
  warehouse: LuWarehouse,
  delivery: LuTruck,
};

const Services = () => {
  const { t } = useI18n();
  const [flagship, ...rest] = t.services;
  const FlagIcon = icons[flagship.id] ?? LuContainer;

  return (
    <Section data-nav-theme="light" id="services">
      <Container>
        <SectionHeader
          eyebrow={t.ui.services.eyebrow}
          index={t.ui.services.index}
          title={
            <>
              {t.ui.services.titlePre}<span className="accent">{t.ui.services.titleAccent}</span>
            </>
          }
          lead={t.ui.services.lead}
        />

        <Reveal y={32}>
          <Layout>
            <Feature onClick={() => scrollToEl('#calculator', -10)} aria-label={flagship.title}>
              <div className="photo">
                <img className="sky" src="/sky.png" alt="" loading="lazy" />
                <img className="cargo" src="/container-2.png" alt={flagship.title} loading="lazy" />
              </div>
              <div className="head">
                <span className="icon">
                  <FlagIcon />
                </span>
                <span className="flag">
                  <span className="dot" />
                  {t.ui.services.flag}
                </span>
              </div>
              <h3>{flagship.title}</h3>
              <p className="desc">{flagship.desc}</p>
              <div className="tags">
                {flagship.meta.map((m) => (
                  <span className="tag" key={m}>
                    {m}
                  </span>
                ))}
              </div>
            </Feature>

            <List>
              {rest.map((s) => {
                const Icon = icons[s.id] ?? LuTruck;
                return (
                  <Row key={s.id} onClick={() => scrollToEl('#lead', -10)} aria-label={s.title}>
                    <span className="icon">
                      <Icon />
                    </span>
                    <div className="mid">
                      <div className="row-top">
                        <h4>{s.title}</h4>
                        <span className="num">{s.num}</span>
                      </div>
                      <div className="desc">{s.desc}</div>
                      <div className="meta">
                        {s.meta.map((m) => (
                          <span className="tag" key={m}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="arrow">
                      <LuArrowUpRight />
                    </span>
                  </Row>
                );
              })}
            </List>
          </Layout>
        </Reveal>
      </Container>
    </Section>
  );
};

export default Services;
