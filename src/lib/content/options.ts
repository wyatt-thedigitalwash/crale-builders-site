// Shared option lists and labels. Safe to import from client components.

export const RENTAL_CITIES = ['Sidney', 'Anna', 'Troy', 'Tipp City', 'Indian Lake'] as const;

export const RENTAL_TYPES = ['townhome', 'house', 'apartment', 'duplex'] as const;
export type RentalType = (typeof RENTAL_TYPES)[number];
export const RENTAL_TYPE_LABELS: Record<RentalType, string> = {
  townhome: 'Townhome',
  house: 'House',
  apartment: 'Apartment',
  duplex: 'Duplex',
};

export const RENTAL_STATUSES = ['available', 'coming_soon', 'call', 'leased'] as const;
export type RentalStatus = (typeof RENTAL_STATUSES)[number];
export const RENTAL_STATUS_LABELS: Record<RentalStatus, string> = {
  available: 'Available',
  coming_soon: 'Coming Soon',
  call: 'Call for Availability',
  leased: 'Leased',
};

export const RENTAL_IMAGE_KINDS = ['photo', 'floor_plan'] as const;
export type RentalImageKind = (typeof RENTAL_IMAGE_KINDS)[number];
export const RENTAL_IMAGE_KIND_LABELS: Record<RentalImageKind, string> = {
  photo: 'Photo',
  floor_plan: 'Floor Plan',
};

export const GALLERY_CATEGORIES = [
  'indian-lake',
  'custom-homes',
  'interiors',
  'remodeling',
  'commercial',
] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  'indian-lake': 'Indian Lake',
  'custom-homes': 'Custom Homes',
  interiors: 'Interiors',
  remodeling: 'Remodeling',
  commercial: 'Commercial',
};

export const UPLOAD_FOLDERS = ['rentals', 'gallery'] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

export type UploadedImage = {
  url: string;
  pathname: string;
  width: number | null;
  height: number | null;
};
