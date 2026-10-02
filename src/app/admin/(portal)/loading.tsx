// Portal pages read the session and database on every request, so each
// navigation shows this while that data streams in.
export default function PortalLoading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-4">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-64 rounded bg-zinc-200" />
      <div className="h-4 w-96 max-w-full rounded bg-zinc-200" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-40 rounded-lg bg-zinc-200" />
        <div className="h-40 rounded-lg bg-zinc-200" />
      </div>
    </div>
  );
}
