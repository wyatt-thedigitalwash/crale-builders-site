import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
import { buttonSecondary } from '@/components/admin/ui';
import { Logo } from '@/components/site/logo';
import { getAdmin } from '@/lib/auth/session';
import { signOut } from './actions';
import { PortalNav } from './portal-nav';

// Navigation only. Every portal page and Server Action checks the session itself.
export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="bg-white shadow-[0_12px_32px_-24px_rgba(15,53,38,0.5)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-4 py-3 md:px-6">
          <Link href="/admin" className="flex shrink-0 items-center gap-3 rounded-[2px]">
            <Logo alt="Crale Builders portal home" className="h-10 w-auto" />
            <span className="font-display text-[15px] font-semibold text-ink-soft">Admin</span>
          </Link>
          <div className="order-last w-full md:order-none md:w-auto">
            <PortalNav />
          </div>
          <div className="ml-auto">
            <Suspense fallback={null}>
              <Account />
            </Suspense>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6 md:py-10">
        <Suspense fallback={<p className="text-ink-soft">Loading...</p>}>{children}</Suspense>
      </main>
    </>
  );
}

async function Account() {
  const admin = await getAdmin();
  if (!admin) return null;
  return (
    <form action={signOut} className="flex items-center gap-3">
      <span className="hidden text-sm text-ink-soft sm:inline">{admin.email}</span>
      <button type="submit" className={buttonSecondary}>
        Sign out
      </button>
    </form>
  );
}
