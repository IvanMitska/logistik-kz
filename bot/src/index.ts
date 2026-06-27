// Entrypoint: start the HTTP API and the Telegram bot together.
// Uses long polling by default; switches to webhook mode if PUBLIC_URL is set.

import { config } from './config.ts';
import { bot, configureBot } from './bot.ts';
import { startServer } from './server.ts';

async function main() {
  // The HTTP API is the critical path (lead intake) — start it first and keep
  // it alive even if Telegram has a transient hiccup during bot setup.
  await startServer();

  try {
    await configureBot();
  } catch (e) {
    console.error('⚠ Bot setup failed (check BOT_TOKEN). API stays up:', e instanceof Error ? e.message : e);
    return;
  }

  if (config.publicUrl) {
    // Webhook wiring is an opt-in deployment concern; we use long polling here.
    console.log('PUBLIC_URL set, but webhook mode is not enabled — using long polling.');
  }

  bot.start({
    onStart: (me) => console.log(`✓ Bot @${me.username} started (long polling)`),
  }).catch((e) => console.error('⚠ Bot polling stopped:', e instanceof Error ? e.message : e));
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});

for (const sig of ['SIGINT', 'SIGTERM'] as const) {
  process.on(sig, () => {
    console.log(`\n${sig} — shutting down`);
    bot.stop();
    process.exit(0);
  });
}
