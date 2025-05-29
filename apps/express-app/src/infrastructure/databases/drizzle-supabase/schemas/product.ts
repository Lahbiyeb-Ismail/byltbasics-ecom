import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Define the size type
export interface SizeType {
  size: string;
  isAvailable: boolean;
}

// Product table schema
export const productsTable = pgTable("products", {
  id: uuid().primaryKey().defaultRandom().unique(),
  gender: varchar("gender", { length: 10 }).notNull(), // 'men', 'women', etc.
  name: varchar("name", { length: 255 }).notNull(),
  route: varchar("route", { length: 255 }).notNull().unique(),
  collections: varchar("collections", { length: 255 }).notNull(),
  style: varchar("style", { length: 100 }),
  cut: varchar("cut", { length: 100 }),
  neck: varchar("neck", { length: 100 }),
  sleeve: varchar("sleeve", { length: 100 }),
  fabric: varchar("fabric", { length: 100 }),
  price: integer("price").notNull(), // stored in cents
  description: text("description"),
  images: jsonb("images").$type<string[]>().notNull().default([]), // array of image paths
  colors: jsonb("colors").$type<string[]>().notNull().default([]), // array of color names
  sizes: jsonb("sizes").$type<SizeType[]>().notNull().default([]), // array of size objects
  stock: integer("stock").notNull().default(0),
  popularity: boolean("popularity").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
