import 'server-only';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { hashPassword, verifyPassword } from './passwords';
import { createSession } from './session';
import { normalizeEmail } from './tokens';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

// Compared against when the email has no account, so a wrong email takes as long as a wrong password.
const decoyHash = hashPassword('decoy-password-for-timing');

export type PasswordLoginResult = 'ok' | 'invalid' | 'locked';

/** Checks an email and password, tracks failed attempts, and starts a session on success. */
export async function signInWithPassword(rawEmail: string, password: string): Promise<PasswordLoginResult> {
  const email = normalizeEmail(rawEmail);
  const db = await getDb();
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);

  if (!user) {
    await verifyPassword(password, await decoyHash);
    return 'invalid';
  }
  if (user.lockedUntil && user.lockedUntil > new Date()) return 'locked';

  if (!(await verifyPassword(password, user.passwordHash))) {
    const failedAttempts = user.failedAttempts + 1;
    const locked = failedAttempts >= MAX_FAILED_ATTEMPTS;
    await db
      .update(adminUsers)
      .set({ failedAttempts: locked ? 0 : failedAttempts, lockedUntil: locked ? new Date(Date.now() + LOCK_MS) : null })
      .where(eq(adminUsers.email, email));
    return locked ? 'locked' : 'invalid';
  }

  await db.update(adminUsers).set({ failedAttempts: 0, lockedUntil: null }).where(eq(adminUsers.email, email));
  await createSession(email);
  return 'ok';
}
