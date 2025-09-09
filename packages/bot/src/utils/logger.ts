import pino from 'pino';
import path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment
    ? {
        targets: [
          {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'yyyy-mm-dd HH:MM:ss',
              ignore: 'pid,hostname',
            },
          },
          {
            target: 'pino/file',
            options: {
              destination: path.join(process.cwd(), 'logs', 'bot.log'),
              mkdir: true,
            },
          },
        ],
      }
    : {
        target: 'pino/file',
        options: {
          destination: path.join(process.cwd(), 'logs', 'bot.log'),
          mkdir: true,
        },
      },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export const createLogger = (name: string) => logger.child({ module: name });