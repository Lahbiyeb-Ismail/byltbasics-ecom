import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Enums
export const genderEnum = pgEnum("gender_enum", ["men", "women", "kids"]);

// Core Tables
export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    basePrice: decimal("base_price", { precision: 12, scale: 2 }).notNull(),
    gender: genderEnum("gender").notNull(),
    isPopular: boolean("is_popular").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    slugIdx: index("idx_products_slug").on(table.slug),
    genderIdx: index("idx_products_gender").on(table.gender),
    activeIdx: index("idx_products_active").on(table.isActive),
    popularIdx: index("idx_products_popular").on(table.isPopular),
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
    attributeNameIdx: index("idx_product_attributes_name").on(table.attributeName),
  }]),
);

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const fabrics = pgTable("fabrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  careInstructions: text("care_instructions"),
});

export const colors = pgTable(
  "colors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 50 }).notNull().unique(),
    hexCode: char("hex_code", { length: 7 }).notNull(),
    isActive: boolean("is_active").default(true),
  },
);

export const sizes = pgTable("sizes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 10 }).notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").default(true),
});

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    colorId: uuid("color_id")
      .notNull()
      .references(() => colors.id),
    sizeId: uuid("size_id")
      .notNull()
      .references(() => sizes.id),
    sku: varchar("sku", { length: 100 }).unique(),
    price: decimal("price", { precision: 12, scale: 2 }),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    isAvailable: boolean("is_available").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  table => ([{
    productColorSizeUnique: unique().on(table.productId, table.colorId, table.sizeId),
    productIdx: index("idx_product_variants_product").on(table.productId),
    availableIdx: index("idx_product_variants_available").on(table.isAvailable),
    stockIdx: index("idx_product_variants_stock").on(table.stockQuantity),
  }]),
);

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  altText: varchar("alt_text", { length: 255 }),
  width: integer("width"),
  height: integer("height"),
  fileSize: integer("file_size"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
});

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    imageId: uuid("image_id")
      .notNull()
      .references(() => images.id, { onDelete: "cascade" }),
    isPrimary: boolean("is_primary").default(false),
    sortOrder: integer("sort_order").default(0),
  },
  table => ([{
    productImageUnique: unique().on(table.productId, table.imageId),
  }]),
);

export const variantImages = pgTable(
  "variant_images",
  {
    variantId: uuid("variant_id").references(() => productVariants.id, {
      onDelete: "cascade",
    }),
    imageId: uuid("image_id").references(() => images.id, { onDelete: "cascade" }),
    isPrimary: boolean("is_primary").default(false),
    sortOrder: integer("sort_order").default(0),
  },
  table => ([{
    pk: primaryKey({ columns: [table.variantId, table.imageId] }),
  }]),
);

export const productCollections = pgTable(
  "product_collections",
  {
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    collectionId: uuid("collection_id").references(() => collections.id, { onDelete: "cascade" }),
  },
  table => ([{
    pk: primaryKey({ columns: [table.productId, table.collectionId] }),
  }]),
);

export const productFabrics = pgTable(
  "product_fabrics",
  {
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    fabricId: uuid("fabric_id").references(() => fabrics.id, { onDelete: "cascade" }),
    percentage: decimal("percentage", { precision: 5, scale: 2 }),
  },
  table => ([{
    pk: primaryKey({ columns: [table.productId, table.fabricId] }),
  }]),
);

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  attributes: many(productAttributes),
  collections: many(productCollections),
  fabrics: many(productFabrics),
  variants: many(productVariants),
  images: many(productImages),
}));

export const productAttributesRelations = relations(productAttributes, ({ one }) => ({
  product: one(products, {
    fields: [productAttributes.productId],
    references: [products.id],
  }),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  products: many(productCollections),
}));

export const fabricsRelations = relations(fabrics, ({ many }) => ({
  products: many(productFabrics),
}));

export const colorsRelations = relations(colors, ({ many }) => ({
  variants: many(productVariants),
}));

export const sizesRelations = relations(sizes, ({ many }) => ({
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  color: one(colors, {
    fields: [productVariants.colorId],
    references: [colors.id],
  }),
  size: one(sizes, {
    fields: [productVariants.sizeId],
    references: [sizes.id],
  }),
  images: many(variantImages),
}));

export const imagesRelations = relations(images, ({ many }) => ({
  productImages: many(productImages),
  variantImages: many(variantImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  image: one(images, {
    fields: [productImages.imageId],
    references: [images.id],
  }),
}));

export const variantImagesRelations = relations(variantImages, ({ one }) => ({
  variant: one(productVariants, {
    fields: [variantImages.variantId],
    references: [productVariants.id],
  }),
  image: one(images, {
    fields: [variantImages.imageId],
    references: [images.id],
  }),
}));

export const productCollectionsRelations = relations(productCollections, ({ one }) => ({
  product: one(products, {
    fields: [productCollections.productId],
    references: [products.id],
  }),
  collection: one(collections, {
    fields: [productCollections.collectionId],
    references: [collections.id],
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

// Type exports for TypeScript
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type NewProductAttribute = typeof productAttributes.$inferInsert;
export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type Fabric = typeof fabrics.$inferSelect;
export type NewFabric = typeof fabrics.$inferInsert;
export type Color = typeof colors.$inferSelect;
export type NewColor = typeof colors.$inferInsert;
export type Size = typeof sizes.$inferSelect;
export type NewSize = typeof sizes.$inferInsert;
export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;
