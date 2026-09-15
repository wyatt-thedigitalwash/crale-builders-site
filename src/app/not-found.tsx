import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest opacity-60">404</p>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md opacity-75">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-85"
      >
        Go Home
      </Link>
    </main>
  );
}
