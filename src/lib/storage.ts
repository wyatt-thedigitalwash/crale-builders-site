import 'server-only';
import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { del } from '@vercel/blob';

export type StorageMode = 'blob' | 'local';

const BLOB_HOST_SUFFIX = '.public.blob.vercel-storage.com';
export const LOCAL_UPLOAD_PREFIX = '/uploads/';

/** Vercel Blob when a token is present. Local development falls back to public/uploads. */
export function getStorageMode(): StorageMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) return 'blob';
  if (process.env.VERCEL) throw new Error('BLOB_READ_WRITE_TOKEN must be set on Vercel.');
  return 'local';
}

function isBlobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

function isLocalUploadUrl(url: string): boolean {
  return url.startsWith(LOCAL_UPLOAD_PREFIX) && !url.includes('..');
}

/** Only accept image URLs that point at our own storage. */
export function isTrustedImageUrl(url: string): boolean {
  return getStorageMode() === 'blob' ? isBlobUrl(url) : isLocalUploadUrl(url);
}

export async function deleteStoredImage(url: string): Promise<void> {
  if (isBlobUrl(url)) {
    await del(url);
    return;
  }
  if (!isLocalUploadUrl(url) || process.env.VERCEL) return;

  const uploadsRoot = path.join(process.cwd(), 'public', 'uploads');
  const file = path.join(process.cwd(), 'public', url);
  if (!file.startsWith(uploadsRoot + path.sep)) return;
  await unlink(file).catch(() => undefined);
}
