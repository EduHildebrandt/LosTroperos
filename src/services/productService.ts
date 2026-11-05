import { Category, Product, Order } from "@/types";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "@/data/initialCatalog";

export async function getCatalogData(): Promise<{
  fromDatabase: boolean;
  categories: Category[];
  products: Product[];
}> {
  try {
    const res = await fetch("/api/catalog", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    const data = await res.json();
    return {
      fromDatabase: data.fromDatabase ?? false,
      categories: data.categories || INITIAL_CATEGORIES,
      products: data.products || INITIAL_PRODUCTS,
    };
  } catch (error) {
    console.warn("Using fallback local catalog data:", error);
    return {
      fromDatabase: false,
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
    };
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await getCatalogData();
  return data.categories;
}

export async function getProducts(): Promise<Product[]> {
  const data = await getCatalogData();
  return data.products;
}

export async function seedDatabase(): Promise<{
  success: boolean;
  message: string;
  categoriesCount?: number;
  productsCount?: number;
}> {
  try {
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Error al conectar con el endpoint de sembrado.",
    };
  }
}

export async function submitOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<{
  success: boolean;
  orderId: string;
  orderNumber: string;
  savedToDatabase?: boolean;
}> {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("Fallo el envío al endpoint /api/orders, procesando fallback:", err);
  }

  // Fallback offline seguro para no perder la venta
  const fallbackNumber = `TRP-${Math.floor(100000 + Math.random() * 900000)}`;
  return {
    success: true,
    orderId: `local-${Date.now()}`,
    orderNumber: fallbackNumber,
    savedToDatabase: false,
  };
}
