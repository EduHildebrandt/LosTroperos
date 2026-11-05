import { NextResponse } from "next/server";
import { prisma, isPostgresConfigured } from "@/lib/prisma";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "@/data/initialCatalog";

export async function GET() {
  if (!isPostgresConfigured()) {
    return NextResponse.json({
      fromDatabase: false,
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
    });
  }

  try {
    const [categories, products] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
      prisma.product.findMany({
        include: {
          category: true,
          variants: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    if (!categories.length && !products.length) {
      return NextResponse.json({
        fromDatabase: false,
        categories: INITIAL_CATEGORIES,
        products: INITIAL_PRODUCTS,
      });
    }

    const formattedProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryId: p.categoryId,
      categoryName: p.category.name,
      description: p.description,
      features: p.features,
      price: p.price,
      compareAtPrice: p.compareAtPrice || undefined,
      images: p.images,
      stock: p.stock,
      featured: p.featured,
      badge: p.badge || undefined,
      material: p.material || undefined,
      origin: p.origin || "Esquel, Chubut - Patagonia Argentina",
      variants: p.variants.map((v) => ({
        id: v.id,
        name: v.name,
        sku: v.sku || undefined,
        priceModifier: v.priceModifier,
        stock: v.stock,
      })),
    }));

    return NextResponse.json({
      fromDatabase: true,
      categories,
      products: formattedProducts,
    });
  } catch (error) {
    console.warn("Error leyendo de PostgreSQL, usando fallback criollo:", error);
    return NextResponse.json({
      fromDatabase: false,
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
    });
  }
}
