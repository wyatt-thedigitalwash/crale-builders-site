'use client';

import { useActionState } from 'react';
import { submitContact } from '@/app/(site)/contact/actions';
import { buttonPrimary } from '@/components/site/button-styles';
import { BUSINESS } from '@/lib/site/business';
import { IDLE_CONTACT, PROJECT_INTERESTS } from '@/lib/site/contact-schema';

const field =
  'mt-2 w-full rounded-[4px] border border-[#868c88] bg-white px-3 py-2.5 font-body text-[17px] text-ink placeholder:text-ink-soft focus-visible:border-crale-green aria-[invalid=true]:border-[#9b2c2c]';
const label = 'font-display text-[15px] font-semibold text-ink';
const errorText = 'mt-1 font-display text-[14px] text-[#9b2c2c]';

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, IDLE_CONTACT);
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  if (state.status === 'sent') {
    return (
      <div role="status" className="rounded-[4px] bg-seawall p-6 md:p-8">
        <h2 className="font-display text-[1.5rem] font-[720] leading-tight font-stretch-semi-condensed md:text-[1.875rem]">
          Thanks, we have your note.
        </h2>
        <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
          Someone from the office will get back to you. If you need us sooner, call{' '}
          <a
            href={BUSINESS.phone.href}
            className="font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[4px]"
          >
            {BUSINESS.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5">
      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded-[4px] bg-[#fbeaea] px-4 py-3 font-display text-[15px] text-[#9b2c2c]">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className={label}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          required
          aria-required="true"
          autoComplete="name"
          defaultValue={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={field}
        />
        {errors.name && (
          <p id="name-error" className={errorText}>
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={field}
          />
          {errors.email && (
            <p id="email-error" className={errorText}>
              {errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={field}
          />
          {errors.phone && (
            <p id="phone-error" className={errorText}>
              {errors.phone[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={label}>
          What is this about?
        </label>
        <select
          id="interest"
          name="interest"
          required
          aria-required="true"
          defaultValue={values.interest ?? PROJECT_INTERESTS[0]}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? 'interest-error' : undefined}
          className={field}
        >
          {PROJECT_INTERESTS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p id="interest-error" className={errorText}>
            {errors.interest[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Tell us about the project
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          defaultValue={values.message}
          placeholder="The lot, the room, or the building, and roughly when you would like to start."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={field}
        />
        {errors.message && (
          <p id="message-error" className={errorText}>
            {errors.message[0]}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from people, catches bots that fill every field. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <button type="submit" disabled={pending} className={`${buttonPrimary} inline-flex h-12 disabled:opacity-70`}>
          {pending ? 'Sending...' : 'Send your note'}
        </button>
        <p className="font-display text-[15px] text-ink-soft">
          Or call{' '}
          <a
            href={BUSINESS.phone.href}
            className="font-semibold text-ink underline decoration-crale-green decoration-2 underline-offset-[4px]"
          >
            {BUSINESS.phone.display}
          </a>
        </p>
      </div>
    </form>
  );
}
