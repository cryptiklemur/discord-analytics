import { createDb } from '@discord-analytics/shared';

// Create database instance for the site
// This will be used for reading analytics data and user management
export const db = createDb();

// Re-export all database types and utilities from shared
export * from '@discord-analytics/shared';