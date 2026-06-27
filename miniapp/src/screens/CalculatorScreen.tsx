import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LuArrowRight, LuInfo } from 'react-icons/lu';
import ScreenTitle from '../ui/ScreenTitle';
import { glassPanel } from '../ui/glass';
import { haptic } from '../telegram';
import {
  cargoCategories,
  routeOptions,
  estimate as calcEstimate,
  fmtUsd,
  fmtWeight,
  MIN_WEIGHT_KG,
  SLIDER_MIN,
  SLIDER_MAX,
} from '@shared/calc';
import type { CargoCategoryId, RouteId, LeadInput } from '@shared/types';

export interface Quote {
  summary: string;
  estimate: NonNullable<LeadInput['estimate']>;
}

const Panel = styled.div`
  ${glassPanel};
  border-radius: 22px;
  padding: 20px;
`;

const Field = styled.div`
  & + & {
    margin-top: 26px;
  }
  .flabel {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }
  .flabel .hint {
    letter-spacing: 0;
    text-transform: none;
    font-weight: 500;
    opacity: 0.85;
  }
`;

const WeightRow = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    min-width: 0;
    height: 54px;
    border: 1px solid rgba(10, 12, 16, 0.1);
    border-radius: 13px;
    padding: 0 16px;
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    background: var(--bone);
    transition: border-color 0.3s, background 0.3s;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--white);
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Unit = styled.div`
  display: inline-flex;
  background: var(--bone);
  border: 1px solid rgba(10, 12, 16, 0.1);
  border-radius: 13px;
  padding: 4px;
  gap: 4px;

  button {
    height: 44px;
    padding: 0 16px;
    border-radius: 10px;
    font-size: 0.85rem;
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--white);
    border: 2px solid var(--accent);
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.4);
  }
`;

const Pills = styled.div`
  display: grid;
  gap: 8px;
`;

const Pill = styled.button<{ $on: boolean }>`
  text-align: left;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid ${({ $on }) => ($on ? 'var(--accent)' : 'rgba(10, 12, 16, 0.1)')};
  background: ${({ $on }) => ($on ? 'var(--accent-soft)' : 'rgba(255, 255, 255, 0.6)')};
  transition: all 0.25s var(--ease-snap);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  .t {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .h {
    font-size: 0.74rem;
    color: var(--muted);
    margin-top: 2px;
    line-height: 1.3;
  }
  .r {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    flex: none;
    color: ${({ $on }) => ($on ? 'var(--accent)' : 'var(--muted)')};
  }
`;

const RouteRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const Result = styled.div`
  margin-top: 14px;
  background: var(--ink);
  color: #fff;
  border-radius: 22px;
  padding: 24px 22px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -20%;
    width: 60%;
    height: 70%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--accent-rgb), 0.4), transparent 65%);
  }
  .rlabel {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted-dark);
  }
  .price {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 2.3rem;
    letter-spacing: -0.04em;
    line-height: 1.02;
    margin: 12px 0 4px;
  }
  .per {
    font-size: 0.86rem;
    color: rgba(255, 255, 255, 0.66);
  }
  .meta {
    display: flex;
    gap: 28px;
    margin: 20px 0;
    padding: 18px 0;
    border-top: 1px solid var(--ink-line);
    border-bottom: 1px solid var(--ink-line);
  }
  .meta .k {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted-dark);
    margin-bottom: 5px;
  }
  .meta .v {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
  }
  .disc {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.45;
    margin-bottom: 20px;
  }
  .disc svg {
    flex: none;
    margin-top: 2px;
  }
  .cta {
    width: 100%;
    height: 54px;
    border-radius: 999px;
    background: var(--grad);
    color: #fff;
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 16px 38px -18px rgba(var(--accent-rgb), 0.7);
  }
`;

interface Props {
  onSubmitQuote: (q: Quote) => void;
}

