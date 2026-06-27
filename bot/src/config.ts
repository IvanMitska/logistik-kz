// Runtime config, read from env (loaded via `node --env-file=.env`).

function required(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`✗ Missing required env var: ${name} (see bot/.env.example)`);
    process.exit(1);
  }
  return v;
}

export const config = {
  botToken: required('BOT_TOKEN'),
  managersChatId: required('MANAGERS_CHAT_ID'),
  miniappUrl: process.env.MINIAPP_URL || '',
  port: Number(process.env.PORT || 8787),
  publicUrl: (process.env.PUBLIC_URL || '').replace(/\/$/, ''),
  dataDir: process.env.DATA_DIR || './data',
  logUpdates: process.env.LOG_UPDATES === '1',
} as const;
