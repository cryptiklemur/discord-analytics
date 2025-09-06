import type {BaseEvent} from '../types/events.js';
import type {DatabaseService} from './database.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('EventQueue');

export interface EventQueueService {
  queueEvent(event: Omit<BaseEvent, 'created_at'>): void;
  start(): void;
  stop(): Promise<void>;
  flushEvents(): Promise<void>;
}

export class MemoryEventQueue implements EventQueueService {
  private eventQueue: BaseEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private readonly maxQueueSize: number;
  private readonly flushIntervalMs: number;

  constructor(
    private readonly databaseService: DatabaseService,
    config: { maxQueueSize: number; flushIntervalMs: number }
  ) {
    this.maxQueueSize = config.maxQueueSize;
    this.flushIntervalMs = config.flushIntervalMs;
  }

  queueEvent(event: Omit<BaseEvent, 'created_at'>): void {
    const eventWithTimestamp: BaseEvent = {
      ...event,
      created_at: new Date().toISOString(),
    };

    this.eventQueue.push(eventWithTimestamp);

    if (this.eventQueue.length >= this.maxQueueSize) {
      this.flushEvents();
    }
  }

  start(): void {
    this.flushInterval = setInterval(() => {
      this.flushEvents();
    }, this.flushIntervalMs);
  }

  async stop(): Promise<void> {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    await this.flushEvents();
  }

  async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await this.databaseService.insertEvents(events);
      logger.info({ count: events.length }, 'Flushed events to database');
    } catch (error) {
      logger.error({ error, eventCount: events.length }, 'Failed to flush events');
      this.eventQueue.unshift(...events);
    }
  }
}
