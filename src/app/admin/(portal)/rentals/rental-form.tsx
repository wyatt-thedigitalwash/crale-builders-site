'use client';

import { useActionState } from 'react';
import { SubmitButton } from '@/components/admin/buttons';
import {
  CheckboxField,
  FormMessage,
  SelectField,
  TextareaField,
  TextField,
  toOptions,
} from '@/components/admin/fields';
import { IDLE_FORM, type FormState } from '@/lib/admin/form-state';
import {
  RENTAL_CITIES,
  RENTAL_STATUSES,
  RENTAL_STATUS_LABELS,
  RENTAL_TYPES,
  RENTAL_TYPE_LABELS,
} from '@/lib/content/options';
import type { RentalUnit } from '@/lib/db/schema';

type Editable = Pick<
  RentalUnit,
  'address' | 'city' | 'community' | 'type' | 'status' | 'rent' | 'bedrooms' | 'bathrooms' | 'sqft' | 'availableOn' | 'description' | 'published'
>;

type Props = {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  unit?: Editable;
  submitLabel: string;
};

export function RentalForm({ action, unit, submitLabel }: Props) {
  const [state, formAction] = useActionState(action, IDLE_FORM);
  const errors = state.fieldErrors ?? {};

  // After a failed save, show what was typed rather than the stored values.
  const value = (name: keyof Editable): string => {
    if (state.values) return state.values[name] ?? '';
    const stored = unit?.[name];
    return stored === null || stored === undefined ? '' : String(stored);
  };
  const published = state.values ? state.values.published === 'on' : (unit?.published ?? true);

  return (
    <form action={formAction} className="space-y-5">
      <TextField
        label="Street address"
        name="address"
        required
        defaultValue={value('address')}
        error={errors.address?.[0]}
        hint="Example: 901 Winter Ridge"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="City"
          name="city"
          required
          list="rental-city-options"
          defaultValue={value('city')}
          error={errors.city?.[0]}
        />
        <datalist id="rental-city-options">
          {RENTAL_CITIES.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <TextField
          label="Community"
          name="community"
          defaultValue={value('community')}
          error={errors.community?.[0]}
          hint="Optional. For example, Winter Ridge."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Type"
          name="type"
          options={toOptions(RENTAL_TYPES, RENTAL_TYPE_LABELS)}
          defaultValue={value('type') || 'townhome'}
          error={errors.type?.[0]}
        />
        <SelectField
          label="Status"
          name="status"
          options={toOptions(RENTAL_STATUSES, RENTAL_STATUS_LABELS)}
          defaultValue={value('status') || 'call'}
          error={errors.status?.[0]}
        />
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <TextField label="Rent per month ($)" name="rent" inputMode="numeric" defaultValue={value('rent')} error={errors.rent?.[0]} />
        <TextField label="Bedrooms" name="bedrooms" inputMode="numeric" defaultValue={value('bedrooms')} error={errors.bedrooms?.[0]} />
        <TextField label="Bathrooms" name="bathrooms" inputMode="decimal" defaultValue={value('bathrooms')} error={errors.bathrooms?.[0]} hint="Example: 2.5" />
        <TextField label="Square feet" name="sqft" inputMode="numeric" defaultValue={value('sqft')} error={errors.sqft?.[0]} />
      </div>

      <TextField
        label="Available on"
        name="availableOn"
        type="date"
        defaultValue={value('availableOn')}
        error={errors.availableOn?.[0]}
        hint="Optional. Leave blank if it is available now or unknown."
        className="sm:max-w-xs"
      />

      <TextareaField
        label="Description"
        name="description"
        rows={5}
        defaultValue={value('description')}
        error={errors.description?.[0]}
        hint="Optional. Features like an attached garage, laundry hookups, or a patio."
      />

      <CheckboxField
        label="Show this rental on the website"
        name="published"
        defaultChecked={published}
        hint="Uncheck to hide it without deleting anything."
      />

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        {state.status !== 'idle' && <FormMessage status={state.status} message={state.message} />}
      </div>
    </form>
  );
}
