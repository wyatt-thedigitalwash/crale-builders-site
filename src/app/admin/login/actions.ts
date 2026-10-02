'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { LoginState, PasswordLoginState } from '@/lib/admin/form-state';
import { requestLoginLink } from '@/lib/auth/login-link';
import { signInWithPassword } from '@/lib/auth/password-login';
import { allowRequest, clientIp } from '@/lib/rate-limit';

const TOO_MANY = 'Too many sign-in attempts from this connection. Wait a few minutes and try again.';

export async function requestSignInLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!allowRequest(`login-link:${await clientIp()}`, 5, 5 * 60 * 1000)) return { status: 'error', message: TOO_MANY };
  const parsed = z.email().max(254).safeParse(String(formData.get('email') ?? '').trim());
  if (!parsed.success) return { status: 'error', message: 'Enter a valid email address.' };

  try {
    const { devLink } = await requestLoginLink(parsed.data);
    return {
      status: 'sent',
      message: 'If that email has portal access, a sign-in link is on its way. It expires in 15 minutes.',
      devLink,
    };
  } catch {
    return { status: 'error', message: 'We could not send the email right now. Please try again in a few minutes.' };
  }
}

const passwordLogin = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(200),
});

export async function signInWithPasswordAction(
  _prev: PasswordLoginState,
  formData: FormData,
): Promise<PasswordLoginState> {
  const email = String(formData.get('email') ?? '').trim();
  // Per connection, on top of the per-account lockout in signInWithPassword.
  if (!allowRequest(`login:${await clientIp()}`, 10, 5 * 60 * 1000)) return { status: 'error', message: TOO_MANY, email };
  const parsed = passwordLogin.safeParse({ email, password: String(formData.get('password') ?? '') });
  if (!parsed.success) return { status: 'error', message: 'Enter your email address and password.', email };

  const result = await signInWithPassword(parsed.data.email, parsed.data.password);
  if (result === 'locked') {
    return {
      status: 'error',
      message: 'Too many attempts. Wait 15 minutes, or use the sign-in link option below.',
      email,
    };
  }
  if (result === 'invalid') return { status: 'error', message: 'That email and password do not match.', email };

  redirect('/admin');
}
