import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { template: '%s | Crale Builders Portal', default: 'Crale Builders Portal' },
  description: 'Private portal for updating Crale Builders rentals and project photos.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-seawall font-display text-ink [color-scheme:light]">{children}</div>
  );
}
