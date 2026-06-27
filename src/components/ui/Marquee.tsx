import styled, { keyframes } from 'styled-components';
import type { ReactNode } from 'react';

const scroll = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

const Track = styled.div<{ $duration: number; $reverse?: boolean }>`
  display: flex;
  width: max-content;
  will-change: transform;
  animation: ${scroll} ${({ $duration }) => $duration}s linear infinite;
  animation-direction: ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};
`;

const Mask = styled.div`
  width: 100%;
  overflow: hidden;
  user-select: none;
  &:hover ${Track} {
    animation-play-state: paused;
  }
`;

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee — the children are duplicated so the
 * 50% translate loops seamlessly.
 */
const Marquee = ({ children, duration = 28, reverse, className }: MarqueeProps) => (
  <Mask className={className}>
    <Track $duration={duration} $reverse={reverse} aria-hidden="false">
      {children}
      {children}
    </Track>
  </Mask>
);

export default Marquee;
