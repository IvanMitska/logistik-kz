import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPhone, LuMail, LuMessageCircle, LuCheck, LuClock } from 'react-icons/lu';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { glassPanel, glassPanelHover } from '../components/ui/glass';
import { company } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { getQuote, onQuote } from '../lib/quote';

const Section = styled.section`
  background: var(--bone-dim);
  color: var(--ink);
  padding: clamp(72px, 13vh, 170px) 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

// ── left: manager + quick contacts ──────────────────────────────────────
const ManagerCard = styled.div`
  ${glassPanel};
  border-radius: 22px;
  padding: clamp(26px, 3vw, 38px);
  margin-bottom: 16px;

  .top {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    flex: none;
    display: grid;
    place-items: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.4rem;
    color: #fff;
    background: var(--grad);
  }
  .who .name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
  }
  .who .role {
    font-size: 0.9rem;
    color: var(--muted);
    margin-top: 3px;
  }
  .resp {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 22px;
    padding: 9px 14px;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent-hover);
    font-size: 0.82rem;
    font-weight: 600;
  }
`;

const Quick = styled.div`
  display: grid;
  gap: 10px;
`;

const QuickLink = styled.a`
  ${glassPanel};
  ${glassPanelHover};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  border-radius: 16px;

  &:hover {
    transform: translateX(4px);
  }
  .ic {
    width: 42px;
    height: 42px;
    border-radius: 11px;
    flex: none;
    display: grid;
    place-items: center;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 1.2rem;
  }
  .meta {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .k {
    display: block;
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .v {
    display: block;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
`;

// ── right: form ─────────────────────────────────────────────────────────
const Form = styled.form`
  ${glassPanel};
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 22px;
  padding: clamp(26px, 3vw, 40px);
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .lbl {
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
  input,
  textarea {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(10, 12, 16, 0.1);
    border-radius: 12px;
    padding: 15px 16px;
    color: var(--ink);
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
  margin-top: 6px;
  height: 58px;
  border-radius: 999px;
  background: var(--grad);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 16px 38px -18px rgba(var(--accent-rgb), 0.7);
  transition: filter 0.4s var(--ease-snap);

  &:hover {
    filter: brightness(1.06);
  }
`;

const Note = styled.p`
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.5;
`;

const Success = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid var(--accent);
  border-radius: 22px;
  padding: clamp(28px, 4vw, 48px);
  background: var(--accent-soft);
  min-height: 340px;
  justify-content: center;

  .check {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--accent);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.8rem;
    letter-spacing: -0.02em;
  }
  p {
    color: var(--muted);
    line-height: 1.5;
  }
`;

const LeadForm = () => {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [cargo, setCargo] = useState('');

  // Prefill the cargo field from the calculator (now or when it fires later).
  useEffect(() => {
    const q = getQuote();
    if (q) setCargo(q.summary);
    return onQuote((nq) => setCargo(nq.summary));
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = [
      `Имя: ${fd.get('name') || ''}`,
      `Телефон: ${fd.get('phone') || ''}`,
      `E-mail: ${fd.get('email') || ''}`,
      ``,
      `${fd.get('cargo') || ''}`,
    ].join('\n');
    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
      'Заявка на доставку — logistics.kaz',
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <Section data-nav-theme="light" id="lead">
      <Container>
        <SectionHeader
          eyebrow="Оставить заявку"
          index="/ контакты"
          title={
            <>
              Рассчитаем доставку <span className="accent">вашего груза</span>
            </>
          }
          lead="Оставьте контакты и параметры груза — свяжемся, посчитаем стоимость и сроки. Или напишите менеджеру напрямую в удобном канале."
        />

        <Grid>
          <Reveal>
            <div>
              <ManagerCard>
                <div className="top">
                  <div className="avatar">ДМ</div>
                  <div className="who">
                    <div className="name">{company.contactPerson}</div>
                    <div className="role">{t.company.role}</div>
                  </div>
                </div>
                <div className="resp">
                  <LuClock size={15} />
                  {t.company.responseTime}
                </div>
              </ManagerCard>

              <Quick>
                <QuickLink href={`tel:${company.phoneHref}`}>
                  <span className="ic">
                    <LuPhone />
                  </span>
                  <span className="meta">
                    <span className="k">Позвонить</span>
                    <span className="v">{company.phone}</span>
                  </span>
                </QuickLink>
                <QuickLink href={company.whatsapp} target="_blank" rel="noreferrer">
                  <span className="ic">
                    <LuMessageCircle />
                  </span>
                  <span className="meta">
                    <span className="k">WhatsApp</span>
                    <span className="v">Написать в мессенджере</span>
                  </span>
                </QuickLink>
                <QuickLink href={`mailto:${company.email}`}>
                  <span className="ic">
                    <LuMail />
                  </span>
                  <span className="meta">
                    <span className="k">E-mail</span>
                    <span className="v">{company.email}</span>
                  </span>
                </QuickLink>
              </Quick>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              {sent ? (
                <Success
                  key="ok"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="check">
                    <LuCheck />
                  </div>
                  <h3>Заявка собрана</h3>
                  <p>
                    Мы открыли почтовый клиент с&nbsp;готовым письмом&nbsp;— отправьте его, и&nbsp;мы
                    свяжемся с&nbsp;вами. Если письмо не&nbsp;открылось, напишите на&nbsp;
                    {company.email} или в&nbsp;WhatsApp {company.phone}.
                  </p>
                </Success>
              ) : (
                <Form key="form" onSubmit={onSubmit}>
                  <Field>
                    <span className="lbl">Имя</span>
                    <input name="name" placeholder="Как к вам обращаться" required />
                  </Field>
                  <Field>
                    <span className="lbl">Телефон</span>
                    <input name="phone" type="tel" placeholder="+7 ___ ___ __ __" required />
                  </Field>
                  <Field>
                    <span className="lbl">E-mail</span>
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
                  <Submit type="submit">Отправить заявку</Submit>
                  <Note>
                    Нажимая «Отправить», вы&nbsp;соглашаетесь на&nbsp;обработку контактных данных
                    для&nbsp;связи по&nbsp;вашему запросу.
                  </Note>
                </Form>
              )}
            </AnimatePresence>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
};

export default LeadForm;
