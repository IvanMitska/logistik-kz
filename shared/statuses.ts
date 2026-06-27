// Order lifecycle — mirrors the website's `process` steps (src/data/content.ts).
// Used by the bot (status buttons + push copy) and the mini-app (tracking timeline).

import type { OrderStatusId } from './types.ts';

export interface StatusDef {
  id: OrderStatusId;
  /** Short label for buttons / chips. */
  label: string;
  /** Client-facing line shown in tracking + push notifications. */
  client: string;
  /** Emoji used in Telegram messages. */
  emoji: string;
}

export const STATUSES: StatusDef[] = [
  { id: 'new', label: 'Заявка принята', client: 'Заявка принята — менеджер скоро свяжется с вами', emoji: '📝' },
  { id: 'confirmed', label: 'Расчёт подтверждён', client: 'Расчёт подтверждён, готовим приёмку груза', emoji: '✅' },
  { id: 'warehouse', label: 'Принято на складе', client: 'Груз принят на складе в Китае — стартует доставка', emoji: '📦' },
  { id: 'transit', label: 'В пути по ЖД', client: 'Груз в пути по железной дороге', emoji: '🚆' },
  { id: 'customs', label: 'Растаможка', client: 'Груз на белой растаможке — оформляем документы', emoji: '🛃' },
  { id: 'delivered', label: 'Доставлено', client: 'Груз доставлен. Спасибо, что выбрали logistics.kaz!', emoji: '🎉' },
];

export const STATUS_ORDER: OrderStatusId[] = STATUSES.map((s) => s.id);

export function statusDef(id: OrderStatusId): StatusDef {
  return STATUSES.find((s) => s.id === id) ?? STATUSES[0]!;
}

export function statusIndex(id: OrderStatusId): number {
  return STATUS_ORDER.indexOf(id);
}
