'use client';

import { useState, type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { buttonDanger, buttonPrimary, buttonSecondary } from './ui';

export function SubmitButton({
  children,
  pendingLabel = 'Saving...',
  className = buttonPrimary,
  ...rest
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
  'aria-label'?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className} {...rest}>
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Two-step delete so a stray tap cannot remove anything. */
export function ConfirmButton({
  action,
  label,
  prompt,
  confirmLabel,
}: {
  action: () => Promise<void>;
  label: string;
  prompt: string;
  confirmLabel: string;
}) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className={`${buttonSecondary} text-red-700`}>
        {label}
      </button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <span role="alert" className="text-sm text-zinc-800">
        {prompt}
      </span>
      <SubmitButton className={buttonDanger} pendingLabel="Deleting...">
        {confirmLabel}
      </SubmitButton>
      <button type="button" onClick={() => setConfirming(false)} className={buttonSecondary}>
        Cancel
      </button>
    </form>
  );
}
