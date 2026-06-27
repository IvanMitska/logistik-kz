// Thin typed wrapper around the Telegram Mini App SDK (telegram-web-app.js,
// loaded in index.html). Degrades gracefully when opened in a plain browser
// so the app is still developable outside Telegram.

interface TgMainButton {
  text: string;
  show(): void;
  hide(): void;
  enable(): void;
  disable(): void;
  showProgress(leaveActive?: boolean): void;
  hideProgress(): void;
  setText(text: string): void;
  setParams(p: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }): void;
  onClick(cb: () => void): void;
  offClick(cb: () => void): void;
}

interface TgHaptic {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
  notificationOccurred(type: 'error' | 'success' | 'warning'): void;
  selectionChanged(): void;
}

interface TgWebApp {
  initData: string;
  initDataUnsafe: { user?: { id: number; first_name?: string; username?: string } };
  colorScheme: 'light' | 'dark';
  version: string;
  MainButton: TgMainButton;
  HapticFeedback: TgHaptic;
  ready(): void;
  expand(): void;
  disableVerticalSwipes?(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  onEvent(event: string, cb: () => void): void;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

export const tg: TgWebApp | undefined =
  typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

export const inTelegram = !!tg && !!tg.initData;

/** Initialise the viewport: ready, expand, brand chrome colors. */
export function initTelegram(): void {
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.disableVerticalSwipes?.();
  try {
    tg.setHeaderColor('#F3F5F7');
    tg.setBackgroundColor('#F3F5F7');
  } catch {
    /* older clients */
  }
}

/** initData string for backend HMAC validation. */
export function getInitData(): string {
  return tg?.initData ?? '';
}

export const haptic = {
  tap: () => tg?.HapticFeedback.selectionChanged(),
  impact: (s: 'light' | 'medium' | 'heavy' = 'light') => tg?.HapticFeedback.impactOccurred(s),
  success: () => tg?.HapticFeedback.notificationOccurred('success'),
  error: () => tg?.HapticFeedback.notificationOccurred('error'),
};
