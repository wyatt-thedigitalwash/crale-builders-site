// Shared by the contact form and the Server Action that handles it.
// Safe to import from client components: no secrets, no server-only imports.
import { z } from 'zod';

export const PROJECT_INTERESTS = [
  'New home',
  'Indian Lake home',
  'Remodel or addition',
  'Commercial building',
  'Rental question',
  'Something else',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Tell us your name.').max(100, 'That name is too long.'),
  email: z.string().trim().email('Enter an email address we can reply to.').max(200),
  phone: z.string().trim().max(40, 'That phone number is too long.').optional(),
  interest: z.enum(PROJECT_INTERESTS, { message: 'Choose what this is about.' }),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little about the project.')
    .max(2000, 'Please keep it under 2000 characters.'),
});

export type ContactValues = z.infer<typeof contactSchema>;

export type ContactState = {
  status: 'idle' | 'sent' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactValues, string[]>>;
  /** Submitted values, so a failed send does not wipe what was typed. */
  values?: Record<string, string>;
};

export const IDLE_CONTACT: ContactState = { status: 'idle' };
