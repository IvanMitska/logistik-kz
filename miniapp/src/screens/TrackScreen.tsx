import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LuSearch, LuCheck } from 'react-icons/lu';
import ScreenTitle from '../ui/ScreenTitle';
import { glassPanel } from '../ui/glass';
import { haptic } from '../telegram';
import { track } from '../api';
import type { TrackedOrder } from '../api';
import { STATUSES, statusIndex } from '@shared/statuses';

const SearchRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  input {
    flex: 1;
    min-width: 0;
    height: 52px;
    border-radius: 13px;
    border: 1px solid rgba(10, 12, 16, 0.12);
    background: rgba(255, 255, 255, 0.6);
    padding: 0 16px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  input::placeholder {
    text-transform: none;
    letter-spacing: 0;
    color: var(--muted);
    opacity: 0.7;
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--white);
  }
  button {
    flex: none;
    width: 52px;
    height: 52px;
    border-radius: 13px;
    background: var(--grad);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    box-shadow: 0 14px 30px -16px rgba(var(--accent-rgb), 0.8);
  }
`;

const Hint = styled.p`
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 4px;
`;

const Card = styled(motion.div)`
  ${glassPanel};
  border-radius: 22px;
  padding: 22px 20px;
  margin-top: 14px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }
  .oid {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    letter-spacing: 0.04em;
  }
  .name {
    font-size: 0.84rem;
    color: var(--muted);
  }
  .now {
    margin: 6px 0 20px;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

const Step = styled.div<{ $state: 'done' | 'current' | 'todo' }>`
  display: flex;
  gap: 14px;
  padding-bottom: 18px;
  position: relative;

  &:last-child {
    padding-bottom: 0;
  }
  /* connector line */
  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 28px;
    bottom: 0;
    width: 2px;
    background: ${({ $state }) =>
      $state === 'done' ? 'var(--accent)' : 'var(--bone-line)'};
  }
  .dot {
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.78rem;
    z-index: 1;
    background: ${({ $state }) =>
      $state === 'todo' ? 'var(--bone)' : 'var(--accent)'};
    color: ${({ $state }) => ($state === 'todo' ? 'var(--muted)' : '#fff')};
    border: ${({ $state }) =>
      $state === 'current' ? '3px solid rgba(var(--accent-rgb), 0.25)' : 'none'};
    box-shadow: ${({ $state }) =>
      $state === 'current' ? '0 0 0 4px rgba(var(--accent-rgb), 0.12)' : 'none'};
  }
  .body {
    padding-top: 3px;
  }
  .lbl {
    font-weight: ${({ $state }) => ($state === 'todo' ? 400 : 600)};
    font-size: 0.95rem;
    color: ${({ $state }) => ($state === 'todo' ? 'var(--muted)' : 'var(--ink)')};
  }
  .when {
    font-size: 0.74rem;
    color: var(--muted);
    margin-top: 2px;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
  padding: 24px 0;
`;

const fmtDate = (ms: number) =>
  new Date(ms).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

interface Props {
  initialId?: string;
}

const TrackScreen = ({ initialId }: Props) => {
  const [query, setQuery] = useState(initialId ?? '');
  const [orders, setOrders] = useState<TrackedOrder[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setBusy(true);
    setError('');
    try {
      const byId = /^lk-/i.test(q);
      const res = await track(byId ? { id: q } : { phone: q });
      setOrders(res);
      haptic.tap();
    } catch {
      setError('Не удалось загрузить статус. Откройте приложение из Telegram.');
      setOrders(null);
    } finally {
      setBusy(false);
    }
  }, []);

  // Auto-track when arriving from a freshly-created lead.
  useEffect(() => {
    if (initialId) {
      setQuery(initialId);
      run(initialId);
    }
  }, [initialId, run]);

  return (
    <div>
      <ScreenTitle
        eyebrow="Трекинг"
        title={
          <>
            Где сейчас <span className="accent">ваш груз</span>
          </>
        }
        lead="Введите номер заказа (LK-…) или телефон, который вы оставляли в заявке."
      />

      <SearchRow>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run(query)}
          placeholder="LK-XXXXX или телефон"
          aria-label="Номер заказа или телефон"
        />
        <button onClick={() => run(query)} aria-label="Найти" disabled={busy}>
          <LuSearch />
        </button>
      </SearchRow>

      {error && <Hint style={{ color: '#c0392b' }}>{error}</Hint>}
      {orders && orders.length === 0 && !busy && (
        <Empty>Заказ не найден. Проверьте номер или телефон.</Empty>
      )}

      {orders?.map((o) => {
        const current = statusIndex(o.status);
        const doneMap = new Map(o.history.map((h) => [h.status, h.at]));
        return (
          <Card key={o.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="head">
              <span className="oid">{o.id}</span>
              <span className="name">{o.name}</span>
            </div>
            <div className="now">{o.statusClient}</div>
            <Timeline>
              {STATUSES.map((s, i) => {
                const state = i < current ? 'done' : i === current ? 'current' : 'todo';
                const at = doneMap.get(s.id);
                return (
                  <Step key={s.id} $state={state}>
                    <span className="dot">{state === 'done' ? <LuCheck /> : s.emoji}</span>
                    <span className="body">
                      <div className="lbl">{s.label}</div>
                      {at && <div className="when">{fmtDate(at)}</div>}
                    </span>
                  </Step>
                );
              })}
            </Timeline>
          </Card>
        );
      })}
    </div>
  );
};

export default TrackScreen;
