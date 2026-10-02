import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const LOCAL_DB_DIR = '.data/pglite';

export type Database = NeonHttpDatabase<typeof schema>;

export type DatabaseConnection = {
  db: Database;
  driver: 'neon' | 'pglite';
  close: () => Promise<void>;
};

/**
 * Neon Postgres when DATABASE_URL is set. Local development without it falls
 * back to PGlite (embedded Postgres in .data/pglite) so the portal runs with
 * no accounts. Both drivers share the same Postgres schema and query API.
 */
export async function createDatabase(): Promise<DatabaseConnection> {
  const url = process.env.DATABASE_URL;

  if (url) {
    const { drizzle } = await import('drizzle-orm/neon-http');
    return { db: drizzle(url, { schema }), driver: 'neon', close: async () => {} };
  }

  if (process.env.VERCEL) {
    throw new Error('DATABASE_URL must be set on Vercel.');
  }

  const { mkdirSync } = await import('node:fs');
  const { PGlite } = await import('@electric-sql/pglite');
  const { drizzle } = await import('drizzle-orm/pglite');
  mkdirSync(LOCAL_DB_DIR, { recursive: true });
  const client = new PGlite(LOCAL_DB_DIR);

  return {
    db: drizzle(client, { schema }) as unknown as Database,
    driver: 'pglite',
    close: () => client.close(),
  };
}
