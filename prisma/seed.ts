import { PrismaClient } from "@prisma/client";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "../src/data/initialCatalog";

const prisma = new PrismaClient();

async function main() {
  console.log("🐎 Iniciando sembrado en base de datos PostgreSQL (Los Troperos)...");

  // 1. Sembrado de Categorías
  for (const cat of INITIAL_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        itemCount: cat.itemCount || 0,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        itemCount: cat.itemCount || 0,
      },
    });
    console.log(`✓ Categoría lista: ${cat.name}`);
  }

  // 2. Sembrado de Productos y Variantes
  for (const prod of INITIAL_PRODUCTS) {
    const createdProduct = await prisma.product.upsert({
      where: { id: prod.id },
      update: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        features: prod.features,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice || null,
        images: prod.images,
        stock: prod.stock,
        featured: prod.featured || false,
        badge: prod.badge || null,
        material: prod.material || null,
        origin: prod.origin || "Esquel, Chubut - Patagonia Argentina",
        categoryId: prod.categoryId,
      },
      create: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        features: prod.features,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice || null,
        images: prod.images,
        stock: prod.stock,
        featured: prod.featured || false,
        badge: prod.badge || null,
        material: prod.material || null,
        origin: prod.origin || "Esquel, Chubut - Patagonia Argentina",
        categoryId: prod.categoryId,
      },
    });

    // Variantes asociadas si existen
    if (prod.variants && prod.variants.length > 0) {
      for (const v of prod.variants) {
        await prisma.productVariant.upsert({
          where: { id: v.id },
          update: {
            name: v.name,
            sku: v.sku || null,
            priceModifier: v.priceModifier || 0,
            stock: v.stock,
            productId: createdProduct.id,
          },
          create: {
            id: v.id,
            name: v.name,
            sku: v.sku || null,
            priceModifier: v.priceModifier || 0,
            stock: v.stock,
            productId: createdProduct.id,
          },
        });
      }
    }

    console.log(`✓ Producto guardado: ${prod.name}`);
  }

  console.log("✅ Sembrado completado exitosamente en PostgreSQL.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el sembrado de PostgreSQL:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
