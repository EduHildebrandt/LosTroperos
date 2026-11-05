"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Check,
  Tag,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, transferDiscountPercent, shipping } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentPrice =
    product.price + (selectedVariant?.priceModifier || 0);

  const discountedTransferPrice = Math.round(
    currentPrice * (1 - transferDiscountPercent / 100)
  );

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    onClose();
  };

  const currentImage =
    product.images[selectedImageIndex] || product.images[0] || "/placeholder.jpg";

  const whatsappInquiryUrl = `https://wa.me/5492945532486?text=Hola%20Talabarter%C3%ADa%20Los%20Troperos,%20quer%C3%ADa%20consultarles%20por%20el%20art%C3%ADculo:%20*${encodeURIComponent(product.name)}*`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#fbf9f5] rounded-3xl max-w-3xl w-full border border-[#dfd2be] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna Izquierda: Galería de Fotos */}
          <div className="p-6 bg-[#f4eee4] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#dfd2be]">
            <div className="w-full h-80 relative rounded-2xl overflow-hidden shadow-inner bg-stone-200">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase gold-badge shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#3d2314]" />
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Miniaturas si hay más de 1 imagen */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-relative shrink-0 border-2 transition-all overflow-hidden ${
                      selectedImageIndex === idx
                        ? "border-[#7b4224] ring-2 ring-[#7b4224]/30"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[#dfd2be] text-[11px] text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Garantía de confección criolla en Esquel, Chubut</span>
            </div>
          </div>

          {/* Columna Derecha: Información y Compra */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-[#fdfbf7]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8c5836]">
                <span>{product.categoryName}</span>
                <span>&bull;</span>
                <span className="text-stone-500">{product.origin || "Patagonia Argentina"}</span>
              </div>

              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#261b14] leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Precios */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#261b14]">
                    ${currentPrice.toLocaleString("es-AR")}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ${product.compareAtPrice.toLocaleString("es-AR")}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold pt-1">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>
                    ${discountedTransferPrice.toLocaleString("es-AR")} pagando con Transferencia (15% OFF)
                  </span>
                </div>
              </div>

              {/* Selector de Variantes */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#4d2613]">
                    Seleccioná Opción / Medida:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex justify-between items-center transition-all ${
                          selectedVariant?.id === v.id
                            ? "border-[#7b4224] bg-white shadow-xs ring-1 ring-[#7b4224] font-bold text-[#261b14]"
                            : "border-[#e0d3bf] bg-white/60 text-stone-600 hover:bg-white"
                        }`}
                      >
                        <span>{v.name}</span>
                        {v.priceModifier ? (
                          <span className="text-stone-500 font-normal">
                            {v.priceModifier > 0 ? `+$${v.priceModifier.toLocaleString("es-AR")}` : `-$${Math.abs(v.priceModifier).toLocaleString("es-AR")}`}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Características Clave */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-[#4d2613] block">
                    Detalles y Materiales:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Estado de Envío */}
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>
                    {shipping.isCalculated
                      ? `Envío bonificado a ${shipping.city}`
                      : "Envío 100% bonificado a todo el país"}
                  </span>
                </div>
                <span className="font-bold text-emerald-800">¡GRATIS!</span>
              </div>
            </div>

            {/* Acciones de Compra */}
            <div className="space-y-2 pt-2 border-t border-[#dfd2be]">
              <div className="flex gap-2">
                {/* Selector Cantidad */}
                <div className="flex items-center border border-[#d6c7b2] rounded-xl bg-white px-3 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-500 hover:text-stone-900 px-1 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#261b14]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-stone-500 hover:text-stone-900 px-1 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl leather-gradient text-amber-50 font-bold text-xs shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  <span>Agregar al Carrito</span>
                </button>
              </div>

              {/* Botón WhatsApp */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Consultar por WhatsApp sobre esta pieza</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
