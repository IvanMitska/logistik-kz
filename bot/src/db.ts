// Tiny persistent order store backed by a JSON file with atomic writes.
// Adequate for small-business lead volume; swap for SQLite later behind the
// same interface if needed.

import { mkdirSync, readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { config } from './config.ts';
import type { Order, OrderStatusId, LeadInput } from '../../shared/types.ts';

const FILE = join(config.dataDir, 'orders.json');

mkdirSync(config.dataDir, { recursive: true });

let orders: Order[] = load();

function load(): Order[] {
  if (!existsSync(FILE)) return [];
  try {
    return JSON.parse(readFileSync(FILE, 'utf8')) as Order[];
  } catch (e) {
    console.error('✗ Failed to read orders.json, starting empty:', e);
    return [];
  }
}

function persist(): void {
  const tmp = FILE + '.tmp';
  writeFileSync(tmp, JSON.stringify(orders, null, 2));
  renameSync(tmp, FILE); // atomic on same filesystem
}

/** Public order id: LK-XXXXX (unambiguous chars, no 0/O/1/I). */
function genId(): string {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let id: string;
  do {
    const bytes = randomBytes(5);
    id = 'LK-' + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  } while (orders.some((o) => o.id === id));
  return id;
}

export function createOrder(
  lead: LeadInput,
  tg?: { userId?: number; username?: string },
): Order {
  const now = Date.now();
  const order: Order = {
    id: genId(),
    status: 'new',
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    cargo: lead.cargo,
    estimate: lead.estimate,
    tgUserId: tg?.userId,
    tgUsername: tg?.username,
    createdAt: now,
    updatedAt: now,
    history: [{ status: 'new', at: now }],
  };
  orders.unshift(order);
  persist();
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id.trim().toUpperCase());
}

/** Find recent orders by phone (last 4+ digits match), newest first. */
export function findByPhone(phone: string): Order[] {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return [];
  const tail = digits.slice(-7);
  return orders.filter((o) => o.phone.replace(/\D/g, '').endsWith(tail));
}

export function setStatus(id: string, status: OrderStatusId): Order | undefined {
  const order = getOrder(id);
  if (!order || order.status === status) return order;
  order.status = status;
  order.updatedAt = Date.now();
  order.history.push({ status, at: order.updatedAt });
  persist();
  return order;
}
