import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Logo from './ui/Logo';
import LangSwitcher from './ui/LangSwitcher';
import { useI18n } from '../i18n/I18nContext';
import { stopScroll, startScroll, scrollToEl } from '../lib/lenis';

/**
 * logistics.kaz navigation — Lusion-style header. Wordmark left,
 * "Оставить заявку" pill + Menu right. Menu opens a full-screen dark
 * overlay with oversized links. Header colour follows [data-nav-theme].
 */

type NavTheme = 'light' | 'dark';

const Strip = styled.div<{ $theme: NavTheme; $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $scrolled }) => ($scrolled ? '14px' : '24px')} 32px;
  pointer-events: none;
  color: ${({ $theme }) => ($theme === 'dark' ? '#fff' : 'var(--ink)')};
  transition: color 0.5s var(--ease-snap), padding 0.5s var(--ease-snap);

  & > * {
    pointer-events: auto;
  }

  @media (max-width: 640px) {
    padding: ${({ $scrolled }) => ($scrolled ? '12px' : '16px')} 18px;
  }
`;

const Wordmark = styled(Link)`
  color: inherit;
  display: inline-flex;
  align-items: center;
  line-height: 1;

  @media (max-width: 600px) {
    /* on tight screens show the compact icon-only mark */
    .full { display: none; }
  }
  @media (min-width: 601px) {
    .mark-only { display: none; }
  }
`;

const Cluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Primary CTA — solid ink pill with white text + circular arrow,
// matching the hero card button. Same on every section.
const Pill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 46px;
  padding: 0 6px 0 22px;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  white-space: nowrap;
  background: var(--ink);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 30px -14px rgba(0, 0, 0, 0.55);
  transition: transform 0.4s var(--ease-expo), background 0.4s var(--ease-snap);

  .ic {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--grad);
    color: #fff;
    font-size: 0.9rem;
  }

  &:hover {
    transform: translateY(-1px);
    background: #000;
  }

  @media (max-width: 600px) {
    &.hide-sm { display: none; }
  }
`;

// Menu — same ink colour as the CTA when closed; flips to white when open.
const MenuBtn = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  height: 46px;
  padding: 0 20px;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  background: ${({ $open }) => ($open ? '#fff' : 'var(--ink)')};
  color: ${({ $open }) => ($open ? 'var(--ink)' : '#fff')};
  border: 1px solid ${({ $open }) => ($open ? '#fff' : 'rgba(255,255,255,0.12)')};
  box-shadow: ${({ $open }) => ($open ? 'none' : '0 12px 30px -14px rgba(0,0,0,0.55)')};
  transition: all 0.4s var(--ease-snap);

  .bars {
    position: relative;
    width: 16px;
    height: 10px;
  }
  .bars span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 0.4s var(--ease-snap);
  }
  .bars span:nth-child(1) {
    top: 0;
    transform: ${({ $open }) => ($open ? 'translateY(4.25px) rotate(45deg)' : 'none')};
  }
  .bars span:nth-child(2) {
    bottom: 0;
    transform: ${({ $open }) => ($open ? 'translateY(-4.25px) rotate(-45deg)' : 'none')};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 99;
  background: #07090d;
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const OverlayInner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 120px clamp(20px, 5vw, 80px) 40px;
  position: relative;

  .menu-lang {
    margin-top: clamp(30px, 6vh, 56px);
  }
  @media (min-width: 601px) {
    .menu-lang {
      display: none;
    }
  }
`;

const MenuLabel = styled.span`
  display: block;
  font-family: var(--font-grotesk);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent-bright);
  margin-bottom: clamp(18px, 2.4vw, 30px);
  padding-left: 2px;
