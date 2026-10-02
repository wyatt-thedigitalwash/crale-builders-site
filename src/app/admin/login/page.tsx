import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/site/logo';
import { LoginForm, PasswordForm } from './login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to the Crale Builders website portal.',
};

type Props = { searchParams: Promise<{ error?: string }> };

export default function LoginPage({ searchParams }: Props) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-seawall px-4 py-12">
      <div className="w-full max-w-[26rem]">
        <Link href="/" className="mx-auto block w-fit rounded-[2px]">
          <Logo alt="Crale Builders home" preload className="h-14 w-auto" />
        </Link>

        <div className="mt-8 rounded-[4px] bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,53,38,0.45)] sm:p-8">
          <h1 className="font-display text-[1.75rem] font-[720] leading-tight tracking-[-0.015em] text-ink font-stretch-semi-condensed">
            Admin Website Portal
          </h1>
          <Suspense fallback={null}>
            <ExpiredNotice searchParams={searchParams} />
          </Suspense>
          <PasswordForm />
          <details className="group mt-6 text-sm">
            <summary className="cursor-pointer list-none font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[5px] hover:text-crale-green [&::-webkit-details-marker]:hidden">
              Forgot your password? Email me a sign-in link
            </summary>
            <LoginForm />
          </details>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-ink-soft underline-offset-[5px] hover:text-crale-green hover:underline">
            Back to cralebuilders.com
          </Link>
        </p>
      </div>
    </main>
  );
}

async function ExpiredNotice({ searchParams }: Props) {
  const { error } = await searchParams;
  if (error !== 'expired') return null;
  return (
    <p role="alert" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
      That sign-in link has expired or was already used. Request a new one below.
    </p>
  );
}
