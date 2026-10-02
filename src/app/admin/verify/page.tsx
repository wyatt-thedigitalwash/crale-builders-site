import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { SubmitButton } from '@/components/admin/buttons';
import { cardClass } from '@/components/admin/ui';
import { completeSignIn } from './actions';

export const metadata: Metadata = {
  title: 'Finish Signing In',
  description: 'Finish signing in to the Crale Builders website portal.',
};

type Props = { searchParams: Promise<{ token?: string }> };

export default function VerifyPage({ searchParams }: Props) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className={`w-full max-w-md ${cardClass}`}>
        <h1 className="text-2xl font-bold">Finish signing in</h1>
        <Suspense fallback={<p className="mt-4 text-zinc-600">Loading...</p>}>
          <VerifyForm searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function VerifyForm({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <p className="mt-4 text-zinc-700">
        This link is missing its sign-in code.{' '}
        <Link href="/admin/login" className="font-semibold text-crale-green underline">
          Request a new link
        </Link>
        .
      </p>
    );
  }

  return (
    <form action={completeSignIn} className="mt-4 space-y-4">
      <p className="text-zinc-700">Press the button to sign in to the Crale Builders website portal.</p>
      <input type="hidden" name="token" value={token} />
      <SubmitButton pendingLabel="Signing in...">Sign in to the portal</SubmitButton>
    </form>
  );
}
