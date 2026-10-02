import 'server-only';
import { createHash, randomBytes } from 'node:crypto';

export function createToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Portal access is granted by listing emails in ADMIN_EMAILS (comma-separated). */
export function isAdminEmail(email: string): boolean {
  const allowed = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean);
  return allowed.includes(normalizeEmail(email));
}
