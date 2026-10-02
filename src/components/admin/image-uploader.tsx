'use client';

import { upload } from '@vercel/blob/client';
import { useId, useRef, useState, type DragEvent } from 'react';
import type { ActionResult } from '@/lib/admin/form-state';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  type UploadedImage,
  type UploadFolder,
} from '@/lib/content/options';
import { inputClass, labelClass } from './ui';

type Choice = { value: string; label: string };
type Progress = { name: string; percent: number; error?: string };

type Props = {
  folder: UploadFolder;
  storageMode: 'blob' | 'local';
  /** Server Action that saves the uploaded files as database rows. */
  onComplete: (images: UploadedImage[], choice: string) => Promise<ActionResult>;
  choiceLabel: string;
  choices: Choice[];
  defaultChoice: string;
};

const PARALLEL_UPLOADS = 3;

async function readDimensions(file: File) {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return size;
  } catch {
    return { width: null, height: null };
  }
}

export function ImageUploader({ folder, storageMode, onComplete, choiceLabel, choices, defaultChoice }: Props) {
  const inputId = useId();
  const choiceId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [choice, setChoice] = useState(defaultChoice);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  const updateProgress = (index: number, patch: Partial<Progress>) =>
    setProgress((items) => items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  async function uploadFile(file: File, index: number): Promise<UploadedImage> {
    const size = await readDimensions(file);
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '') || 'photo.jpg';

    if (storageMode === 'blob') {
      const blob = await upload(`${folder}/${safeName}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
        multipart: file.size > 8 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => updateProgress(index, { percent: Math.round(percentage) }),
      });
      return { url: blob.url, pathname: blob.pathname, ...size };
    }

    const body = new FormData();
    body.set('file', file);
    body.set('folder', folder);
    const response = await fetch('/api/admin/upload-local', { method: 'POST', body });
    const json = (await response.json()) as { url?: string; pathname?: string; error?: string };
    if (!response.ok || !json.url || !json.pathname) throw new Error(json.error ?? 'Upload failed');
    return { url: json.url, pathname: json.pathname, ...size };
  }

  async function handleFiles(files: File[]) {
    if (busy || files.length === 0) return;
    const accepted = files.filter((f) => ALLOWED_IMAGE_TYPES.includes(f.type) && f.size <= MAX_IMAGE_BYTES);
    const skipped = files.length - accepted.length;
    const skippedNote = skipped > 0 ? ` ${skipped} file(s) skipped. Use JPG, PNG, or WebP photos under 25 MB.` : '';

    setResult(null);
    setProgress(accepted.map((file) => ({ name: file.name, percent: 0 })));
    if (accepted.length === 0) {
      setResult({ ok: false, message: skippedNote.trim() });
      return;
    }

    setBusy(true);
    const uploaded: (UploadedImage | null)[] = accepted.map(() => null);
    let next = 0;
    const worker = async () => {
      while (next < accepted.length) {
        const index = next++;
        try {
          uploaded[index] = await uploadFile(accepted[index], index);
          updateProgress(index, { percent: 100 });
        } catch (error) {
          updateProgress(index, { error: error instanceof Error ? error.message : 'Upload failed' });
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(PARALLEL_UPLOADS, accepted.length) }, worker));

    const done = uploaded.filter((image): image is UploadedImage => image !== null);
    if (done.length > 0) {
      const saved = await onComplete(done, choice);
      setResult({ ...saved, message: saved.message + skippedNote });
      if (saved.ok) setProgress((items) => items.filter((item) => item.error));
    } else {
      setResult({ ok: false, message: `No photos were uploaded. Please try again.${skippedNote}` });
    }

    setBusy(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    void handleFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={choiceId} className={labelClass}>
          {choiceLabel}
        </label>
        <select
          id={choiceId}
          value={choice}
          onChange={(event) => setChoice(event.target.value)}
          disabled={busy}
          className={`mt-1 ${inputClass}`}
        >
          {choices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors focus-within:outline-2 focus-within:outline-crale-green ${
          dragging ? 'border-crale-green bg-seawall' : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100'
        } ${busy ? 'pointer-events-none opacity-60' : ''}`}
      >
        <span className="font-semibold text-zinc-900">{busy ? 'Uploading...' : 'Choose photos or drag them here'}</span>
        <span className="mt-1 text-sm text-zinc-600">JPG, PNG, or WebP. Up to 25 MB each. You can select several at once.</span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(',')}
          multiple
          disabled={busy}
          onChange={(event) => void handleFiles(Array.from(event.target.files ?? []))}
          className="sr-only"
        />
      </label>

      {progress.length > 0 && (
        <ul className="space-y-2" aria-label="Upload progress">
          {progress.map((item, index) => (
            <li key={`${item.name}-${index}`} className="text-sm">
              <div className="flex justify-between gap-3">
                <span className="truncate">{item.name}</span>
                <span className={item.error ? 'text-red-700' : 'text-zinc-600'}>
                  {item.error ?? `${item.percent}%`}
                </span>
              </div>
              {!item.error && (
                <div className="mt-1 h-1.5 overflow-hidden rounded bg-zinc-200" aria-hidden="true">
                  <div className="h-full bg-crale-green transition-all" style={{ width: `${item.percent}%` }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <p role="status" className={`text-sm font-medium ${result?.ok === false ? 'text-red-700' : 'text-crale-green'}`}>
        {result?.message}
      </p>
    </div>
  );
}
