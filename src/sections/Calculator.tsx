import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LuCalculator, LuArrowRight, LuInfo } from 'react-icons/lu';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { glassPanel } from '../components/ui/glass';
import { MIN_WEIGHT_KG, PRICE_SPREAD } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { setQuote } from '../lib/quote';
import { scrollToEl } from '../lib/lenis';

const Section = styled.section`
  background: var(--paper);
  color: var(--ink);
  padding: clamp(72px, 13vh, 170px) 0;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  ${glassPanel};
  border-radius: 24px;
  padding: clamp(22px, 3vw, 44px);
  min-width: 0;
`;

const Field = styled.div`
  & + & {
    margin-top: clamp(24px, 4vh, 36px);
  }
  .flabel {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }
  .flabel .hint {
    letter-spacing: 0;
    text-transform: none;
    font-weight: 500;
    color: var(--muted);
    opacity: 0.8;
  }
`;

const WeightRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  input[type='number'] {
    flex: 1;
    min-width: 0;
    height: 56px;
    border: 1px solid rgba(10, 12, 16, 0.08);
    border-radius: 12px;
    padding: 0 18px;
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
    background: var(--bone);
    transition: border-color 0.3s, background 0.3s;
  }
  input[type='number']:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--white);
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Unit = styled.div`
  display: inline-flex;
  background: var(--bone);
  border: 1px solid rgba(10, 12, 16, 0.08);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;

  button {
    height: 46px;
    padding: 0 16px;
    border-radius: 9px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted);
    transition: all 0.25s var(--ease-snap);
  }
  button.on {
    background: var(--ink);
    color: #fff;
  }
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  margin-top: 18px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--accent) 0%,
    var(--accent) var(--pct, 30%),
    var(--bone-line) var(--pct, 30%),
    var(--bone-line) 100%
  );
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--white);
    border: 2px solid var(--accent);
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.4);
  }
  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--white);
    border: 2px solid var(--accent);
  }
`;

const Pills = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Pill = styled.button<{ $on: boolean }>`
  text-align: left;
  min-width: 0;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid ${({ $on }) => ($on ? 'var(--accent)' : 'rgba(10, 12, 16, 0.08)')};
  background: ${({ $on }) => ($on ? 'var(--accent-soft)' : 'rgba(255, 255, 255, 0.55)')};
  box-shadow: ${({ $on }) => ($on ? 'none' : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.8)')};
  transition: all 0.3s var(--ease-snap);

  .h {
    overflow-wrap: anywhere;
  }
  .t {
    font-weight: 600;
    font-size: 0.98rem;
    color: var(--ink);
    margin-bottom: 3px;
  }
  .h {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.35;
  }
  .r {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: ${({ $on }) => ($on ? 'var(--accent)' : 'var(--muted)')};
    margin-top: 6px;
  }
`;

const RouteRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

// ── result (dark focal card) ────────────────────────────────────────────
const Result = styled.div`
  background: var(--ink);
  color: #fff;
  border-radius: 24px;
  padding: clamp(28px, 3vw, 44px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -20%;
    width: 60%;
    height: 70%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--accent-rgb), 0.32), transparent 65%);
    pointer-events: none;
  }

  .rlabel {
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted-dark);
  }
  .price {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2.2rem, 4vw, 3.4rem);
    letter-spacing: -0.04em;
    line-height: 1.02;
    margin: 14px 0 6px;
  }
  .per {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.66);
  }
  .meta {
    display: flex;
    gap: 28px;
    margin: 26px 0;
    padding: 22px 0;
    border-top: 1px solid var(--ink-line);
    border-bottom: 1px solid var(--ink-line);
  }
  .meta .k {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted-dark);
    margin-bottom: 6px;
  }
  .meta .v {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
  }
  .warn {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 0.84rem;
    color: var(--cargo-bright);
    margin-bottom: 16px;
    line-height: 1.4;
  }
  .disc {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.45;
    margin-bottom: 22px;
  }
  .disc svg,
  .warn svg {
    flex: none;
    margin-top: 2px;
  }
  .cta {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 56px;
    border-radius: 999px;
    background: var(--grad);
    color: #fff;
    font-size: 0.76rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    box-shadow: 0 16px 38px -18px rgba(var(--accent-rgb), 0.7);
    transition: filter 0.4s var(--ease-snap);
  }
  .cta:hover {
    filter: brightness(1.06);
  }
`;

const SLIDER_MIN = 500;
const SLIDER_MAX = 20000;

const fmt = (n: number) => '$' + (Math.round(n / 10) * 10).toLocaleString('ru-RU');

