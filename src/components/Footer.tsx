import styled from 'styled-components';
import Logo from './ui/Logo';
import { company } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { scrollToEl } from '../lib/lenis';

const Shell = styled.footer`
  background: var(--black);
  color: #fff;
  padding: clamp(56px, 9vh, 100px) 32px 32px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 56px 20px 28px;
  }
`;

const Inner = styled.div`
  max-width: 1680px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 40px;
  padding-bottom: clamp(40px, 7vh, 80px);
  border-bottom: 1px solid var(--ink-line);

  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Lead = styled.div`
  .eyebrow {
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted-dark);
  }
  .brand {
    display: inline-block;
    margin-top: 22px;
    color: #fff;
    transition: opacity 0.3s var(--ease-snap);
  }
  .brand:hover {
    opacity: 0.78;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .glabel {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted-dark);
    margin-bottom: 6px;
  }
  a,
  span,
  button {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.98rem;
    text-align: left;
    transition: color 0.25s;
  }
  a:hover,
  button:hover {
    color: var(--accent-bright);
  }
`;

const Legal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: clamp(28px, 4vh, 48px);
  padding-top: 24px;
  border-top: 1px solid var(--ink-line);
  font-size: 0.8rem;
  color: var(--muted-dark);

  button:hover {
    color: var(--accent-bright);
  }
`;

const Footer = () => {
  const { t } = useI18n();
  const f = t.ui.footer;
  return (
    <Shell data-nav-theme="dark">
      <Inner>
        <Top>
          <Lead>
            <span className="eyebrow">{f.ready}</span>
            <br />
            <button
              className="brand"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="logistics.kaz"
            >
              <Logo $variant="brand" $height="clamp(42px, 6vw, 88px)" />
            </button>
          </Lead>

          <Col>
            <span className="glabel">{f.contacts}</span>
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            <span>{company.contactPerson}</span>
          </Col>

          <Col>
            <span className="glabel">{f.nav}</span>
            <button onClick={() => scrollToEl('#services', -10)}>{f.items.services}</button>
            <button onClick={() => scrollToEl('#calculator', -10)}>{f.items.calculator}</button>
            <button onClick={() => scrollToEl('#geography', -10)}>{f.items.geography}</button>
            <button onClick={() => scrollToEl('#faq', -10)}>{f.items.faq}</button>
            <button onClick={() => scrollToEl('#lead', -10)}>{f.items.lead}</button>
          </Col>
        </Top>

        <Legal>
          <span>{f.legal(new Date().getFullYear())}</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{f.top}</button>
        </Legal>
      </Inner>
    </Shell>
  );
};

export default Footer;
