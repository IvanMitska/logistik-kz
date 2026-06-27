import styled from 'styled-components';
import type { ReactNode } from 'react';

const Wrap = styled.div`
  margin-bottom: 18px;

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .eyebrow::before {
    content: '';
    width: 16px;
    height: 1px;
    background: var(--accent);
  }
  h1 {
    font-size: 1.7rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }
  .lead {
    margin-top: 8px;
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.45;
  }
`;

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}

const ScreenTitle = ({ eyebrow, title, lead }: Props) => (
  <Wrap>
    <span className="eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    {lead && <p className="lead">{lead}</p>}
  </Wrap>
);

export default ScreenTitle;
