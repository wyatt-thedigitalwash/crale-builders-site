import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth/session';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  UPLOAD_FOLDERS,
  type UploadFolder,
} from '@/lib/content/options';
import { getStorageMode } from '@/lib/storage';

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// Local development only: stores uploads in public/uploads when Vercel Blob is not configured.
export async function POST(request: Request): Promise<NextResponse> {
  if (getStorageMode() !== 'local') return new NextResponse(null, { status: 404 });
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid upload' }, { status: 400 });
  }
  const file = form.get('file');
  const folder = form.get('folder');

  if (!(file instanceof File) || !UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
    return NextResponse.json({ error: 'Invalid upload' }, { status: 400 });
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'Use a JPG, PNG, or WebP image under 25 MB' }, { status: 400 });
  }

  const base = path.parse(file.name).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'photo';
  const name = `${base.slice(0, 60)}-${randomBytes(6).toString('hex')}.${EXTENSIONS[file.type]}`;
  const directory = path.join(process.cwd(), 'public', 'uploads', folder as UploadFolder);

  try {
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, name), Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    console.error('Local upload failed', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const pathname = `${folder}/${name}`;
  return NextResponse.json({ url: `/uploads/${pathname}`, pathname });
}
