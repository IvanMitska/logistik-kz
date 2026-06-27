import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const base = css<{ $variant?: 'solid' | 'ghost' | 'cargo'; $theme?: 'light' | 'dark' }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  height: 56px;
  padding: 0 30px;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  transition:
    background 0.4s var(--ease-snap),
    color 0.4s var(--ease-snap),
    border-color 0.4s var(--ease-snap),
    transform 0.4s var(--ease-expo);

  .led {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    flex: none;
  }
  .arrow {
    transition: transform 0.5s var(--ease-expo);
  }
  &:hover .arrow {
    transform: translate(4px, -4px);
  }

  ${({ $variant, $theme }) => {
    if ($variant === 'cargo') {
      return css`
        background: var(--cargo);
        color: var(--ink);
        border: 1px solid var(--cargo);
        &:hover {
          background: var(--cargo-bright);
          border-color: var(--cargo-bright);
        }
      `;
    }
    if ($variant === 'ghost') {
      return css`
        background: transparent;
        color: ${$theme === 'dark' ? '#fff' : 'var(--ink)'};
        border: 1px solid
          ${$theme === 'dark' ? 'rgba(255,255,255,0.26)' : 'rgba(10,12,16,0.18)'};
        &:hover {
          background: ${$theme === 'dark' ? '#fff' : 'var(--ink)'};
          color: ${$theme === 'dark' ? 'var(--ink)' : '#fff'};
          border-color: ${$theme === 'dark' ? '#fff' : 'var(--ink)'};
        }
      `;
    }
    return css`
      background: var(--accent);
      color: #fff;
      border: 1px solid var(--accent);
      &:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
      }
    `;
  }}
`;

export const ButtonLink = styled(Link)<{
  $variant?: 'solid' | 'ghost' | 'cargo';
  $theme?: 'light' | 'dark';
}>`
  ${base}
`;

export const ButtonA = styled.a<{
  $variant?: 'solid' | 'ghost' | 'cargo';
  $theme?: 'light' | 'dark';
}>`
  ${base}
`;

export const Button = styled.button<{
  $variant?: 'solid' | 'ghost' | 'cargo';
  $theme?: 'light' | 'dark';
}>`
  ${base}
`;
