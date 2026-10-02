// Applies SQL migrations from ./drizzle. Usage: npm run db:migrate
import { loadEnvConfig } from '@next/env';
import { createDatabase } from '../src/lib/db/client';

async function main() {
  loadEnvConfig(process.cwd());
  const { db, driver, close } = await createDatabase();

  if (driver === 'neon') {
    const { migrate } = await import('drizzle-orm/neon-http/migrator');
    await migrate(db, { migrationsFolder: 'drizzle' });
  } else {
    const { migrate } = await import('drizzle-orm/pglite/migrator');
    await migrate(db as unknown as Parameters<typeof migrate>[0], { migrationsFolder: 'drizzle' });
  }

  await close();
  process.stdout.write(`Migrations applied (${driver}).\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});
