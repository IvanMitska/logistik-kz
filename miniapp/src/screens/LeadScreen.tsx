import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCheck, LuPackageSearch, LuLoaderCircle } from 'react-icons/lu';
import ScreenTitle from '../ui/ScreenTitle';
import { glassPanel } from '../ui/glass';
import { haptic, inTelegram } from '../telegram';
import { submitLead } from '../api';
import type { Quote } from './CalculatorScreen';

const Form = styled.form`
  ${glassPanel};
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-radius: 22px;
  padding: 20px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;

  .lbl {
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
  input,
  textarea {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(10, 12, 16, 0.12);
    border-radius: 12px;
    padding: 14px 15px;
    font-size: 1rem;
    transition: border-color 0.3s, background 0.3s;
    resize: vertical;
  }
  input::placeholder,
  textarea::placeholder {
    color: var(--muted);
    opacity: 0.7;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--white);
  }
`;

const Submit = styled.button`
  margin-top: 4px;
  height: 56px;
  border-radius: 999px;
  background: var(--grad);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 16px 38px -18px rgba(var(--accent-rgb), 0.7);

  &:disabled {
    opacity: 0.7;
  }
  .spin {
    animation: spin 0.9s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Note = styled.p`
  font-size: 0.76rem;
  color: var(--muted);
  line-height: 1.5;
`;

const ErrorMsg = styled.p`
  font-size: 0.82rem;
  color: #c0392b;
`;

const Success = styled(motion.div)`
  ${glassPanel};
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-radius: 22px;
  padding: 28px 22px;
  align-items: flex-start;

  .check {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: var(--grad);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 1.4rem;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .id {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    letter-spacing: 0.04em;
    padding: 8px 14px;
    border-radius: 10px;
    background: var(--accent-soft);
    color: var(--accent-hover);
  }
  p {
    color: var(--muted);
    line-height: 1.5;
    font-size: 0.92rem;
  }
  .track {
    margin-top: 4px;
    height: 50px;
    width: 100%;
    border-radius: 999px;
    background: var(--ink);
    color: #fff;
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

interface Props {
  quote: Quote | null;
  onTracked: (id: string) => void;
}

const LeadScreen = ({ quote, onTracked }: Props) => {
  const [cargo, setCargo] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [doneId, setDoneId] = useState<string | null>(null);

  // Prefill the cargo field whenever a fresh quote arrives from the calculator.
  useEffect(() => {
    if (quote) setCargo(quote.summary);
  }, [quote]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const lead = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim() || undefined,
      cargo: String(fd.get('cargo') || '').trim(),
      estimate: quote?.estimate,
    };
    if (!lead.name || !lead.phone || !lead.cargo) {
      setError('Заполните имя, телефон и описание груза.');
      haptic.error();
      return;
    }
    setBusy(true);
    try {
      const { id } = await submitLead(lead);
      haptic.success();
      setDoneId(id);
    } catch (err) {
      haptic.error();
      setError(
        inTelegram
          ? 'Не удалось отправить заявку. Попробуйте ещё раз.'
          : 'Откройте приложение из Telegram, чтобы отправить заявку.',
      );
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <ScreenTitle
        eyebrow="Заявка"
        title={
          <>
            Рассчитаем доставку <span className="accent">вашего груза</span>
          </>
        }
        lead="Оставьте контакты и параметры груза — менеджер свяжется и подтвердит расчёт."
      />

      <AnimatePresence mode="wait">
        {doneId ? (
          <Success
            key="ok"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="check">
              <LuCheck />
            </div>
            <h3>Заявка принята</h3>
            <span className="id">{doneId}</span>
            <p>
              Сохраните номер заказа — по нему можно отслеживать статус. Менеджер свяжется с вами в
              течение рабочего дня.
            </p>
            <button className="track" onClick={() => onTracked(doneId)}>
              <LuPackageSearch />
              Отслеживать заказ
            </button>
          </Success>
        ) : (
          <Form key="form" onSubmit={onSubmit}>
            <Field>
              <span className="lbl">Имя</span>
              <input name="name" placeholder="Как к вам обращаться" required />
            </Field>
            <Field>
              <span className="lbl">Телефон</span>
              <input name="phone" type="tel" inputMode="tel" placeholder="+7 ___ ___ __ __" required />
            </Field>
            <Field>
              <span className="lbl">E-mail (необязательно)</span>
              <input name="email" type="email" placeholder="you@company.kz" />
            </Field>
            <Field>
              <span className="lbl">Груз и объём</span>
              <textarea
                name="cargo"
                rows={cargo ? 6 : 3}
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Что везём, примерный вес / объём, откуда в Китае"
              />
            </Field>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Submit type="submit" disabled={busy}>
              {busy ? (
                <>
                  <LuLoaderCircle className="spin" /> Отправляем…
                </>
              ) : (
                'Отправить заявку'
              )}
            </Submit>
            <Note>
              Нажимая «Отправить», вы соглашаетесь на обработку контактных данных для связи по вашему
              запросу.
            </Note>
          </Form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadScreen;
