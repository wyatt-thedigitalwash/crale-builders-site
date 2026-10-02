import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ConfirmButton } from '@/components/admin/buttons';
import { ImageUploader } from '@/components/admin/image-uploader';
import { cardClass, pageTitleClass, sectionTitleClass } from '@/components/admin/ui';
import { getRentalForAdmin } from '@/lib/admin/queries';
import { RENTAL_IMAGE_KINDS, RENTAL_IMAGE_KIND_LABELS } from '@/lib/content/options';
import { getStorageMode } from '@/lib/storage';
import {
  addRentalImages,
  deleteRental,
  deleteRentalImage,
  moveRentalImage,
  saveRental,
  updateRentalImage,
} from '../actions';
import { RentalForm } from '../rental-form';
import { RentalImageCard } from './rental-image-card';

export const metadata: Metadata = {
  title: 'Edit Rental',
  description: 'Update a rental listing on the Crale Builders website.',
};

export default async function EditRentalPage({ params }: { params: Promise<{ id: string }> }) {
  const unitId = Number((await params).id);
  if (!Number.isInteger(unitId) || unitId <= 0) notFound();

  const unit = await getRentalForAdmin(unitId);
  if (!unit) notFound();

  return (
    <>
      <Link href="/admin/rentals" className="text-sm font-medium text-crale-green hover:underline">
        Back to all rentals
      </Link>
      <h1 className={`mt-2 ${pageTitleClass}`}>{unit.address}</h1>
      <p className="mt-1 text-zinc-700">{[unit.community, unit.city].filter(Boolean).join(', ')}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="details-heading" className={cardClass}>
          <h2 id="details-heading" className={`mb-5 ${sectionTitleClass}`}>
            Details
          </h2>
          <RentalForm action={saveRental.bind(null, unit.id)} unit={unit} submitLabel="Save changes" />
        </section>

        <section aria-labelledby="photos-heading" className={cardClass}>
          <h2 id="photos-heading" className={sectionTitleClass}>
            Photos and floor plans
          </h2>
          <p className="mb-5 mt-1 text-sm text-zinc-600">The first photo is used as the main listing photo.</p>
          <ImageUploader
            folder="rentals"
            storageMode={getStorageMode()}
            onComplete={addRentalImages.bind(null, unit.id)}
            choiceLabel="Upload as"
            choices={RENTAL_IMAGE_KINDS.map((kind) => ({ value: kind, label: RENTAL_IMAGE_KIND_LABELS[kind] }))}
            defaultChoice="photo"
          />
          {unit.images.length > 0 && (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {unit.images.map((image, index) => (
                <li key={image.id}>
                  <RentalImageCard
                    image={image}
                    update={updateRentalImage.bind(null, image.id)}
                    moveUp={moveRentalImage.bind(null, image.id, 'up')}
                    moveDown={moveRentalImage.bind(null, image.id, 'down')}
                    remove={deleteRentalImage.bind(null, image.id)}
                    isFirst={index === 0}
                    isLast={index === unit.images.length - 1}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-labelledby="danger-heading" className={`mt-6 ${cardClass}`}>
        <h2 id="danger-heading" className={sectionTitleClass}>
          Delete this rental
        </h2>
        <p className="mb-4 mt-1 text-sm text-zinc-600">
          Removes the listing and its photos for good. To take it off the website for now, uncheck
          &quot;Show this rental on the website&quot; instead.
        </p>
        <ConfirmButton
          action={deleteRental.bind(null, unit.id)}
          label="Delete rental"
          prompt="This cannot be undone."
          confirmLabel="Yes, delete this rental"
        />
      </section>
    </>
  );
}
