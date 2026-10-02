'use client';

import { useActionState, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SubmitButton } from '@/components/admin/buttons';
import { FormMessage, TextField } from '@/components/admin/fields';
import { buttonPrimary, inputClass, labelClass } from '@/components/admin/ui';
import type { LoginState, PasswordLoginState } from '@/lib/admin/form-state';
import { requestSignInLink, signInWithPasswordAction } from './actions';

const initialState: LoginState = { status: 'idle' };
const initialPasswordState: PasswordLoginState = { status: 'idle' };

/** Password input with a show/hide toggle inside the field. */
function PasswordField({ error }: { error?: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor="password" className={labelClass}>
        Password
        <span aria-hidden="true" className="text-red-700">
          {' '}*
        </span>
      </label>
      <div className="relative mt-1">
        <input
          id="password"
          name="password"
          type={visible ? 'text' : 'password'}
          autoComplete="current-password"
          required
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'password-error' : undefined}
          className={`${inputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          aria-controls="password"
          className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-[4px] text-zinc-600 transition-colors hover:text-crale-green focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-crale-green"
        >
          {visible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
        </button>
      </div>
      {error && (
        <p id="password-error" className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordForm() {
  const [state, formAction] = useActionState(signInWithPasswordAction, initialPasswordState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <TextField
        key={state.email}
        label="Email address"
        name="email"
        id="password-email"
        type="email"
        autoComplete="email"
        defaultValue={state.email}
        required
      />
      <PasswordField error={state.status === 'error' ? state.message : undefined} />
      <SubmitButton pendingLabel="Signing in..." className={`${buttonPrimary} min-h-12 w-full text-[15px]`}>
        Sign in
      </SubmitButton>
    </form>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(requestSignInLink, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={state.status === 'error' ? state.message : undefined}
      />
      <SubmitButton pendingLabel="Sending link...">Email me a sign-in link</SubmitButton>
      {state.status === 'sent' && <FormMessage status="sent" message={state.message} />}
      {state.devLink && (
        <p className="rounded-md bg-zinc-100 p-3 text-sm">
          Local development only (no email service set up):{' '}
          <a href={state.devLink} className="font-semibold text-crale-green underline">
            open the sign-in link
          </a>
        </p>
      )}
    </form>
  );
}
