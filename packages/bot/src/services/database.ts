import { eq } from 'drizzle-orm';
import { db, discordEvents, servers, type NewDiscordEvent } from '../db/index.js';
import type { BaseEvent } from '../types/events.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('DatabaseService');

export interface DatabaseService {
  insertEvents(events: BaseEvent[]): Promise<void>;
  checkServerExists(serverId: string): Promise<boolean>;
}

export class DrizzleService implements DatabaseService {
  constructor() {
    logger.info('Drizzle database service initialized');
  }

  async insertEvents(events: BaseEvent[]): Promise<void> {
    try {
      const drizzleEvents: NewDiscordEvent[] = events.map(event => ({
        serverId: event.server_id,
        eventType: event.event_type,
        userId: event.user_id ?? null,
        channelId: event.channel_id ?? null,
        data: event.data,
        createdAt: new Date(event.created_at),
      }));

      await db.insert(discordEvents).values(drizzleEvents);
      logger.debug({ count: events.length }, 'Events inserted successfully');
    } catch (error) {
      logger.error({ error }, 'Failed to insert events');
      throw new Error(`Failed to insert events: ${error}`);
    }
  }

  async checkServerExists(serverId: string): Promise<boolean> {
    try {
      const result = await db
        .select({ id: servers.id })
        .from(servers)
        .where(eq(servers.id as any, serverId) as any)
        .limit(1);

      const exists = result.length > 0;
      logger.debug({ serverId, exists }, 'Checked server existence');
      return exists;
    } catch (error) {
      logger.error({ error, serverId }, 'Failed to check server existence');
      throw new Error(`Failed to check server existence: ${error}`);
    }
  }
}

export { DrizzleService as SupabaseService };