const Calculator = () => {
  const { t } = useI18n();
  const c = t.ui.calculator;
  const cargoCategories = t.cargoCategories;
  const routeOptions = t.routeOptions;
  const [unit, setUnit] = useState<'kg' | 't'>('kg');
  const [kg, setKg] = useState(1000);
  const [cat, setCat] = useState(cargoCategories[0].id);
  const [route, setRoute] = useState(routeOptions[0].id);

  const category = cargoCategories.find((c) => c.id === cat)!;
  const routeOpt = routeOptions.find((r) => r.id === route)!;

  const calc = useMemo(() => {
    const billable = Math.max(kg, MIN_WEIGHT_KG);
    const rate = category.rate * routeOpt.factor;
    const low = billable * rate;
    const high = billable * rate * PRICE_SPREAD;
    return { rate, low, high, below: kg < MIN_WEIGHT_KG };
  }, [kg, category, routeOpt]);

  const displayWeight = unit === 'kg' ? kg : +(kg / 1000).toFixed(2);
  const pct = Math.min(100, Math.max(0, ((kg - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100));

  const onWeightInput = (raw: string) => {
    const v = parseFloat(raw) || 0;
    setKg(unit === 'kg' ? v : v * 1000);
  };

  const goToLead = () => {
    const w =
      kg >= 1000
        ? `${(kg / 1000).toFixed(kg % 1000 ? 1 : 0)} ${c.unitT}`
        : `${kg} ${c.unitKg}`;
    setQuote({
      summary: c.quote({
        weight: w,
        category: category.label,
        route: routeOpt.label,
        low: fmt(calc.low),
        high: fmt(calc.high),
        w1: routeOpt.weeks[0],
        w2: routeOpt.weeks[1],
      }),
      estimate: { weightKg: kg, category: category.id, route: routeOpt.id },
    });
    scrollToEl('#lead', -10);
  };

  return (
    <Section data-nav-theme="light" id="calculator">
      <Container>
        <SectionHeader
          eyebrow={c.eyebrow}
          index={c.index}
          title={
            <>
              {c.titlePre}<span className="accent">{c.titleAccent}</span>
            </>
          }
          lead={c.lead}
        />

        <Reveal>
          <Layout>
            <Panel>
              <Field>
                <div className="flabel">
                  <span>{c.weight}</span>
                  <span className="hint">{c.minOrder}</span>
                </div>
                <WeightRow>
                  <input
                    type="number"
                    value={displayWeight}
                    min={0}
                    onChange={(e) => onWeightInput(e.target.value)}
                    aria-label={c.weight}
                  />
                  <Unit>
                    <button className={unit === 'kg' ? 'on' : ''} onClick={() => setUnit('kg')}>
                      {c.unitKg}
                    </button>
                    <button className={unit === 't' ? 'on' : ''} onClick={() => setUnit('t')}>
                      {c.unitT}
                    </button>
                  </Unit>
                </WeightRow>
                <Slider
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  step={100}
                  value={Math.min(kg, SLIDER_MAX)}
                  onChange={(e) => setKg(parseInt(e.target.value, 10))}
                  style={{ ['--pct' as string]: `${pct}%` }}
                  aria-label={c.weight}
                />
              </Field>

              <Field>
                <div className="flabel">
                  <span>{c.cargoType}</span>
                </div>
                <Pills>
                  {cargoCategories.map((cc) => (
                    <Pill key={cc.id} $on={cc.id === cat} onClick={() => setCat(cc.id)} type="button">
                      <div className="t">{cc.label}</div>
                      <div className="h">{cc.hint}</div>
                      <div className="r">{c.rate(cc.rate.toFixed(2))}</div>
                    </Pill>
                  ))}
                </Pills>
              </Field>

              <Field>
                <div className="flabel">
                  <span>{c.direction}</span>
                </div>
                <RouteRow>
                  {routeOptions.map((r) => (
                    <Pill key={r.id} $on={r.id === route} onClick={() => setRoute(r.id)} type="button">
                      <div className="t">{c.to(r.label)}</div>
                      <div className="r">{c.weeks(r.weeks[0], r.weeks[1])}</div>
                    </Pill>
                  ))}
                </RouteRow>
              </Field>
            </Panel>

            <Result>
              <span className="rlabel">
                <LuCalculator style={{ verticalAlign: '-2px', marginRight: 7 }} />
                {c.resultLabel}
              </span>
              <motion.div
                className="price"
                key={`${calc.low}-${calc.high}`}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {fmt(calc.low)} – {fmt(calc.high)}
              </motion.div>
              <span className="per">
                {c.per(calc.rate.toFixed(2), category.label.toLowerCase())}
              </span>

              <div className="meta">
                <div>
                  <div className="k">{c.term}</div>
                  <div className="v">{c.termVal(routeOpt.weeks[0], routeOpt.weeks[1])}</div>
                </div>
                <div>
                  <div className="k">{c.directionLabel}</div>
                  <div className="v">{c.to(routeOpt.label)}</div>
                </div>
              </div>

              {calc.below && (
                <div className="warn">
                  <LuInfo size={16} />
                  <span>{c.warn}</span>
                </div>
              )}
              <div className="disc">
                <LuInfo size={16} />
                <span>{c.disc}</span>
              </div>

              <button className="cta" onClick={goToLead}>
                {c.cta}
                <LuArrowRight />
              </button>
            </Result>
          </Layout>
        </Reveal>
      </Container>
    </Section>
  );
};

export default Calculator;
