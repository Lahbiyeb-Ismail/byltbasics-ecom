import type db from "../index";

import {
  collections,
  colors,
  fabrics,
  images,
  productAttributes,
  productCollections,
  productFabrics,
  productImages,
  products,
  productVariants,
  sizes,
} from "../schemas";
import { transformedData } from "./data/products-seed-data";

// Type for the transformed data

async function seedProductDatabase(db: db) {
  try {
    console.log("🌱 Starting database seeding...");

    // Begin transaction for data integrity
    await db.transaction(async (tx) => {
      console.log("🔄 Inserting collections...");
      const insertedCollections = await Promise.all(
        transformedData.collections.map(async (collection) => {
          const result = await tx
            .insert(collections)
            .values({
              name: collection.name,
              slug: collection.slug,
              description: collection.description,
              isActive: true,
            })
            .returning();
          return result[0];
        }),
      );
      console.log(`✅ Inserted ${insertedCollections.length} collections`);

      console.log("🔄 Inserting fabrics...");
      const insertedFabrics = await Promise.all(
        transformedData.fabrics.map(async (fabric) => {
          const result = await tx
            .insert(fabrics)
            .values({
              name: fabric.name,
              description: fabric.description,
            })
            .returning();
          return result[0];
        }),
      );
      console.log(`✅ Inserted ${insertedFabrics.length} fabrics`);

      console.log("🔄 Inserting colors...");
      const insertedColors = await Promise.all(
        transformedData.colors.map(async (color) => {
          const result = await tx
            .insert(colors)
            .values({
              name: color.name,
              hexCode: color.hexCode,
              isActive: true,
            })
            .returning();
          return result[0];
        }),
      );
      console.log(`✅ Inserted ${insertedColors.length} colors`);

      console.log("🔄 Inserting sizes...");
      const insertedSizes = await Promise.all(
        transformedData.sizes.map(async (size) => {
          const result = await tx
            .insert(sizes)
            .values({
              name: size.name,
              sortOrder: size.sortOrder,
              isActive: true,
            })
            .returning();
          return result[0];
        }),
      );
      console.log(`✅ Inserted ${insertedSizes.length} sizes`);

      // Create lookup maps for easier reference
      // const collectionMap = new Map(insertedCollections.map(c => [c.name, c.id]));
      const fabricMap = new Map(insertedFabrics.map(f => [f.name, f.id]));
      const colorMap = new Map(insertedColors.map(c => [c.name, c.id]));
      const sizeMap = new Map(insertedSizes.map(s => [s.name, s.id]));

      console.log("🔄 Inserting products...");
      for (const product of transformedData.products) {
        // Insert product
        const insertedProduct = await tx
          .insert(products)
          .values({
            name: product.name,
            slug: product.slug,
            description: product.description,
            basePrice: product.basePrice,
            gender: product.gender,
            isPopular: product.isPopular,
            isActive: product.isActive,
          })
          .returning();

        const productId = insertedProduct[0].id;
        console.log(`✅ Inserted product: ${product.name}`);

        // Insert product attributes
        if (product.attributes && product.attributes.length > 0) {
          await Promise.all(
            product.attributes.map(async (attr) => {
              await tx.insert(productAttributes).values({
                productId,
                attributeName: attr.attributeName,
                attributeValue: attr.attributeValue,
              });
            }),
          );
          console.log(`✅ Inserted ${product.attributes.length} attributes for ${product.name}`);
        }

        // Insert product collections
        if (product.collections && product.collections.length > 0) {
          await Promise.all(
            product.collections.map(async (collectionSlug) => {
              // Find collection by name
              const collection = insertedCollections.find(c => c.slug === collectionSlug);
              if (collection) {
                await tx.insert(productCollections).values({
                  productId,
                  collectionId: collection.id,
                });
              }
            }),
          );
          console.log(`✅ Inserted ${product.collections.length} collection relationships for ${product.name}`);
        }

        // Insert product fabrics
        if (product.fabrics && product.fabrics.length > 0) {
          await Promise.all(
            product.fabrics.map(async (fabricData) => {
              const fabricId = fabricMap.get(fabricData.fabricName);
              if (fabricId) {
                await tx.insert(productFabrics).values({
                  productId,
                  fabricId,
                  percentage: fabricData.percentage,
                });
              }
            }),
          );
          console.log(`✅ Inserted ${product.fabrics.length} fabric relationships for ${product.name}`);
        }

        // Insert images
        if (product.images && product.images.length > 0) {
          const insertedImages = await Promise.all(
            product.images.map(async (imageData) => {
              const result = await tx
                .insert(images)
                .values({
                  url: imageData.url,
                  altText: imageData.altText,
                })
                .returning();
              return { imageId: result[0].id, isPrimary: imageData.isPrimary, sortOrder: imageData.sortOrder };
            }),
          );

          // Link images to product
          await Promise.all(
            insertedImages.map(async (img) => {
              await tx.insert(productImages).values({
                productId,
                imageId: img.imageId,
                isPrimary: img.isPrimary,
                sortOrder: img.sortOrder,
              });
            }),
          );
          console.log(`✅ Inserted ${product.images.length} images for ${product.name}`);
        }

        // Insert variants
        if (product.variants && product.variants.length > 0) {
          await Promise.all(
            product.variants.map(async (variant) => {
              const colorId = colorMap.get(variant.colorName);
              const sizeId = sizeMap.get(variant.sizeName);

              if (colorId && sizeId) {
                await tx.insert(productVariants).values({
                  productId,
                  colorId,
                  sizeId,
                  sku: variant.sku,
                  stockQuantity: variant.stockQuantity,
                  isAvailable: variant.isAvailable,
                  // Use base price if variant price not specified
                  price: variant.price || product.basePrice,
                });
              }
            }),
          );
          console.log(`✅ Inserted ${product.variants.length} variants for ${product.name}`);
        }
      }
    });

    console.log("✅ Database seeding completed successfully!");
  }
  catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Function to clear all data (useful for testing)
async function clearProductDatabase(db: db) {
  try {
    console.log("🧹 Clearing database...");

    // Delete in reverse order of dependencies
    await db.delete(productVariants);
    await db.delete(productImages);
    await db.delete(images);
    await db.delete(productFabrics);
    await db.delete(productCollections);
    await db.delete(productAttributes);
    await db.delete(products);
    await db.delete(sizes);
    await db.delete(colors);
    await db.delete(fabrics);
    await db.delete(collections);

    console.log("✅ Database cleared successfully!");
  }
  catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
}

// Export functions for use in scripts or API routes
export { clearProductDatabase, seedProductDatabase };

// // Allow running directly with Node
// if (require.main === module) {
//   // Check for command line args
//   const args = process.argv.slice(2);
//   if (args.includes("--clear")) {
//     clearDatabase()
//       .then(() => {
//         if (!args.includes("--only-clear")) {
//           return seedDatabase();
//         }
//       })
//       .catch(console.error)
//       .finally(() => {
//         process.exit();
//       });
//   }
//   else {
//     seedDatabase()
//       .catch(console.error)
//       .finally(() => {
//         process.exit();
//       });
//   }
// }
