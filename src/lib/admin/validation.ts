import 'server-only';
import { z } from 'zod';
import {
  GALLERY_CATEGORIES,
  RENTAL_IMAGE_KINDS,
  RENTAL_STATUSES,
  RENTAL_TYPES,
} from '@/lib/content/options';
import type { FormState } from './form-state';

const blankToNull = (value: unknown) =>
  value === undefined || (typeof value === 'string' && value.trim() === '') ? null : value;

const toNumberOrNull = (value: unknown) => {
  const v = blankToNull(value);
  return v === null ? null : Number(v);
};

const optionalText = (max: number) =>
  z.preprocess(blankToNull, z.string().trim().max(max, `Keep this under ${max} characters`).nullable());

const optionalWholeNumber = (max: number) =>
  z.preprocess(
    toNumberOrNull,
    z.number({ error: 'Enter a number' }).int('Use a whole number').min(0).max(max).nullable(),
  );

const checkbox = z.preprocess((value) => value === 'on', z.boolean());

const altText = z
  .string()
  .trim()
  .min(1, 'Describe the photo so it can appear on the site')
  .max(250, 'Keep this under 250 characters');

export const idSchema = z.coerce.number().int().positive();
export const directionSchema = z.enum(['up', 'down']);

export const rentalSchema = z.object({
  address: z.string().trim().min(1, 'Address is required').max(120),
  city: z.string().trim().min(1, 'City is required').max(60),
  community: optionalText(80),
  type: z.enum(RENTAL_TYPES),
  status: z.enum(RENTAL_STATUSES),
  rent: optionalWholeNumber(100_000),
  bedrooms: optionalWholeNumber(20),
  bathrooms: z.preprocess(
    toNumberOrNull,
    z.number({ error: 'Enter a number' }).min(0).max(20).multipleOf(0.5, 'Use whole or half baths').nullable(),
  ),
  sqft: optionalWholeNumber(100_000),
  availableOn: z.preprocess(blankToNull, z.iso.date({ error: 'Use a valid date' }).nullable()),
  description: optionalText(4000),
  published: checkbox,
});

export const rentalImageSchema = z.object({
  alt: altText,
  kind: z.enum(RENTAL_IMAGE_KINDS),
});

export const galleryImageSchema = z.object({
  alt: altText,
  category: z.enum(GALLERY_CATEGORIES),
});

export const uploadedImagesSchema = z
  .array(
    z.object({
      url: z.string().min(1).max(1000),
      pathname: z.string().min(1).max(500),
      width: z.number().int().positive().max(20_000).nullable(),
      height: z.number().int().positive().max(20_000).nullable(),
    }),
  )
  .min(1)
  .max(50);

function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData) {
    if (typeof value === 'string' && !key.startsWith('$ACTION')) values[key] = value;
  }
  return values;
}

export function invalid(error: z.ZodError, formData: FormData): FormState {
  return {
    status: 'error',
    message: 'Please fix the highlighted fields.',
    fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[] | undefined>,
    values: formValues(formData),
  };
}
