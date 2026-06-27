import styled from 'styled-components';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Eyebrow from './Eyebrow';

/**
 * Unified section header used across the whole site: a hairline rule with
 * an eyebrow on the left and an index on the right, then a large editorial
 * title and an optional lead paragraph. Keeps every section's top in the
 * same rhythm so the page reads as one design, not a stack of templates.
 */

const Wrap = styled.div<{ $align?: 'left' | 'center' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
  text-align: ${({ $align }) => ($align === 'center' ? 'center' : 'left')};
  margin-bottom: clamp(40px, 6vh, 72px);
`;

const Rule = styled.div<{ $tone: Tone }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding-bottom: 22px;
  border-top: 1px solid ${({ $tone }) => ($tone === 'dark' ? 'var(--ink-line)' : 'var(--bone-line)')};
  padding-top: 18px;

  .idx {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    color: ${({ $tone }) => ($tone === 'dark' ? 'var(--muted-dark)' : 'var(--muted)')};
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
`;

const Title = styled(motion.h2)<{ $align?: 'left' | 'center'; $tone: Tone }>`
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2rem, 4.4vw, 3.6rem);
  letter-spacing: -0.035em;
  line-height: 1.02;
  color: ${({ $tone }) => ($tone === 'dark' ? '#fff' : 'var(--ink)')};
  max-width: 18ch;
  margin-top: 4px;
  ${({ $align }) => $align === 'center' && 'max-width: 22ch;'}

  .accent {
    background: ${({ $tone }) => ($tone === 'dark' ? 'var(--grad)' : 'var(--grad-text)')};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
`;

const Lead = styled(motion.p)<{ $align?: 'left' | 'center'; $tone: Tone }>`
  margin-top: 22px;
  max-width: 56ch;
  font-size: clamp(1.02rem, 1.3vw, 1.2rem);
  line-height: 1.55;
  color: ${({ $tone }) => ($tone === 'dark' ? 'var(--muted-dark)' : 'var(--muted)')};
`;

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Tone = 'light' | 'dark';

interface Props {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  tone?: Tone;
  className?: string;
}

const SectionHeader = ({
  eyebrow,
  index,
  title,
  lead,
  align = 'left',
  tone = 'light',
  className,
}: Props) => {
  const reduced = useReducedMotion();
  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <Wrap $align={align} className={className}>
      <Rule $tone={tone}>
        <Eyebrow>{eyebrow}</Eyebrow>
        {index && <span className="idx">{index}</span>}
      </Rule>
      <Title $align={align} $tone={tone} {...anim(0)}>
        {title}
      </Title>
      {lead && (
        <Lead $align={align} $tone={tone} {...anim(0.1)}>
          {lead}
        </Lead>
      )}
    </Wrap>
  );
};

export default SectionHeader;
