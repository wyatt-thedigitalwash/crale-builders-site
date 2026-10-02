'use client';

import { StatusPage } from '@/components/site/status-page';
import { buttonLight } from '@/components/site/button-styles';

// Next.js logs the error itself on the server. The visitor only sees a plain message, never details.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <StatusPage
      title="Something went wrong"
      text="This page did not load the way it should. Try again, and if it keeps happening, give the office a call."
      actions={
        <button
          type="button"
          onClick={() => reset()}
          className={`${buttonLight} inline-flex h-12 border border-[#868c88]`}
        >
          Try again
        </button>
      }
    />
  );
}
