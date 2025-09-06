import type { Config } from 'drizzle-kit';
import 'dotenv/config';

function getConnectionString(): string {
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
  
  throw new Error('Database connection string not configured');
}

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: getConnectionString(),
  },
  verbose: true,
  strict: true,
} satisfies Config;