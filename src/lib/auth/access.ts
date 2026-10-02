import 'server-only';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { isAdminEmail, normalizeEmail } from './tokens';

/**
 * Portal access: listed in ADMIN_EMAILS, or has a password account in admin_users.
 * Deleting the account (and removing the email from ADMIN_EMAILS) revokes access on the next request.
 */
export async function hasPortalAccess(rawEmail: string): Promise<boolean> {
  if (isAdminEmail(rawEmail)) return true;
  const db = await getDb();
  const [user] = await db
    .select({ email: adminUsers.email })
    .from(adminUsers)
    .where(eq(adminUsers.email, normalizeEmail(rawEmail)))
    .limit(1);
  return Boolean(user);
}
