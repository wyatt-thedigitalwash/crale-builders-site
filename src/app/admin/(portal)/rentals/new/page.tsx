import type { Metadata } from 'next';
import Link from 'next/link';
import { cardClass, pageTitleClass } from '@/components/admin/ui';
import { requireAdmin } from '@/lib/auth/session';
import { saveRental } from '../actions';
import { RentalForm } from '../rental-form';

export const metadata: Metadata = {
  title: 'Add a Rental',
  description: 'Add a new rental listing to the Crale Builders website.',
};

export default async function NewRentalPage() {
  await requireAdmin();

  return (
    <>
      <Link href="/admin/rentals" className="text-sm font-medium text-crale-green hover:underline">
        Back to all rentals
      </Link>
      <h1 className={`mt-2 ${pageTitleClass}`}>Add a Rental</h1>
      <p className="mt-1 text-zinc-700">Save the details first. You can add photos and floor plans on the next screen.</p>
      <section className={`mt-6 max-w-3xl ${cardClass}`}>
        <RentalForm action={saveRental.bind(null, null)} submitLabel="Save and add photos" />
      </section>
    </>
  );
}
