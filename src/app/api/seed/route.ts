import { NextResponse } from "next/server";
import { prisma, isPostgresConfigured } from "@/lib/prisma";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "@/data/initialCatalog";

export async function POST() {
  if (!isPostgresConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "DATABASE_URL no está configurada o contiene credenciales de ejemplo en .env.local.",
      },
      { status: 400 }
    );
  }

  try {
    // 1. Sembrar categorías
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
    }

    // 2. Sembrar productos y variantes
    for (const prod of INITIAL_PRODUCTS) {
      const created = await prisma.product.upsert({
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

      if (prod.variants && prod.variants.length > 0) {
        for (const v of prod.variants) {
          await prisma.productVariant.upsert({
            where: { id: v.id },
            update: {
              name: v.name,
              sku: v.sku || null,
              priceModifier: v.priceModifier || 0,
              stock: v.stock,
              productId: created.id,
            },
            create: {
              id: v.id,
              name: v.name,
              sku: v.sku || null,
              priceModifier: v.priceModifier || 0,
              stock: v.stock,
              productId: created.id,
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "¡Base de datos PostgreSQL sembrada exitosamente con el catálogo criollo de Los Troperos!",
      categoriesCount: INITIAL_CATEGORIES.length,
      productsCount: INITIAL_PRODUCTS.length,
    });
  } catch (error: any) {
    console.error("Error sembrando en PostgreSQL:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Error al sembrar en PostgreSQL: ${error?.message || String(error)}`,
      },
      { status: 500 }
    );
  }
}
