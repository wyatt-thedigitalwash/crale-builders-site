import type { Metadata } from 'next';
import { StatusPage } from '@/components/site/status-page';

export const metadata: Metadata = {
  title: { absolute: 'Page Not Found | Crale Builders' },
  description: 'The page you were looking for is not on the Crale Builders website.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StatusPage
      title="Page not found"
      text="That page is not here. It may have moved when the website was rebuilt. Start from the home page, or give the office a call."
    />
  );
}
