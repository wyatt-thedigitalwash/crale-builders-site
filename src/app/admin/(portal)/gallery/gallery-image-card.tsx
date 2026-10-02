'use client';

import Image from 'next/image';
import { useActionState, useId } from 'react';
import { SubmitButton } from '@/components/admin/buttons';
import { FormMessage, SelectField, TextareaField } from '@/components/admin/fields';
import { ImageOrderControls } from '@/components/admin/image-order-controls';
import { buttonSecondary } from '@/components/admin/ui';
import { IDLE_FORM, type FormState } from '@/lib/admin/form-state';
import type { GalleryImage } from '@/lib/db/schema';

type Props = {
  image: Pick<GalleryImage, 'url' | 'alt' | 'category'>;
  categoryOptions: { value: string; label: string }[];
  update: (prev: FormState, formData: FormData) => Promise<FormState>;
  moveUp: () => Promise<void>;
  moveDown: () => Promise<void>;
  remove: () => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
};

export function GalleryImageCard({ image, categoryOptions, update, moveUp, moveDown, remove, isFirst, isLast }: Props) {
  const id = useId();
  const [state, formAction] = useActionState(update, IDLE_FORM);
  const values = state.values;

  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden rounded bg-zinc-100">
        <Image
          src={image.url}
          alt={image.alt || 'Photo without a description'}
          fill
          sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        {!image.alt && (
          <span className="absolute left-2 top-2 bg-amber-400 px-2 py-0.5 text-xs font-semibold text-amber-950">
            Needs description
          </span>
        )}
      </div>

      <form action={formAction} className="space-y-3">
        <TextareaField
          id={`${id}-alt`}
          label="Photo description"
          name="alt"
          rows={3}
          required
          defaultValue={values?.alt ?? image.alt}
          error={state.fieldErrors?.alt?.[0]}
          hint="What does the photo show? Example: Two-story lake home with a covered upper deck."
        />
        <SelectField
          id={`${id}-category`}
          label="Category"
          name="category"
          options={categoryOptions}
          defaultValue={values?.category ?? image.category}
        />
        <div className="flex flex-wrap items-center gap-3">
          <SubmitButton className={buttonSecondary}>Save</SubmitButton>
          {state.status === 'saved' && <FormMessage status="saved" message={state.message} />}
        </div>
      </form>

      <ImageOrderControls moveUp={moveUp} moveDown={moveDown} remove={remove} isFirst={isFirst} isLast={isLast} />
    </article>
  );
}
