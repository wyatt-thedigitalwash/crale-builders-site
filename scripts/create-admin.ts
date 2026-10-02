// Creates a portal login, or resets its password if the email already has one.
//   npm run admin:create -- someone@cralebuilders.com
// The password comes from ADMIN_PASSWORD, or is asked for when that is not set, so it never lands in a file.
// Runs against DATABASE_URL when set (Neon), otherwise the local PGlite database. Stop `npm run dev` first
// when using PGlite, since it allows one process at a time.
import { createInterface } from 'node:readline/promises';
import { loadEnvConfig } from '@next/env';
import { createDatabase } from '../src/lib/db/client';
import { adminUsers } from '../src/lib/db/schema';
import { hashPassword } from '../src/lib/auth/passwords';

const MIN_LENGTH = 10;

async function askPassword(): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question('Password: ');
  rl.close();
  return answer;
}

async function main() {
  loadEnvConfig(process.cwd());
  const email = (process.argv[2] ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Usage: npm run admin:create -- name@example.com');

  const password = process.env.ADMIN_PASSWORD ?? (await askPassword());
  if (password.length < MIN_LENGTH) throw new Error(`Use a password of at least ${MIN_LENGTH} characters.`);

  const { db, driver, close } = await createDatabase();
  const passwordHash = await hashPassword(password);
  await db
    .insert(adminUsers)
    .values({ email, passwordHash })
    .onConflictDoUpdate({ target: adminUsers.email, set: { passwordHash, failedAttempts: 0, lockedUntil: null } });
  await close();
  process.stdout.write(`Portal login saved for ${email} (${driver}).\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
