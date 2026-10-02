CREATE TABLE "admin_sessions" (
	"id_hash" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"category" text NOT NULL,
	"caption" text,
	"location" text,
	"featured" boolean DEFAULT false NOT NULL,
	"width" integer,
	"height" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_tokens" (
	"token_hash" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rental_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"unit_id" integer NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"kind" text DEFAULT 'photo' NOT NULL,
	"width" integer,
	"height" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rental_units" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"community" text,
	"type" text DEFAULT 'townhome' NOT NULL,
	"status" text DEFAULT 'call' NOT NULL,
	"rent" integer,
	"bedrooms" integer,
	"bathrooms" real,
	"sqft" integer,
	"available_on" date,
	"description" text,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rental_images" ADD CONSTRAINT "rental_images_unit_id_rental_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."rental_units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "gallery_images_category_idx" ON "gallery_images" USING btree ("category","sort_order");--> statement-breakpoint
CREATE INDEX "login_tokens_email_idx" ON "login_tokens" USING btree ("email","created_at");--> statement-breakpoint
CREATE INDEX "rental_images_unit_idx" ON "rental_images" USING btree ("unit_id","sort_order");--> statement-breakpoint
CREATE INDEX "rental_units_city_idx" ON "rental_units" USING btree ("city","sort_order");