import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

export function getConnectionString(): string {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  if (supabaseUrl && supabaseKey) {
    const url = new URL(supabaseUrl);
    const projectRef = url.hostname.split('.')[0];
    return `postgresql://postgres.${projectRef}:${supabaseKey}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;
  }
  
  throw new Error('Database connection string not configured. Set DATABASE_URL or SUPABASE_URL/SUPABASE_SERVICE_KEY');
}

export function createDb(connectionString?: string) {
  const connString = connectionString || getConnectionString();
  const queryClient = postgres(connString);
  return drizzle(queryClient, { schema });
}

export * from './schema.js';