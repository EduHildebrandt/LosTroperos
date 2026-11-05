"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, ProductVariant, PaymentMethod } from "@/types";

interface ShippingState {
  postalCode: string;
  city: string;
  province: string;
  cost: number;
  originalCost: number;
  isFree: boolean;
  isCalculated: boolean;
  shippingOption: "delivery" | "pickup";
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  transferDiscountPercent: number;
  transferDiscountAmount: number;
  total: number;
  shipping: ShippingState;
  calculateShipping: (postalCode: string) => void;
  setShippingOption: (option: "delivery" | "pickup") => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "los_troperos_cart_v1";
const LOCAL_STORAGE_SHIPPING = "los_troperos_shipping_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");
  const transferDiscountPercent = 15;

  const [shipping, setShipping] = useState<ShippingState>({
    postalCode: "",
    city: "",
    province: "",
    cost: 0,
    originalCost: 0,
    isFree: true,
    isCalculated: false,
    shippingOption: "delivery",
  });

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedShipping = localStorage.getItem(LOCAL_STORAGE_SHIPPING);
      if (savedShipping) {
        setShipping(JSON.parse(savedShipping));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SHIPPING, JSON.stringify(shipping));
    } catch (e) {
      console.error("Failed to save shipping to localStorage", e);
    }
  }, [shipping]);

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [...prev, { product, selectedVariant: variant, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant?.id === variantId
          )
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedVariant?.id === variantId
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const calculateShipping = (cp: string) => {
    const trimmed = cp.trim();
    if (!trimmed) {
      setShipping({
        postalCode: "",
        city: "",
        province: "",
        cost: 0,
        originalCost: 0,
        isFree: true,
        isCalculated: false,
        shippingOption: "delivery",
      });
      return;
    }

    // Lógica inteligente: Si es Esquel (CP 9200) o Trevelin (9203), retiro o envío local bonificado
    if (trimmed === "9200" || trimmed === "9203") {
      setShipping({
        postalCode: trimmed,
        city: trimmed === "9200" ? "Esquel" : "Trevelin",
        province: "Chubut",
        cost: 0,
        originalCost: 4500,
        isFree: true,
        isCalculated: true,
        shippingOption: "delivery",
      });
      return;
    }

    // Otras localidades / Provincias de Argentina:
    // Calculamos un costo base de $9.500 pero con bonificación promocional del 100% por compra online
    setShipping({
      postalCode: trimmed,
      city: "Envío Nacional Correo / Transporte",
      province: "Argentina",
      cost: 0, // Bonificado al 100%
      originalCost: 12500,
      isFree: true,
      isCalculated: true,
      shippingOption: "delivery",
    });
  };

  const setShippingOption = (option: "delivery" | "pickup") => {
    setShipping((prev) => ({
      ...prev,
      shippingOption: option,
      cost: 0,
    }));
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const variantExtra = item.selectedVariant?.priceModifier || 0;
    const itemPrice = item.product.price + variantExtra;
    return acc + itemPrice * item.quantity;
  }, 0);

  const transferDiscountAmount =
    paymentMethod === "transfer"
      ? Math.round((subtotal * transferDiscountPercent) / 100)
      : 0;

  const total = Math.max(0, subtotal - transferDiscountAmount + shipping.cost);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        cartCount,
        subtotal,
        paymentMethod,
        setPaymentMethod,
        transferDiscountPercent,
        transferDiscountAmount,
        total,
        shipping,
        calculateShipping,
        setShippingOption,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
