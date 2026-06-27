import styled from 'styled-components';
import { LuCalculator, LuSend, LuPackageSearch } from 'react-icons/lu';
import { glassPanel } from './glass';
import { haptic } from '../telegram';

export type Tab = 'calc' | 'lead' | 'track';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'calc', label: 'Расчёт', icon: <LuCalculator /> },
  { id: 'lead', label: 'Заявка', icon: <LuSend /> },
  { id: 'track', label: 'Заказ', icon: <LuPackageSearch /> },
];

const Bar = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 20;
  margin: 10px 12px calc(var(--tg-bottom) + 10px);
  padding: 7px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  border-radius: 20px;
  ${glassPanel};
`;

const Item = styled.button<{ $on: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  border-radius: 14px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ $on }) => ($on ? '#fff' : 'var(--muted)')};
  background: ${({ $on }) => ($on ? 'var(--grad)' : 'transparent')};
  box-shadow: ${({ $on }) => ($on ? '0 12px 26px -14px rgba(var(--accent-rgb), 0.9)' : 'none')};
  transition: color 0.3s var(--ease-snap), background 0.3s var(--ease-snap);

  svg {
    font-size: 1.2rem;
  }
`;

interface Props {
  active: Tab;
  onChange: (t: Tab) => void;
}

const TabBar = ({ active, onChange }: Props) => (
  <Bar>
    {TABS.map((t) => (
      <Item
        key={t.id}
        $on={active === t.id}
        onClick={() => {
          haptic.tap();
          onChange(t.id);
        }}
      >
        {t.icon}
        {t.label}
      </Item>
    ))}
  </Bar>
);

export default TabBar;
