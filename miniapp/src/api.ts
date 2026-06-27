// API client for the bot server. Always same-origin (/api): in production the
// bot serves the built mini-app; in dev Vite proxies /api to the bot.

import { getInitData } from './telegram';
import type { LeadInput, OrderStatusId } from '@shared/types';

export interface TrackedOrder {
  id: string;
  status: OrderStatusId;
  statusLabel: string;
  statusClient: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  history: Array<{ status: OrderStatusId; at: number }>;
  estimate?: LeadInput['estimate'];
}

export async function submitLead(lead: LeadInput): Promise<{ id: string; delivered: boolean }> {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData: getInitData(), lead }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `Ошибка ${res.status}`);
  }
  return res.json();
}

export async function track(params: { id?: string; phone?: string }): Promise<TrackedOrder[]> {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`/api/track?${qs}`, {
    headers: { 'X-Telegram-Init-Data': getInitData() },
  });
  if (res.status === 404) return [];
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `Ошибка ${res.status}`);
  }
  const data = (await res.json()) as { orders: TrackedOrder[] };
  return data.orders;
}
