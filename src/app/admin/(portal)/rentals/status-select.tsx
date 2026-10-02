'use client';

import { useId } from 'react';
import { useFormStatus } from 'react-dom';
import { inputClass } from '@/components/admin/ui';
import { RENTAL_STATUSES, RENTAL_STATUS_LABELS, type RentalStatus } from '@/lib/content/options';

type Props = { action: (formData: FormData) => Promise<void>; status: RentalStatus; label: string };

/** Saves as soon as a new status is picked. Keyed on status so it resets after the save. */
export function StatusSelect({ action, status, label }: Props) {
  return (
    <form action={action} key={status}>
      <StatusInput status={status} label={label} />
    </form>
  );
}

function StatusInput({ status, label }: { status: RentalStatus; label: string }) {
  const id = useId();
  const { pending } = useFormStatus();

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name="status"
        defaultValue={status}
        disabled={pending}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className={`${inputClass} w-52`}
      >
        {RENTAL_STATUSES.map((value) => (
          <option key={value} value={value}>
            {RENTAL_STATUS_LABELS[value]}
          </option>
        ))}
      </select>
    </>
  );
}
