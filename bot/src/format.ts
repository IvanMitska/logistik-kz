// Builds the manager-facing Telegram message + inline status keyboard,
// and the client-facing status push copy.

import { InlineKeyboard } from 'grammy';
import { STATUSES, statusDef, statusIndex } from '../../shared/statuses.ts';
import { fmtUsd, fmtWeight, cargoCategories, routeOptions } from '../../shared/calc.ts';
import type { Order } from '../../shared/types.ts';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function estimateLine(o: Order): string | null {
  if (!o.estimate) return null;
  const e = o.estimate;
  const cat = cargoCategories.find((c) => c.id === e.category)?.label ?? e.category;
  const route = routeOptions.find((r) => r.id === e.route)?.label ?? e.route;
  return (
    `💰 <b>Расчёт:</b> ${fmtUsd(e.low)}–${fmtUsd(e.high)} · ${fmtWeight(e.weightKg)} · ` +
    `${esc(cat)} · Китай → ${esc(route)} · ${e.weeks[0]}–${e.weeks[1]} нед.`
  );
}

/** Full HTML message shown in the managers chat for an order. */
export function managerMessage(o: Order): string {
  const st = statusDef(o.status);
  const lines: string[] = [];
  lines.push(`${st.emoji} <b>${o.status === 'new' ? 'Новая заявка' : 'Заявка'} ${o.id}</b>`);
  lines.push(`Статус: <b>${esc(st.label)}</b>`);
  lines.push('');
  lines.push(`👤 <b>${esc(o.name)}</b>`);
  lines.push(`📞 ${esc(o.phone)}`);
  if (o.email) lines.push(`✉️ ${esc(o.email)}`);
  lines.push('');
  lines.push(`📦 ${esc(o.cargo)}`);
  const est = estimateLine(o);
  if (est) lines.push(est);
  lines.push('');
  if (o.tgUsername) lines.push(`👥 @${esc(o.tgUsername)}`);
  else if (o.tgUserId) lines.push(`👥 tg id ${o.tgUserId}`);
  return lines.join('\n');
}

/** Inline keyboard: tap a status to advance the order. Current one is marked. */
export function statusKeyboard(o: Order): InlineKeyboard {
  const kb = new InlineKeyboard();
  const current = statusIndex(o.status);
  STATUSES.forEach((s, i) => {
    const mark = i === current ? '● ' : i < current ? '✓ ' : '';
    kb.text(`${mark}${s.label}`, `st:${o.id}:${s.id}`);
    if (i % 2 === 1) kb.row();
  });
  return kb;
}

/** Push copy sent to the client when their order status changes. */
export function clientPush(o: Order): string {
  const st = statusDef(o.status);
  return `${st.emoji} Заказ <b>${o.id}</b>\n${esc(st.client)}`;
}
