import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
// Relative imports so drizzle-kit and scripts can load this file outside Next.js.
import {
  GALLERY_CATEGORIES,
  RENTAL_IMAGE_KINDS,
  RENTAL_STATUSES,
  RENTAL_TYPES,
} from '../content/options';

const createdAt = timestamp('created_at', { withTimezone: true }).notNull().defaultNow();

// Rentals ------------------------------------------------------------------

export const rentalUnits = pgTable(
  'rental_units',
  {
    id: serial('id').primaryKey(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    community: text('community'),
    type: text('type', { enum: RENTAL_TYPES }).notNull().default('townhome'),
    status: text('status', { enum: RENTAL_STATUSES }).notNull().default('call'),
    rent: integer('rent'),
    bedrooms: integer('bedrooms'),
    bathrooms: real('bathrooms'),
    sqft: integer('sqft'),
    availableOn: date('available_on'),
    description: text('description'),
    published: boolean('published').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt,
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [index('rental_units_city_idx').on(t.city, t.sortOrder)],
);

export const rentalImages = pgTable(
  'rental_images',
  {
    id: serial('id').primaryKey(),
    unitId: integer('unit_id')
      .notNull()
      .references(() => rentalUnits.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    pathname: text('pathname').notNull(),
    // Empty alt text keeps an image off the public site until someone describes it.
    alt: text('alt').notNull().default(''),
    kind: text('kind', { enum: RENTAL_IMAGE_KINDS }).notNull().default('photo'),
    width: integer('width'),
    height: integer('height'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt,
  },
  (t) => [index('rental_images_unit_idx').on(t.unitId, t.sortOrder)],
);

export const rentalUnitsRelations = relations(rentalUnits, ({ many }) => ({
  images: many(rentalImages),
}));

export const rentalImagesRelations = relations(rentalImages, ({ one }) => ({
  unit: one(rentalUnits, { fields: [rentalImages.unitId], references: [rentalUnits.id] }),
}));

// Project gallery ------------------------------------------------------------

export const galleryImages = pgTable(
  'gallery_images',
  {
    id: serial('id').primaryKey(),
    url: text('url').notNull(),
    pathname: text('pathname').notNull(),
    alt: text('alt').notNull().default(''),
    category: text('category', { enum: GALLERY_CATEGORIES }).notNull(),
    caption: text('caption'),
    location: text('location'),
    featured: boolean('featured').notNull().default(false),
    width: integer('width'),
    height: integer('height'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt,
  },
  (t) => [index('gallery_images_category_idx').on(t.category, t.sortOrder)],
);

// Portal auth ----------------------------------------------------------------
// Only SHA-256 hashes of tokens are stored, never the tokens themselves.

export const loginTokens = pgTable(
  'login_tokens',
  {
    tokenHash: text('token_hash').primaryKey(),
    email: text('email').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    usedAt: timestamp('used_at', { withTimezone: true }),
    createdAt,
  },
  (t) => [index('login_tokens_email_idx').on(t.email, t.createdAt)],
);

export const adminSessions = pgTable('admin_sessions', {
  idHash: text('id_hash').primaryKey(),
  email: text('email').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt,
});

// Password sign-in. Only scrypt hashes are stored. Accounts are created with scripts/create-admin.ts.
export const adminUsers = pgTable('admin_users', {
  email: text('email').primaryKey(),
  passwordHash: text('password_hash').notNull(),
  failedAttempts: integer('failed_attempts').notNull().default(0),
  lockedUntil: timestamp('locked_until', { withTimezone: true }),
  createdAt,
});

export type RentalUnit = typeof rentalUnits.$inferSelect;
export type RentalImage = typeof rentalImages.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
