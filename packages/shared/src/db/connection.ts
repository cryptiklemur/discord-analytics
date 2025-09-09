import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

export function getConnectionString(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  throw new Error('Database connection string not configured. Set DATABASE_URL or SUPABASE_URL/SUPABASE_SERVICE_KEY');
}

export function createDb(connectionString?: string) {
  const connString = connectionString || getConnectionString();
  const queryClient = postgres(connString);
  return drizzle(queryClient, { schema });
}

export * from './schema.js';
