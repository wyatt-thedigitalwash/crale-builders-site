import 'server-only';
import { createDatabase, type Database } from './client';

// Kept on globalThis so dev hot reloads reuse one connection (PGlite locks its data dir).
const globalForDb = globalThis as typeof globalThis & { craleDb?: Promise<Database> };

export function getDb(): Promise<Database> {
  globalForDb.craleDb ??= createDatabase()
    .then((connection) => connection.db)
    .catch((error) => {
      globalForDb.craleDb = undefined;
      throw error;
    });
  return globalForDb.craleDb;
}
