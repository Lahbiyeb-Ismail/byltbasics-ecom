import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  decimal,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ============================================================================
// CORE PRODUCT HIERARCHY TABLES
// ============================================================================
export const genders = pgTable("genders", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
});

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    genderId: uuid("gender_id")
      .notNull()
      .references(() => genders.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    genderSlugUnique: unique().on(table.genderId, table.slug),
    genderIdx: index("idx_categories_gender").on(table.genderId),
    activeIdx: index("idx_categories_active").on(table.isActive),
  }]),
);

export const collections = pgTable(
  "collections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    categorySlugUnique: unique().on(table.categoryId, table.slug),
    categoryIdx: index("idx_collections_category").on(table.categoryId),
  }]),
);

// ============================================================================
// PRODUCT ATTRIBUTES TABLES
// ============================================================================

export const colors = pgTable("colors", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  hexCode: char("hex_code", { length: 7 }).notNull().unique(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
});

export const sizes = pgTable("sizes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 10 }).notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").default(true),
});

export const fabrics = pgTable("fabrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  careInstructions: text("care_instructions"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
});

// ============================================================================
// PRODUCT TABLES
// ============================================================================

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    collectionId: uuid("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    description: text("description"),
    shortDescription: varchar("short_description", { length: 500 }),
    sku: varchar("sku", { length: 50 }).unique(),
    basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
    costPrice: decimal("cost_price", { precision: 10, scale: 2 }),
    isFeatured: boolean("is_featured").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    slugIdx: index("idx_products_slug").on(table.slug),
    collectionIdx: index("idx_products_collection").on(table.collectionId),
    featuredIdx: index("idx_products_featured").on(table.isFeatured),
    activeIdx: index("idx_products_active").on(table.isActive),
    skuIdx: index("idx_products_sku").on(table.sku),
  }]),
);

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sizeId: uuid("size_id")
      .notNull()
      .references(() => sizes.id),
    colorId: uuid("color_id")
      .notNull()
      .references(() => colors.id),
    sku: varchar("sku", { length: 50 }).unique().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    costPrice: decimal("cost_price", { precision: 10, scale: 2 }),
    stockQuantity: integer("stock_quantity").default(0),
    lowStockThreshold: integer("low_stock_threshold").default(5),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    productSizeColorUnique: unique().on(table.productId, table.sizeId, table.colorId),
    productIdx: index("idx_variants_product").on(table.productId),
    skuIdx: index("idx_variants_sku").on(table.sku),
    stockIdx: index("idx_variants_stock").on(table.stockQuantity),
    activeIdx: index("idx_variants_active").on(table.isActive),
  }]),
);

export const productAttributes = pgTable(
  "product_attributes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    attributeName: varchar("attribute_name", { length: 50 }).notNull(),
    attributeValue: varchar("attribute_value", { length: 100 }).notNull(),
  },
  table => ([{
    productAttributeUnique: unique().on(table.productId, table.attributeName),
    productIdx: index("idx_attributes_product").on(table.productId),
    nameIdx: index("idx_attributes_name").on(table.attributeName),
  }]),
);

// ============================================================================
// PRODUCT IMAGES
// ============================================================================

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    colorId: uuid("color_id")
      .references(() => colors.id), // Optional: for color-specific images
    imageUrl: varchar("image_url", { length: 500 }).notNull(),
    altText: varchar("alt_text", { length: 200 }),
    sortOrder: integer("sort_order").default(0),
    isPrimary: boolean("is_primary").default(false),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    productIdx: index("idx_images_product").on(table.productId),
    colorIdx: index("idx_images_color").on(table.colorId),
    primaryIdx: index("idx_images_primary").on(table.productId, table.isPrimary),
    sortOrderIdx: index("idx_images_sort_order").on(table.productId, table.sortOrder),
  }]),
);

// ============================================================================
// JUNCTION TABLES
// ============================================================================

export const productFabrics = pgTable(
  "product_fabrics",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    fabricId: uuid("fabric_id")
      .notNull()
      .references(() => fabrics.id, { onDelete: "cascade" }),
    percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
  },
  table => ([{
    pk: primaryKey({ columns: [table.productId, table.fabricId] }),
  }]),
);

// ============================================================================
// RELATIONS [^1]
// ============================================================================
export const gendersRelations = relations(genders, ({ many }) => ({
  categories: many(categories),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  gender: one(genders, {
    fields: [categories.genderId],
    references: [genders.id],
  }),
  collections: many(collections),
  sizes: many(sizes),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  category: one(categories, {
    fields: [collections.categoryId],
    references: [categories.id],
  }),
  products: many(products),
}));

export const colorsRelations = relations(colors, ({ many }) => ({
  variants: many(productVariants),
  images: many(productImages),
}));

export const sizesRelations = relations(sizes, ({ many }) => ({
  variants: many(productVariants),
}));

export const fabricsRelations = relations(fabrics, ({ many }) => ({
  productFabrics: many(productFabrics),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  collection: one(collections, {
    fields: [products.collectionId],
    references: [collections.id],
  }),
  variants: many(productVariants),
  attributes: many(productAttributes),
  images: many(productImages),
  fabrics: many(productFabrics),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  size: one(sizes, {
    fields: [productVariants.sizeId],
    references: [sizes.id],
  }),
  color: one(colors, {
    fields: [productVariants.colorId],
    references: [colors.id],
  }),
}));

export const productAttributesRelations = relations(productAttributes, ({ one }) => ({
  product: one(products, {
    fields: [productAttributes.productId],
    references: [products.id],
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  color: one(colors, {
    fields: [productImages.colorId],
    references: [colors.id],
  }),
}));

export const productFabricsRelations = relations(productFabrics, ({ one }) => ({
  product: one(products, {
    fields: [productFabrics.productId],
    references: [products.id],
  }),
  fabric: one(fabrics, {
    fields: [productFabrics.fabricId],
    references: [fabrics.id],
  }),
}));
