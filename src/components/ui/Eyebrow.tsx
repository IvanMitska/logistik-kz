import styled from 'styled-components';

/**
 * Small uppercase label with a leading dot — section eyebrow used
 * throughout the site.
 */
const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-grotesk);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
  line-height: 1;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    display: inline-block;
    flex: none;
  }

  [data-surface='dark'] & {
    color: var(--muted-dark);
  }
`;

export default Eyebrow;
