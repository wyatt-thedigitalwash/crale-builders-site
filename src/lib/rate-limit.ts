import 'server-only';
import { headers } from 'next/headers';

// Simple in-memory limiter: a sliding window of timestamps per key. On Vercel each server instance keeps
// its own memory, so this slows down abuse rather than enforcing a hard global cap. A shared store
// (for example Upstash Redis) would make the limit exact if that is ever needed.

const hits = new Map<string, number[]>();

/** The visitor's IP address as reported by the hosting proxy, or "unknown". */
export async function clientIp(): Promise<string> {
  const list = await headers();
  return list.get('x-forwarded-for')?.split(',')[0]?.trim() || list.get('x-real-ip') || 'unknown';
}

/** Records one attempt and returns false once `limit` attempts have happened inside `windowMs`. */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-running server.
  if (hits.size > 5000) {
    for (const [entry, times] of hits) if (times.every((time) => now - time >= windowMs)) hits.delete(entry);
  }
  return true;
}
