// grammY bot: onboarding (/start opens the mini-app), and the managers'
// status-change controls. Lead intake itself happens over HTTP (see server.ts);
// this module owns all outgoing Telegram messaging.

import { Bot, InlineKeyboard, GrammyError } from 'grammy';
import { config } from './config.ts';
import { getOrder, setStatus } from './db.ts';
import { managerMessage, statusKeyboard, clientPush } from './format.ts';
import { statusDef } from '../../shared/statuses.ts';
import type { Order } from '../../shared/types.ts';

export const bot = new Bot(config.botToken);

const openAppKeyboard = () =>
  config.miniappUrl
    ? new InlineKeyboard().webApp('🚀 Открыть приложение', config.miniappUrl)
    : undefined;

if (config.logUpdates) {
  bot.use(async (ctx, next) => {
    console.log('update from chat:', ctx.chat?.id, ctx.chat?.type, '|', ctx.msg?.text ?? '');
    await next();
  });
}

bot.command('start', async (ctx) => {
  await ctx.reply(
    'Здравствуйте! Это <b>logistics.kaz</b> — белая доставка из Китая в Казахстан и Россию.\n\n' +
      'В приложении можно рассчитать стоимость, оставить заявку и отслеживать заказ.',
    { parse_mode: 'HTML', reply_markup: openAppKeyboard() },
  );
});

bot.command('track', async (ctx) => {
  const id = ctx.match?.trim().toUpperCase();
  if (!id) {
    await ctx.reply('Укажите номер заказа: /track LK-XXXXX');
    return;
  }
  const o = getOrder(id);
  if (!o) {
    await ctx.reply('Заказ не найден. Проверьте номер.');
    return;
  }
  const st = statusDef(o.status);
  await ctx.reply(`${st.emoji} Заказ <b>${o.id}</b>\n${st.client}`, { parse_mode: 'HTML' });
});

// Manager taps a status button → advance the order, refresh the message,
// and push the client.
bot.callbackQuery(/^st:(LK-[A-Z0-9]+):([a-z]+)$/, async (ctx) => {
  const [, id, status] = ctx.match;
  if (!id || !status) return;
  const order = setStatus(id, status as Order['status']);
  if (!order) {
    await ctx.answerCallbackQuery({ text: 'Заказ не найден', show_alert: true });
    return;
  }
  await ctx.answerCallbackQuery({ text: `Статус: ${statusDef(order.status).label}` });
  try {
    await ctx.editMessageText(managerMessage(order), {
      parse_mode: 'HTML',
      reply_markup: statusKeyboard(order),
    });
  } catch (e) {
    // ignore "message is not modified"
    if (!(e instanceof GrammyError && e.description.includes('not modified'))) throw e;
  }
  await notifyClient(order);
});

/** Post a freshly-created lead to the managers chat with status controls. */
export async function sendLeadToManagers(order: Order): Promise<void> {
  await bot.api.sendMessage(config.managersChatId, managerMessage(order), {
    parse_mode: 'HTML',
    reply_markup: statusKeyboard(order),
  });
}

/** Notify the client (if we know their Telegram id) about a status change. */
export async function notifyClient(order: Order): Promise<void> {
  if (!order.tgUserId) return;
  try {
    await bot.api.sendMessage(order.tgUserId, clientPush(order), { parse_mode: 'HTML' });
  } catch (e) {
    // Client may have never opened a DM with the bot — non-fatal.
    console.warn(`Could not notify client ${order.tgUserId}:`, e instanceof Error ? e.message : e);
  }
}

/** One-time setup: menu button that opens the mini-app, and bot commands. */
export async function configureBot(): Promise<void> {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Открыть приложение' },
    { command: 'track', description: 'Статус заказа: /track LK-XXXXX' },
  ]);
  if (config.miniappUrl) {
    await bot.api.setChatMenuButton({
      menu_button: { type: 'web_app', text: 'Приложение', web_app: { url: config.miniappUrl } },
    });
  }
}
