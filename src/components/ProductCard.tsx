"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Eye, Tag, Sparkles } from "lucide-react";

export default function ProductCard({
  product,
  onOpenDetail,
}: {
  product: Product;
  onOpenDetail: (prod: Product) => void;
}) {
  const { addToCart, transferDiscountPercent } = useCart();

  const discountedTransferPrice = Math.round(
    product.price * (1 - transferDiscountPercent / 100)
  );

  return (
    <div className="group bg-white rounded-2xl border border-[#eadfcb] shadow-xs hover:shadow-xl hover:border-[#bfa182] transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badge Flotante Superior */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase gold-badge shadow-sm">
            <Sparkles className="w-3 h-3 text-[#3d2314]" />
            {product.badge}
          </span>
        </div>
      )}

      {/* Contenedor de Imagen */}
      <div
        onClick={() => onOpenDetail(product)}
        className="w-full h-64 relative bg-[#f7f3ec] overflow-hidden cursor-pointer"
      >
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

        {/* Botón flotante para ver detalle */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="p-2.5 rounded-xl bg-white/95 text-[#3d2314] shadow-md hover:bg-white active:scale-95 transition-all text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5 text-[#7b4224]" />
            <span>Ver Ficha</span>
          </button>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#fdfbf7]">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#8c5836] font-semibold">
            <span>{product.categoryName}</span>
            <span className="text-stone-400 font-normal">
              {product.origin || "Esquel, Chubut"}
            </span>
          </div>

          <h3
            onClick={() => onOpenDetail(product)}
            className="font-serif font-bold text-base text-[#261b14] line-clamp-2 cursor-pointer hover:text-[#7b4224] transition-colors leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Precios y Descuento */}
        <div className="pt-2 border-t border-[#eadfcb]/60 space-y-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-black text-xl text-[#261b14]">
                ${product.price.toLocaleString("es-AR")}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ${product.compareAtPrice.toLocaleString("es-AR")}
                </span>
              )}
            </div>

            {/* Precio con Transferencia */}
            <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold mt-0.5">
              <Tag className="w-3 h-3 text-emerald-600" />
              <span>
                <strong>${discountedTransferPrice.toLocaleString("es-AR")}</strong> con transf. (15% OFF)
              </span>
            </div>
          </div>

          {/* Botón de Compra Rápida */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                if (product.variants && product.variants.length > 0) {
                  onOpenDetail(product);
                } else {
                  addToCart(product);
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl leather-gradient text-amber-50 font-bold text-xs shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {product.variants && product.variants.length > 0
                  ? "Seleccionar Opción"
                  : "Comprar Ahora"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
