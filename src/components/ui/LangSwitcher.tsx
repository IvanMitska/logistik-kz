import styled from 'styled-components';
import { useI18n } from '../../i18n/I18nContext';
import { LANGS } from '../../i18n/translations';

/**
 * Compact RU/KK/EN segmented switch. Inherits the nav colour (currentColor)
 * so it reads correctly on both dark and light sections.
 */
const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 46px;
  padding: 0 6px;
  border-radius: 999px;
  border: 1px solid currentColor;
  opacity: 0.92;

  button {
    height: 30px;
    min-width: 32px;
    padding: 0 9px;
    border-radius: 999px;
    font-family: var(--font-grotesk);
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: inherit;
    opacity: 0.55;
    transition: opacity 0.25s var(--ease-snap), background 0.25s var(--ease-snap), color 0.25s;
  }
  button:hover {
    opacity: 0.9;
  }
  button.on {
    opacity: 1;
    /* neutral translucent fill — reads on both dark and light grounds */
    background: rgba(128, 128, 128, 0.28);
  }

  @media (max-width: 520px) {
    height: 42px;
    button {
      min-width: 28px;
      padding: 0 7px;
      font-size: 0.62rem;
    }
  }
`;

const LangSwitcher = ({ className }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  return (
    <Wrap className={className} role="group" aria-label="Язык / Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={l.code === lang ? 'on' : ''}
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
          aria-label={l.label}
          type="button"
        >
          <span>{l.short}</span>
        </button>
      ))}
    </Wrap>
  );
};

export default LangSwitcher;
