"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({
  product,
  onOpenDetail,
}: {
  product: Product;
  onOpenDetail: (prod: Product) => void;
}) {
  const { addToCart, transferDiscountPercent } = useCart();
  const [favorited, setFavorited] = useState(false);

  const discountedTransferPrice = Math.round(
    product.price * (1 - transferDiscountPercent / 100)
  );

  return (
    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-cuero-crudo/60 transition-all duration-300 flex flex-col justify-between">
      {/* Contenedor de Imagen */}
      <div
        onClick={() => onOpenDetail(product)}
        className="relative aspect-square w-full bg-surface-container overflow-hidden cursor-pointer"
      >
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Badge Superior Izquierdo */}
        <span
          className={`absolute top-3 left-3 font-label-sm text-label-sm px-2.5 py-1 rounded shadow-sm uppercase ${
            product.featured
              ? "bg-primary-container text-on-primary"
              : "bg-cuero-habano text-cuero-crudo"
          }`}
        >
          {product.badge || "Hecho a Mano"}
        </span>

        {/* Botón Favorito Superior Derecho */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFavorited(!favorited);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/90 hover:text-primary flex items-center justify-center transition-colors shadow-sm ${
            favorited ? "text-primary" : "text-cuero-habano"
          }`}
          title="Guardar en favoritos"
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              favorited ? "material-symbols-filled" : ""
            }`}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Información del Producto */}
      <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
        <div
          onClick={() => onOpenDetail(product)}
          className="space-y-space-xs cursor-pointer"
        >
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
            {product.categoryName}
          </span>
          <h3 className="font-headline-sm text-[1.125rem] text-cuero-habano group-hover:text-primary-container transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="pt-space-xs flex items-center justify-between border-t border-surface-container">
          <div className="flex flex-col">
            <span className="font-label-sm text-[11px] text-secondary">
              Precio Taller · ${discountedTransferPrice.toLocaleString("es-AR")} Transf.
            </span>
            <span className="font-title-lg text-title-lg font-bold text-cuero-habano">
              ${product.price.toLocaleString("es-AR")}{" "}
              <span className="text-xs font-normal text-on-surface-variant">
                ARS
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (product.variants && product.variants.length > 0) {
                onOpenDetail(product);
              } else {
                addToCart(product);
              }
            }}
            className="p-2.5 bg-primary text-on-primary hover:bg-bordo-profundo rounded-lg transition-colors flex items-center justify-center shadow-sm cursor-pointer"
            title={
              product.variants && product.variants.length > 0
                ? "Seleccionar medida / opción"
                : "Agregar al Carrito"
            }
          >
            <span className="material-symbols-outlined text-[18px]">
              shopping_bag
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
