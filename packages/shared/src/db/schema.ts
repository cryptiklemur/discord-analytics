import { pgTable, text, timestamp, jsonb, uuid, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

export const eventTypeEnum = pgEnum('event_type', [
  'message',
  'member_join',
  'member_leave',
  'voice_join',
  'voice_leave',
  'voice_switch',
  'reaction_add'
]);

export const servers = pgTable('servers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: text('owner_id').notNull(),
  addedAt: timestamp('added_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const discordEvents = pgTable('discord_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  serverId: text('server_id').references(() => servers.id),
  eventType: eventTypeEnum('event_type').notNull(),
  userId: text('user_id'),
  channelId: text('channel_id'),
  data: jsonb('data').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  discriminator: text('discriminator'),
  avatarUrl: text('avatar_url'),
  firstSeen: timestamp('first_seen').defaultNow().notNull(),
  lastSeen: timestamp('last_seen').defaultNow().notNull(),
});

export const channels = pgTable('channels', {
  id: text('id').primaryKey(),
  serverId: text('server_id').references(() => servers.id).notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Server = typeof servers.$inferSelect;
export type NewServer = typeof servers.$inferInsert;
export type DiscordEvent = typeof discordEvents.$inferSelect;
export type NewDiscordEvent = typeof discordEvents.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Channel = typeof channels.$inferSelect;
export type NewChannel = typeof channels.$inferInsert;