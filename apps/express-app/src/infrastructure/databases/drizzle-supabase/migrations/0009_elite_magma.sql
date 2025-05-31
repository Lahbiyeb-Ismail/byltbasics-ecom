CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gender_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "genders_name_unique" UNIQUE("name"),
	CONSTRAINT "genders_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "images" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_collections" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "variant_images" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "images" CASCADE;--> statement-breakpoint
DROP TABLE "product_collections" CASCADE;--> statement-breakpoint
DROP TABLE "variant_images" CASCADE;--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "collections_name_unique";--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "collections_slug_unique";--> statement-breakpoint
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "product_fabrics" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_fabrics" ALTER COLUMN "fabric_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_fabrics" ALTER COLUMN "percentage" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "sku" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "sku" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "stock_quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "slug" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "base_price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "is_active" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "category_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "colors" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "fabrics" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "fabrics" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "color_id" uuid;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "image_url" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "alt_text" varchar(200);--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "cost_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "low_stock_threshold" integer DEFAULT 5;--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "collection_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "short_description" varchar(500);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sku" varchar(50);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "cost_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_featured" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_gender_id_genders_id_fk" FOREIGN KEY ("gender_id") REFERENCES "public"."genders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_color_id_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "product_variants" DROP COLUMN "is_available";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "gender";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "is_popular";--> statement-breakpoint
ALTER TABLE "colors" ADD CONSTRAINT "colors_hex_code_unique" UNIQUE("hex_code");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_sku_unique" UNIQUE("sku");--> statement-breakpoint
DROP TYPE "public"."gender_enum";