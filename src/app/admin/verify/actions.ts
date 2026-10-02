'use server';

import { redirect } from 'next/navigation';
import { consumeLoginToken } from '@/lib/auth/login-link';

// Sign-in completes on a button press rather than on page load, so email
// link scanners that pre-open links cannot use up the one-time token.
export async function completeSignIn(formData: FormData): Promise<void> {
  const token = formData.get('token');
  const valid = typeof token === 'string' && token.length > 0 && token.length < 200;
  const signedIn = valid && (await consumeLoginToken(token));
  redirect(signedIn ? '/admin' : '/admin/login?error=expired');
}
