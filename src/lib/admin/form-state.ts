// Shapes returned by portal Server Actions. Safe to import from client components.

export type FormState = {
  status: 'idle' | 'saved' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Submitted values, so a failed save does not wipe what was typed. */
  values?: Record<string, string>;
};

export const IDLE_FORM: FormState = { status: 'idle' };

export type ActionResult = { ok: boolean; message: string };

export type LoginState = {
  status: 'idle' | 'sent' | 'error';
  message?: string;
  /** Local development only, when no email service is configured. */
  devLink?: string;
};

/** The email comes back on a failed attempt so the form does not wipe it. The password never does. */
export type PasswordLoginState = { status: 'idle' | 'error'; message?: string; email?: string };
