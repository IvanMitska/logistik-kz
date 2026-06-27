import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentType, ReactNode } from 'react';

type DynamicTagProps = { children?: ReactNode; [key: string]: unknown };

interface SplitWordsProps {
  text: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

/**
 * Word-by-word masked reveal. The outer element is the scroll trigger;
 * children animate via a framer-motion variant cascade.
 */
const SplitWords = ({
  text,
  delay = 0,
  stagger = 0.07,
  duration = 0.85,
  className,
  as = 'h2',
}: SplitWordsProps) => {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as as unknown as ComponentType<DynamicTagProps>;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = (
    motion as unknown as Record<string, ComponentType<DynamicTagProps>>
  )[as];
  const words = text.split(' ');

  return (
    <MotionTag
      key={text}
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: delay, staggerChildren: stagger },
        },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'baseline',
            paddingBottom: '0.14em',
            paddingRight: '0.28em',
            lineHeight: 'inherit',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%' },
            }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default SplitWords;
