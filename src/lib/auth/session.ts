import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { and, eq, gt } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { adminSessions } from '@/lib/db/schema';
import { hasPortalAccess } from './access';
import { createToken, hashToken } from './tokens';

const SESSION_COOKIE = 'crale_portal_session';
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

export type Admin = { email: string };

export async function createSession(email: string): Promise<void> {
  const token = createToken();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);
  const db = await getDb();
  await db.insert(adminSessions).values({ idHash: hashToken(token), email, expiresAt });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

/**
 * The signed-in admin for this request, or null.
 * Not wrapped in React cache(): sharing a cookies() read between a Server
 * Action and the re-render that follows it trips a Next.js invariant.
 */
export async function getAdmin(): Promise<Admin | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = await getDb();
  const [session] = await db
    .select({ email: adminSessions.email })
    .from(adminSessions)
    .where(and(eq(adminSessions.idHash, hashToken(token)), gt(adminSessions.expiresAt, new Date())))
    .limit(1);

  // Losing access (ADMIN_EMAILS or the password account) ends the session on the next request.
  if (!session || !(await hasPortalAccess(session.email))) return null;
  return { email: session.email };
}

/** Call at the top of every portal page, Server Action, and Route Handler. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return admin;
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.delete(adminSessions).where(eq(adminSessions.idHash, hashToken(token)));
  }
  store.delete(SESSION_COOKIE);
}
