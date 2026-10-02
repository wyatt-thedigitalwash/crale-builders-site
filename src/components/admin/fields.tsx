import type { ComponentProps } from 'react';
import { inputClass, labelClass } from './ui';

type BaseProps = { label: string; name: string; id?: string; error?: string; hint?: string };
type Option = { value: string; label: string };

function describedBy(id: string, error?: string, hint?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}

function Messages({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-zinc-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </>
  );
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className={labelClass}>
      {label}
      {required && (
        <span aria-hidden="true" className="text-red-700">
          {' '}*
        </span>
      )}
    </label>
  );
}

export function TextField({
  label,
  name,
  id = name,
  error,
  hint,
  className,
  ...input
}: BaseProps & Omit<ComponentProps<'input'>, 'name' | 'id'>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={input.required} />
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-required={input.required ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`mt-1 ${inputClass}`}
        {...input}
      />
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  id = name,
  error,
  hint,
  className,
  ...textarea
}: BaseProps & Omit<ComponentProps<'textarea'>, 'name' | 'id'>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={textarea.required} />
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-required={textarea.required ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`mt-1 ${inputClass}`}
        {...textarea}
      />
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  id = name,
  error,
  hint,
  className,
  options,
  ...select
}: BaseProps & { options: Option[] } & Omit<ComponentProps<'select'>, 'name' | 'id'>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={select.required} />
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-required={select.required ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`mt-1 ${inputClass}`}
        {...select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  id = name,
  hint,
  className,
  ...input
}: Omit<BaseProps, 'error'> & Omit<ComponentProps<'input'>, 'name' | 'id' | 'type'>) {
  return (
    <div className={`flex items-start gap-3 ${className ?? ''}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-0.5 size-5 rounded border-zinc-300 accent-crale-green"
        {...input}
      />
      <div>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <Messages id={id} hint={hint} />
      </div>
    </div>
  );
}

export function FormMessage({ status, message }: { status: 'idle' | 'saved' | 'sent' | 'error'; message?: string }) {
  return (
    <p
      role={status === 'error' ? 'alert' : 'status'}
      className={`text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-crale-green'}`}
    >
      {message}
    </p>
  );
}

export function toOptions<T extends string>(values: readonly T[], labels: Record<T, string>): Option[] {
  return values.map((value) => ({ value, label: labels[value] }));
}
