'use client';

import Image from 'next/image';
import { useActionState, useId } from 'react';
import { SubmitButton } from '@/components/admin/buttons';
import { FormMessage, SelectField, TextareaField } from '@/components/admin/fields';
import { ImageOrderControls } from '@/components/admin/image-order-controls';
import { buttonSecondary } from '@/components/admin/ui';
import { IDLE_FORM, type FormState } from '@/lib/admin/form-state';
import { RENTAL_IMAGE_KINDS, RENTAL_IMAGE_KIND_LABELS } from '@/lib/content/options';
import type { RentalImage } from '@/lib/db/schema';

type Props = {
  image: Pick<RentalImage, 'url' | 'alt' | 'kind'>;
  update: (prev: FormState, formData: FormData) => Promise<FormState>;
  moveUp: () => Promise<void>;
  moveDown: () => Promise<void>;
  remove: () => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
};

export function RentalImageCard({ image, update, moveUp, moveDown, remove, isFirst, isLast }: Props) {
  const id = useId();
  const [state, formAction] = useActionState(update, IDLE_FORM);
  const alt = state.values?.alt ?? image.alt;

  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-zinc-200 p-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded bg-zinc-100">
        <Image
          src={image.url}
          alt={image.alt || 'Photo without a description'}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          className={image.kind === 'floor_plan' ? 'object-contain' : 'object-cover'}
        />
        {!image.alt && (
          <span className="absolute left-2 top-2 rounded bg-amber-400 px-2 py-0.5 text-xs font-semibold text-amber-950">
            Needs description
          </span>
        )}
      </div>

      <form action={formAction} className="space-y-3">
        <TextareaField
          id={`${id}-alt`}
          label="Photo description"
          name="alt"
          rows={2}
          required
          defaultValue={alt}
          error={state.fieldErrors?.alt?.[0]}
          hint="What does the photo show? Example: Kitchen with white cabinets and a breakfast bar."
        />
        <SelectField
          id={`${id}-kind`}
          label="Type"
          name="kind"
          options={RENTAL_IMAGE_KINDS.map((kind) => ({ value: kind, label: RENTAL_IMAGE_KIND_LABELS[kind] }))}
          defaultValue={state.values?.kind ?? image.kind}
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