`;

const BigNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Row = styled.button`
  position: relative;
  display: flex;
  align-items: baseline;
  gap: clamp(16px, 3vw, 40px);
  padding: clamp(8px, 1.2vw, 14px) 0;
  color: #fff;
  text-align: left;

  .idx {
    font-family: var(--font-grotesk);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-bright);
    font-variant-numeric: tabular-nums;
  }
  .label-wrap {
    display: inline-block;
    overflow: hidden;
    padding: 0.1em 0.2em;
    margin: -0.1em -0.2em;
    transition: transform 0.5s var(--ease-expo);
  }
  .label {
    display: inline-block;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.5rem, 6vw, 5rem);
    letter-spacing: -0.045em;
    line-height: 1.08;
    transition: color 0.4s var(--ease-snap);
    @media (max-width: 920px) {
      font-size: clamp(2.75rem, 10vw, 6rem);
    }
  }
  &:hover .label-wrap { transform: translateX(clamp(12px, 2vw, 32px)); }
  &:hover .label { color: var(--accent-bright); }
`;

interface NavBarProps {
  surface?: NavTheme;
}

const NavBar = ({ surface }: NavBarProps) => {
  const { t } = useI18n();
  const navItems = [
    { id: 'services', label: t.ui.nav.items.services },
    { id: 'calculator', label: t.ui.nav.items.calculator },
    { id: 'geography', label: t.ui.nav.items.geography },
    { id: 'lead', label: t.ui.nav.items.lead },
  ];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<NavTheme>(surface ?? 'light');
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      startScroll();
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Nav theme follows the [data-nav-theme] section under the header line.
  useEffect(() => {
    if (surface) {
      setNavTheme(surface);
      return;
    }
    const LINE = 72;
    let els: HTMLElement[] = [];
    let raf = 0;
    const compute = () => {
      raf = 0;
      if (!els.length) els = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'));
      let pick: NavTheme | null = null;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= LINE && r.bottom > LINE) {
          const th = el.getAttribute('data-nav-theme') as NavTheme | null;
          if (th) pick = th;
        }
      }
      if (pick) setNavTheme(pick);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    const timer = window.setTimeout(() => {
      els = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'));
      compute();
    }, 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [surface, location.pathname]);

  const goto = (id: string) => {
    setOpen(false);
    if (id === 'top') {
      scrollToEl(document.body, 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // wait for overlay close so scroll isn't locked
    setTimeout(() => scrollToEl(`#${id}`, -10), 60);
  };

  const theme: NavTheme = open ? 'dark' : navTheme;

  return (
    <>
      <Strip $theme={theme} $scrolled={scrolled}>
        <Wordmark to="/" aria-label={t.ui.nav.ariaHome}>
          <Logo className="full" $variant="full" $height="clamp(34px, 3vw, 42px)" />
          <Logo className="mark-only" $variant="mark" $height="40px" />
        </Wordmark>

        <Cluster>
          <LangSwitcher className="hide-sm" />
          <Pill className="hide-sm" onClick={() => goto('lead')}>
            {t.ui.nav.cta}
            <span className="ic" aria-hidden>
              <FiArrowUpRight />
            </span>
          </Pill>
          <MenuBtn
            $open={open}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.ui.nav.ariaClose : t.ui.nav.ariaOpen}
          >
            {open ? t.ui.nav.close : t.ui.nav.menu}
            <span className="bars" aria-hidden>
              <span />
              <span />
            </span>
          </MenuBtn>
        </Cluster>
      </Strip>

      <AnimatePresence>
        {open && (
          <Overlay
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-surface="dark"
          >
            <OverlayInner>
              <div className="nav-col">
                <MenuLabel>{t.ui.nav.label}</MenuLabel>
                <BigNav>
                  {navItems.map((item, i) => (
                    <Row key={item.id} onClick={() => goto(item.id)}>
                      <span className="idx">0{i + 1}</span>
                      <span className="label-wrap">
                        <motion.span
                          className="label"
                          initial={reduced ? false : { y: '110%' }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.7, delay: 0.18 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                          style={{ display: 'inline-block' } as CSSProperties}
                        >
                          {item.label}
                        </motion.span>
                      </span>
                    </Row>
                  ))}
                </BigNav>
                <LangSwitcher className="menu-lang" />
              </div>
            </OverlayInner>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
