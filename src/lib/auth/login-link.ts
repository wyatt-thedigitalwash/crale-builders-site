import 'server-only';
import { and, count, eq, gt, isNull } from 'drizzle-orm';
import { Resend } from 'resend';
import { getDb } from '@/lib/db';
import { loginTokens } from '@/lib/db/schema';
import { getSiteUrl } from '@/lib/site-url';
import { createSession } from './session';
import { hasPortalAccess } from './access';
import { createToken, hashToken, normalizeEmail } from './tokens';

const LINK_TTL_MS = 15 * 60 * 1000;
const MAX_LINKS_PER_WINDOW = 5;

export type LinkRequestResult = { devLink?: string };

/**
 * Emails a one-time sign-in link to allowed admins. Callers show the same
 * message whether or not the email is allowed, so the allowlist is not revealed.
 */
export async function requestLoginLink(rawEmail: string): Promise<LinkRequestResult> {
  const email = normalizeEmail(rawEmail);
  if (!(await hasPortalAccess(email))) return {};

  const db = await getDb();
  const [{ recent }] = await db
    .select({ recent: count() })
    .from(loginTokens)
    .where(and(eq(loginTokens.email, email), gt(loginTokens.createdAt, new Date(Date.now() - LINK_TTL_MS))));
  if (recent >= MAX_LINKS_PER_WINDOW) return {};

  const token = createToken();
  await db.insert(loginTokens).values({
    tokenHash: hashToken(token),
    email,
    expiresAt: new Date(Date.now() + LINK_TTL_MS),
  });

  const link = `${getSiteUrl()}/admin/verify?token=${token}`;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') return { devLink: link };
    throw new Error('RESEND_API_KEY is not set.');
  }

  const from = process.env.AUTH_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;
  if (!from) throw new Error('AUTH_FROM_EMAIL is not set.');

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: email,
    subject: 'Your Crale Builders portal sign-in link',
    text: `Use this link to sign in to the Crale Builders website portal:\n\n${link}\n\nThe link works once and expires in 15 minutes. If you did not request it, you can ignore this email.`,
    html: `<p>Use the button below to sign in to the Crale Builders website portal.</p>
<p><a href="${link}" style="display:inline-block;padding:12px 20px;background:#1f5130;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600">Sign in to the portal</a></p>
<p style="color:#555">The link works once and expires in 15 minutes. If you did not request it, you can ignore this email.</p>`,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);

  return {};
}

/** Marks the token used (atomically) and starts a session. */
export async function consumeLoginToken(token: string): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .update(loginTokens)
    .set({ usedAt: new Date() })
    .where(
      and(
        eq(loginTokens.tokenHash, hashToken(token)),
        isNull(loginTokens.usedAt),
        gt(loginTokens.expiresAt, new Date()),
      ),
    )
    .returning({ email: loginTokens.email });

  if (!row || !(await hasPortalAccess(row.email))) return false;
  await createSession(row.email);
  return true;
}
