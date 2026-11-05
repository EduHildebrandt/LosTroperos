"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    paymentMethod,
    setPaymentMethod,
    transferDiscountPercent,
    transferDiscountAmount,
    total,
    shipping,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfbf7] shadow-2xl flex flex-col border-l border-[#e2d5c0]">
          {/* Header */}
          <div className="p-5 border-b border-[#eadfcb] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg leather-gradient flex items-center justify-center text-amber-200 shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-base text-[#261b14]">
                  Tu Carrito Criollo
                </h2>
                <p className="text-xs text-[#7b5f4c]">
                  {items.length === 0
                    ? "Vacío por el momento"
                    : `${items.length} artículo${items.length > 1 ? "s" : ""} seleccionado${items.length > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#f0e8dc] text-[#8c5836] flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3d2314]">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explorá nuestras monturas patagónicas, cuchillos de autor, lazos y prendas regionales.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl leather-gradient text-amber-100 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => {
                    const variantExtra = item.selectedVariant?.priceModifier || 0;
                    const unitPrice = item.product.price + variantExtra;
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <div
                        key={`${item.product.id}-${item.selectedVariant?.id || "default"}`}
                        className="flex gap-3 p-3 bg-white rounded-xl border border-[#eadfcb] shadow-xs"
                      >
                        {/* Imagen miniatura */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden relative bg-stone-100 shrink-0 border border-[#dfd2be]">
                          <Image
                            src={item.product.images[0] || "/placeholder.jpg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Detalles */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-serif font-bold text-xs text-[#261b14] line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() =>
                                  removeFromCart(
                                    item.product.id,
                                    item.selectedVariant?.id
                                  )
                                }
                                className="text-stone-400 hover:text-red-600 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {item.selectedVariant && (
                              <span className="inline-block text-[10px] text-[#8c5836] bg-[#fbf5ee] px-1.5 py-0.5 rounded border border-[#e2d5c0] mt-0.5">
                                {item.selectedVariant.name}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#d6c7b2] rounded-lg bg-[#fbf9f5]">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.selectedVariant?.id
                                  )
                                }
                                className="p-1 hover:bg-[#eadfcb] text-stone-600 rounded-l-md transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-[#261b14]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.selectedVariant?.id
                                  )
                                }
                                className="p-1 hover:bg-[#eadfcb] text-stone-600 rounded-r-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-xs text-[#7b4224]">
                              ${itemTotal.toLocaleString("es-AR")}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selección de Método de Pago con Descuento del 15% */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#5c3716]">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      Medio de Pago
                    </span>
                    <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.2 rounded font-bold">
                      15% OFF Activo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("transfer")}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        paymentMethod === "transfer"
                          ? "border-[#7b4224] bg-white shadow-xs ring-1 ring-[#7b4224]"
                          : "border-amber-200/60 bg-amber-100/40 opacity-80"
                      }`}
                    >
                      <div className="font-bold text-[#3d2314] text-[11px]">
                        Transferencia Bancaria
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        -15% Descuento directo
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mercadopago")}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        paymentMethod === "mercadopago"
                          ? "border-[#7b4224] bg-white shadow-xs ring-1 ring-[#7b4224]"
                          : "border-amber-200/60 bg-amber-100/40 opacity-80"
                      }`}
                    >
                      <div className="font-bold text-[#3d2314] text-[11px]">
                        Mercado Pago / Tarjetas
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Precio de lista estándar
                      </div>
                    </button>
                  </div>
                </div>

                {/* Banner de Envío Bonificado */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span className="text-[11px]">
                      {shipping.isCalculated
                        ? `Envío a ${shipping.city}`
                        : "Envío Bonificado a toda Argentina"}
                    </span>
                  </div>
                  <span className="font-bold text-emerald-800 text-[11px]">
                    ¡GRATIS!
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer del Carrito */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#eadfcb] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#4a3528]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    ${subtotal.toLocaleString("es-AR")}
                  </span>
                </div>

                {paymentMethod === "transfer" && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Descuento Transferencia ({transferDiscountPercent}%):</span>
                    <span>-${transferDiscountAmount.toLocaleString("es-AR")}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Costo de flete estimado:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="line-through text-[11px] text-stone-400">
                      ${(shipping.originalCost || 12500).toLocaleString("es-AR")}
                    </span>
                    <span className="font-bold text-emerald-700">GRATIS</span>
                  </div>
                </div>

                <div className="border-t border-[#eadfcb] pt-2 flex justify-between items-baseline font-serif">
                  <span className="font-bold text-base text-[#261b14]">Total:</span>
                  <div className="text-right">
                    <span className="font-bold text-xl text-[#7b4224]">
                      ${total.toLocaleString("es-AR")}
                    </span>
                    {paymentMethod === "transfer" && (
                      <p className="text-[10px] text-emerald-700 font-sans font-bold">
                        Ahorrás ${transferDiscountAmount.toLocaleString("es-AR")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl leather-gradient text-amber-50 font-bold text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Continuar Compra</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra protegida y respaldada por Talabartería Los Troperos</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
