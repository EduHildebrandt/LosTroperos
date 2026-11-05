export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  itemCount?: number;
}

export interface ProductVariant {
  id: string;
  name: string; // ej: "Cabo de Ciervo", "Hoja 14cm", "Talle 58"
  sku?: string;
  priceModifier?: number; // diferencia de precio si aplica
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  description: string;
  features: string[];
  price: number;
  compareAtPrice?: number;
  images: string[];
  stock: number;
  featured?: boolean;
  badge?: string; // ej: "Tradición Criolla", "Cuero Crudo", "Pieza Única"
  variants?: ProductVariant[];
  material?: string; // ej: "Cuero vacuno curtido al tanino", "Acero al carbono 1070"
  origin?: string; // ej: "Esquel, Chubut - Patagonia Argentina"
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export type PaymentMethod = "transfer" | "mercadopago" | "cash_on_pickup";

export interface ShippingData {
  postalCode: string;
  city: string;
  province: string;
  address?: string;
  shippingOption: "delivery" | "pickup";
  calculatedCost: number;
  isFreeShipping: boolean;
}

export interface CustomerData {
  fullName: string;
  email: string;
  phone: string;
  dni?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerData;
  shipping: ShippingData;
  items: {
    productId: string;
    productName: string;
    variantName?: string;
    price: number;
    quantity: number;
    subtotal: number;
    image: string;
  }[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: "pending_payment" | "confirmed" | "preparing" | "shipped" | "delivered";
  notes?: string;
}
