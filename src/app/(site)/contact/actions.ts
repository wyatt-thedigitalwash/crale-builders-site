'use server';

import { Resend } from 'resend';
import { BUSINESS } from '@/lib/site/business';
import { contactSchema, type ContactState } from '@/lib/site/contact-schema';
import { allowRequest, clientIp } from '@/lib/rate-limit';

const FALLBACK = `Something went wrong sending your note. Please call ${BUSINESS.phone.display} and we will pick it up from there.`;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

/**
 * Sends a contact message to the office. Validation runs here, on the server, whatever the browser did.
 * The form asks for nothing sensitive: name, email, phone, and what the project is.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    interest: String(formData.get('interest') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer as though it sent, so the bot has nothing to learn.
  if (String(formData.get('company') ?? '').trim() !== '') {
    return { status: 'sent' };
  }

  // Three messages per visitor every five minutes. Server Actions cannot set an HTTP status, so the
  // limit comes back as a form error (the equivalent of a 429).
  if (!allowRequest(`contact:${await clientIp()}`, 3, 5 * 60 * 1000)) {
    return {
      status: 'error',
      message: `You have sent a few notes in a row. Please wait a few minutes, or call ${BUSINESS.phone.display}.`,
      values,
    };
  }

  const parsed = contactSchema.safeParse({ ...values, phone: values.phone || undefined });
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const { name, email, phone, interest, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  // Every website message goes to the office inbox. Fixed here rather than read from an environment
  // variable, so a blank or stale setting can never send messages somewhere else.
  const to = BUSINESS.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `About: ${interest}`,
    '',
    message,
  ].filter((line) => line !== null);

  if (!apiKey || !from) {
    // Local development without an email service: the note is validated but not sent.
    if (process.env.NODE_ENV === 'development') return { status: 'sent' };
    console.error('Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is not set');
    return { status: 'error', message: FALLBACK, values };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Website message: ${interest}`,
      text: lines.join('\n'),
      html: lines.map((line) => `<p>${escapeHtml(line)}</p>`).join(''),
    });
    if (error) {
      console.error('Contact form: Resend rejected the message', error.name);
      return { status: 'error', message: FALLBACK, values };
    }
  } catch (error) {
    console.error('Contact form: sending failed', error instanceof Error ? error.message : error);
    return { status: 'error', message: FALLBACK, values };
  }

  return { status: 'sent' };
}
