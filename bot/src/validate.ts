// Validate Telegram Mini App `initData` per the official algorithm:
// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
// Guarantees the request really came from Telegram for our bot, and lets us
// trust the embedded user id.

import { createHmac, timingSafeEqual } from 'node:crypto';
import { config } from './config.ts';

export interface TgUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface InitDataResult {
  ok: boolean;
  user?: TgUser;
}

// Reject initData older than this (replay-protection). 24h.
const MAX_AGE_SEC = 24 * 60 * 60;

export function validateInitData(initData: string): InitDataResult {
  if (!initData) return { ok: false };

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return { ok: false };
  params.delete('hash');

  const dataCheckString = [...params.entries()]
    .map(([k, v]) => `${k}=${v}`)
    .sort()
    .join('\n');

  const secret = createHmac('sha256', 'WebAppData').update(config.botToken).digest();
  const computed = createHmac('sha256', secret).update(dataCheckString).digest('hex');

  const a = Buffer.from(computed, 'hex');
  const b = Buffer.from(hash, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };

  const authDate = Number(params.get('auth_date') || 0);
  if (!authDate || Date.now() / 1000 - authDate > MAX_AGE_SEC) return { ok: false };

  let user: TgUser | undefined;
  const rawUser = params.get('user');
  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as TgUser;
    } catch {
      /* user is optional */
    }
  }

  return { ok: true, user };
}
