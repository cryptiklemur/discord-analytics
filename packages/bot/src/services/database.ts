import {eq} from 'drizzle-orm';
import {db, discordEvents, servers, type NewDiscordEvent} from '../db/index.js';
import type {BaseEvent} from '../types/events.js';
import {createLogger} from '../utils/logger.js';
import type {SQLWrapper} from "drizzle-orm";

const logger = createLogger('DatabaseService');

export interface DatabaseService {
	insertEvents(events: BaseEvent[]): Promise<void>;

	checkServerExists(serverId: string): Promise<boolean>;

	createServer(serverId: string, serverName: string, ownerId: string): Promise<void>;

	executeRawSQL(sql: SQLWrapper, params?: any[]): Promise<any[]>;
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
			logger.debug({count: events.length}, 'Events inserted successfully');
		} catch (error) {
			logger.error({error}, 'Failed to insert events');
			throw new Error(`Failed to insert events: ${error}`);
		}

	}

	async checkServerExists(serverId: string): Promise<boolean> {
		try {
			const result = await db
				.select({id: servers.id})
				.from(servers)
				.where(eq(servers.id as any, serverId) as any)
				.limit(1);

			const exists = result.length > 0;
			logger.debug({serverId, exists}, 'Checked server existence');
			return exists;
		} catch (error) {
			logger.error({error, serverId}, 'Failed to check server existence');
			throw new Error(`Failed to check server existence: ${error}`);
		}
	}

	async createServer(serverId: string, serverName: string, ownerId: string): Promise<void> {
		try {
			await db.insert(servers).values({
				id: serverId,
				name: serverName,
				ownerId: ownerId,
			});
			logger.info({serverId, serverName}, 'Server created successfully');
		} catch (error) {
			logger.error({error, serverId}, 'Failed to create server');
			throw new Error(`Failed to create server: ${error}`);
		}
	}

	async executeRawSQL(sql: SQLWrapper): Promise<any[]> {
		try {
			const result = await db.execute(sql as any);
			return result;
		} catch (error) {
			logger.error({error, sql}, 'Failed to execute raw SQL');
			throw error;
		}
	}
}

export {DrizzleService as SupabaseService};
