'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-bold md:text-5xl">Something went wrong</h1>
      <p className="mt-4 max-w-md opacity-75">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center rounded-md bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-85"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-current px-6 py-3 font-medium transition-opacity hover:opacity-75"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
