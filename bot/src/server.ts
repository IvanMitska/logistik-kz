// HTTP API (Fastify): lead intake + order tracking for the mini-app, and it
// serves the built mini-app static files in production.

import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import { z } from 'zod';
import { config } from './config.ts';
import { validateInitData } from './validate.ts';
import { createOrder, getOrder, findByPhone } from './db.ts';
import { sendLeadToManagers } from './bot.ts';
import { statusDef } from '../../shared/statuses.ts';
import type { Order } from '../../shared/types.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MINIAPP_DIST = join(__dirname, '../../miniapp/dist');

const leadSchema = z.object({
  initData: z.string().min(1),
  lead: z.object({
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(5).max(40),
    email: z.string().trim().email().max(160).optional().or(z.literal('')),
    cargo: z.string().trim().min(1).max(2000),
    estimate: z
      .object({
        weightKg: z.number().nonnegative(),
        category: z.enum(['general', 'textile', 'fragile', 'electronics']),
        route: z.enum(['kz', 'ru']),
        low: z.number(),
        high: z.number(),
        weeks: z.tuple([z.number(), z.number()]),
      })
      .optional(),
  }),
});

/** Trimmed, non-sensitive view returned to the tracking screen. */
function publicView(o: Order) {
  return {
    id: o.id,
    status: o.status,
    statusLabel: statusDef(o.status).label,
    statusClient: statusDef(o.status).client,
    name: o.name,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
    history: o.history,
    estimate: o.estimate,
  };
}

export async function startServer(): Promise<void> {
  const app = Fastify({ logger: false });

  // Permissive CORS — the mini-app may be served from a different origin in dev.
  app.addHook('onRequest', async (req, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, X-Telegram-Init-Data');
    if (req.method === 'OPTIONS') reply.code(204).send();
  });

  app.get('/api/health', async () => ({ ok: true }));

  // ── Lead intake ──────────────────────────────────────────────────────────
  app.post('/api/lead', async (req, reply) => {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: 'invalid_payload', details: parsed.error.flatten() });
    }
    const { initData, lead } = parsed.data;
    const auth = validateInitData(initData);
    if (!auth.ok) return reply.code(401).send({ error: 'bad_init_data' });

    const order = createOrder(
      { ...lead, email: lead.email || undefined },
      { userId: auth.user?.id, username: auth.user?.username },
    );

    try {
      await sendLeadToManagers(order);
    } catch (e) {
      req.log.error(e);
      // The order is saved; surface a soft warning but still return success.
      return reply.send({ id: order.id, delivered: false });
    }
    return reply.send({ id: order.id, delivered: true });
  });

  // ── Tracking ───────────────────────────────────────────────────────────────
  app.get('/api/track', async (req, reply) => {
    const initData = (req.headers['x-telegram-init-data'] as string) || '';
    if (!validateInitData(initData).ok) return reply.code(401).send({ error: 'bad_init_data' });

    const q = req.query as { id?: string; phone?: string };
    if (q.id) {
      const o = getOrder(q.id);
      return o ? { orders: [publicView(o)] } : reply.code(404).send({ error: 'not_found' });
    }
    if (q.phone) {
      return { orders: findByPhone(q.phone).slice(0, 10).map(publicView) };
    }
    return reply.code(400).send({ error: 'missing_query' });
  });

  // ── Static mini-app (production) ───────────────────────────────────────────
  if (existsSync(MINIAPP_DIST)) {
    await app.register(fastifyStatic, { root: MINIAPP_DIST });
    // SPA fallback for client-side routing.
    app.setNotFoundHandler((req, reply) => {
      if (req.url.startsWith('/api')) return reply.code(404).send({ error: 'not_found' });
      return reply.sendFile('index.html');
    });
  }

  await app.listen({ host: '0.0.0.0', port: config.port });
  console.log(`✓ API listening on http://0.0.0.0:${config.port}`);
  if (!existsSync(MINIAPP_DIST)) {
    console.log('  (mini-app dist not found — build it with `npm run build` in miniapp/)');
  }
}
