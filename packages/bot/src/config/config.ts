import 'dotenv/config';
import type {Config} from '../types/config.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Config');

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    logger.fatal({ variable: name }, 'Required environment variable is not set');
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
}

export const config: Config = {
  discord: {
    botToken: getRequiredEnvVar('DISCORD_BOT_TOKEN'),
  },
  supabase: {
    url: getRequiredEnvVar('SUPABASE_URL'),
    serviceKey: getRequiredEnvVar('SUPABASE_SERVICE_KEY'),
  },
  bot: {
    flushIntervalMs: 5000,
    maxQueueSize: 100,
  },
};
