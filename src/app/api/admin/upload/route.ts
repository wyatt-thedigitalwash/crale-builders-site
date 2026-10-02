import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/auth/session';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, UPLOAD_FOLDERS } from '@/lib/content/options';

// Issues short-lived tokens so the browser can upload photos straight to Vercel Blob.
// The database row is created afterward by a portal Server Action.
class NotSignedIn extends Error {}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await getAdmin())) throw new NotSignedIn();
        if (!UPLOAD_FOLDERS.some((folder) => pathname.startsWith(`${folder}/`))) {
          throw new Error('Invalid upload path');
        }
        return {
          allowedContentTypes: ALLOWED_IMAGE_TYPES,
          maximumSizeInBytes: MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof NotSignedIn) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    // Details stay in the server log; the browser only gets a generic message.
    console.error('Upload token request failed', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 400 });
  }
}