const CalculatorScreen = ({ onSubmitQuote }: Props) => {
  const [unit, setUnit] = useState<'kg' | 't'>('kg');
  const [kg, setKg] = useState(1000);
  const [cat, setCat] = useState<CargoCategoryId>('general');
  const [route, setRoute] = useState<RouteId>('kz');

  const category = cargoCategories.find((c) => c.id === cat)!;
  const routeOpt = routeOptions.find((r) => r.id === route)!;
  const calc = useMemo(() => calcEstimate(kg, cat, route), [kg, cat, route]);

  const displayWeight = unit === 'kg' ? kg : +(kg / 1000).toFixed(2);
  const pct = Math.min(100, Math.max(0, ((kg - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100));

  const onWeightInput = (raw: string) => {
    const v = parseFloat(raw) || 0;
    setKg(unit === 'kg' ? v : v * 1000);
  };

  const submit = () => {
    haptic.impact('medium');
    const summary = `Расчёт из калькулятора:\n• Вес: ${fmtWeight(kg)}\n• Категория: ${category.label}\n• Направление: Китай → ${routeOpt.label}\n• Ориентир: ${fmtUsd(calc.low)}–${fmtUsd(calc.high)}, срок ${routeOpt.weeks[0]}–${routeOpt.weeks[1]} нед.`;
    onSubmitQuote({
      summary,
      estimate: {
        weightKg: kg,
        category: cat,
        route,
        low: calc.low,
        high: calc.high,
        weeks: routeOpt.weeks,
      },
    });
  };

  return (
    <div>
      <ScreenTitle
        eyebrow="Калькулятор"
        title={
          <>
            Прикиньте стоимость <span className="accent">за минуту</span>
          </>
        }
        lead="Укажите вес, тип груза и направление. Точную цену подтвердит менеджер."
      />

      <Panel>
        <Field>
          <div className="flabel">
            <span>Вес груза</span>
            <span className="hint">мин. 1 тонна</span>
          </div>
          <WeightRow>
            <input
              type="number"
              inputMode="decimal"
              value={displayWeight}
              min={0}
              onChange={(e) => onWeightInput(e.target.value)}
              aria-label="Вес груза"
            />
            <Unit>
              <button className={unit === 'kg' ? 'on' : ''} onClick={() => setUnit('kg')}>
                кг
              </button>
              <button className={unit === 't' ? 'on' : ''} onClick={() => setUnit('t')}>
                т
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
            aria-label="Ползунок веса"
          />
        </Field>

        <Field>
          <div className="flabel">
            <span>Тип груза</span>
          </div>
          <Pills>
            {cargoCategories.map((c) => (
              <Pill
                key={c.id}
                $on={c.id === cat}
                onClick={() => {
                  haptic.tap();
                  setCat(c.id);
                }}
                type="button"
              >
                <span>
                  <div className="t">{c.label}</div>
                  <div className="h">{c.hint}</div>
                </span>
                <span className="r">${c.rate.toFixed(2)}/кг</span>
              </Pill>
            ))}
          </Pills>
        </Field>

        <Field>
          <div className="flabel">
            <span>Направление</span>
          </div>
          <RouteRow>
            {routeOptions.map((r) => (
              <Pill
                key={r.id}
                $on={r.id === route}
                onClick={() => {
                  haptic.tap();
                  setRoute(r.id);
                }}
                type="button"
              >
                <span>
                  <div className="t">Китай → {r.label}</div>
                  <div className="r" style={{ marginTop: 4 }}>
                    {r.weeks[0]}–{r.weeks[1]} нед.
                  </div>
                </span>
              </Pill>
            ))}
          </RouteRow>
        </Field>
      </Panel>

      <Result>
        <span className="rlabel">Предварительная стоимость</span>
        <motion.div
          className="price"
          key={`${calc.low}-${calc.high}`}
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {fmtUsd(calc.low)} – {fmtUsd(calc.high)}
        </motion.div>
        <span className="per">
          ≈ ${calc.rate.toFixed(2)} за кг · {category.label.toLowerCase()}
        </span>

        <div className="meta">
          <div>
            <div className="k">Срок</div>
            <div className="v">
              {routeOpt.weeks[0]}–{routeOpt.weeks[1]} нед.
            </div>
          </div>
          <div>
            <div className="k">Направление</div>
            <div className="v">Китай → {routeOpt.label}</div>
          </div>
        </div>

        <div className="disc">
          <LuInfo size={16} />
          <span>
            {kg < MIN_WEIGHT_KG
              ? 'Расчёт показан для минимального заказа — 1 тонна. '
              : ''}
            Цена ориентировочная — финал фиксируем после уточнения деталей.
          </span>
        </div>

        <button className="cta" onClick={submit}>
          Оформить заявку
          <LuArrowRight />
        </button>
      </Result>
    </div>
  );
};

export default CalculatorScreen;
