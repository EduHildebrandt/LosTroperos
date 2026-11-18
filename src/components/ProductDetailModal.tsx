"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";

const CURTIDO_OPTIONS = [
  { id: "tanino", label: "Tostada Tanino", fullName: "Suela Tostada al Tanino", color: "#A05A2C" },
  { id: "oscura", label: "Engrasada Oscura", fullName: "Suela Engrasada Oscura", color: "#3E2723" },
  { id: "morocho", label: "Vaqueta Morocho", fullName: "Vaqueta Marrón Morocho", color: "#5D4600" },
];

export default function ProductDetailModal({
  product,
  allProducts = [],
  onSelectProduct,
  onClose,
}: {
  product: Product | null;
  allProducts?: Product[];
  onSelectProduct?: (prod: Product) => void;
  onClose: () => void;
}) {
  const { addToCart, transferDiscountPercent } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCurtido, setSelectedCurtido] = useState(CURTIDO_OPTIONS[0]);
  const [addonMonograma, setAddonMonograma] = useState(false);
  const [monogramaText, setMonogramaText] = useState("");
  const [addonMarca, setAddonMarca] = useState(false);
  const [marcaText, setMarcaText] = useState("");
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product?.id]);

  if (!product) return null;

  const addonExtra =
    (addonMonograma ? 18000 : 0) + (addonMarca ? 24000 : 0);

  const currentPrice =
    product.price + (selectedVariant?.priceModifier || 0) + addonExtra;

  const discountedTransferPrice = Math.round(
    currentPrice * (1 - transferDiscountPercent / 100)
  );

  const installmentPrice = Math.round(currentPrice / 6);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, 1);
  };

  const currentImage =
    product.images[selectedImageIndex] || product.images[0] || "/placeholder.jpg";

  const skuCode = `#LT-${product.id
    .split("-")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 4)}-084`;

  const whatsappInquiryUrl = `https://wa.me/5492945532486?text=${encodeURIComponent(
    `Hola Talabartería Los Troperos, quería consultarles por la pieza: *${product.name}*${
      selectedVariant ? ` (${selectedVariant.name})` : ""
    }`
  )}`;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface animate-in fade-in duration-200">
      {/* BREADCRUMB & HEADER METADATA */}
      <div className="w-full bg-surface-container-low py-space-sm px-gutter-mobile lg:px-gutter border-b border-cuero-crudo/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-space-xs"
          >
            <button
              type="button"
              onClick={onClose}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">
              chevron_right
            </span>
            <button
              type="button"
              onClick={onClose}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Catálogo / Tienda
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">
              chevron_right
            </span>
            <button
              type="button"
              onClick={onClose}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {product.categoryName}
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">
              chevron_right
            </span>
            <span className="text-cuero-habano font-semibold">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-space-md">
            <span className="hidden sm:inline-flex items-center gap-1 text-bronce-envejecido font-label-sm text-label-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">
                history_edu
              </span>{" "}
              Pieza Catalogada • Esquel, Patagonia
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cuero-habano text-cuero-crudo hover:bg-primary font-label-sm text-label-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                arrow_back
              </span>
              Volver al Catálogo
            </button>
          </div>
        </div>
      </div>

      {/* MAIN PRODUCT SECTION: 2 COLUMNS BESPOKE LAYOUT */}
      <section className="w-full py-space-xl px-gutter-mobile lg:px-gutter">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* COLUMNA IZQUIERDA: GALERÍA DE AUTOR & CERTIFICACIONES (7 COL) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Contenedor Principal de la Imagen Hero */}
            <div className="relative w-full rounded-lg bg-surface-container overflow-hidden shadow-md group border border-cuero-crudo">
              {/* Badges de Autor Flotantes */}
              <div className="absolute top-space-md left-space-md z-10 flex flex-col gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-bordo-profundo/95 text-cuero-crudo font-label-sm text-label-sm tracking-wider uppercase shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-secondary-container">
                    workspace_premium
                  </span>
                  Obra de Autor
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cuero-habano/90 text-cuero-crudo font-label-sm text-label-sm tracking-wider uppercase backdrop-blur-sm shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                    verified
                  </span>
                  Certificado de Taller #084
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm tracking-wider uppercase shadow-sm">
                  {product.badge || "Pieza Única Disponible"}
                </span>
              </div>

              {/* Zoom hint */}
              <div className="absolute top-space-md right-space-md z-10 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-carbon-charcoal/70 text-cuero-crudo font-label-sm text-label-sm backdrop-blur-sm">
                <span className="material-symbols-outlined text-[15px]">
                  zoom_in
                </span>
                <span>Detalle 1:1</span>
              </div>

              {/* Imagen Principal */}
              <div className="w-full aspect-[4/3] bg-surface-container-high overflow-hidden relative">
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 750px"
                />
              </div>

              {/* Pie de Foto Técnico */}
              <div className="px-space-md py-space-sm bg-surface-container-high/60 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm border-t border-cuero-crudo">
                <span className="italic font-headline-sm text-[0.875rem] text-cuero-habano">
                  Fotografía real de pieza en nuestro taller de talabartería
                </span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-outline">
                  Esquel, Chubut
                </span>
              </div>
            </div>

            {/* Tira de Miniaturas Seleccionables */}
            {product.images.length > 0 && (
              <div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative rounded overflow-hidden aspect-square bg-surface-container-high shadow-sm transition-all p-0.5 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "ring-2 ring-primary opacity-100"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} vista ${idx + 1}`}
                      fill
                      className="object-contain p-1 rounded-sm"
                      sizes="140px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Acciones Directas de la Galería */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
              <div className="flex items-center gap-space-sm">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-surface-container hover:bg-surface-container-high text-cuero-habano font-label-md text-label-md transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    description
                  </span>
                  Certificado de Autenticidad
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-surface-container hover:bg-surface-container-high text-cuero-habano font-label-md text-label-md transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    share
                  </span>
                  {copiedShare ? "¡Enlace Copiado!" : "Compartir"}
                </button>
              </div>
              <a
                className="inline-flex items-center gap-1.5 text-cuero-suela hover:text-primary font-label-md text-label-md underline underline-offset-4 transition-colors"
                href={whatsappInquiryUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">
                  videocam
                </span>
                Solicitar video en detalle en alta resolución
              </a>
            </div>

            {/* Destacado de Maestro Guarnicionero */}
            <div className="mt-space-md p-space-md rounded-lg bg-surface-container-low shadow-sm border border-cuero-crudo flex items-center gap-space-md">
              <div className="w-14 h-14 rounded-full bg-cuero-habano shrink-0 flex items-center justify-center text-cuero-crudo font-headline-sm text-headline-sm">
                LT
              </div>
              <div className="flex-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-bronce-envejecido block">
                  Mano de Obra Certificada
                </span>
                <h4 className="font-headline-sm text-[1.125rem] text-cuero-habano">
                  Talabartería Los Troperos • Maestro Talabartero
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dante Brozzi 669, Esquel, Chubut. Cada ojal, costura al tiento
                  y rebaje de suela ha sido supervisado bajo estándares criollos
                  tradicionales.
                </p>
              </div>
              <div className="hidden sm:block text-right">
                <span className="material-symbols-outlined text-[32px] text-bronce-envejecido">
                  shield_with_heart
                </span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: COMPRA, PRECIOS & PERSONALIZACIÓN DE AUTOR (5 COL) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Bloque Identificador */}
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                <span>Tradición de Esquel, Patagonia</span>
                <span className="font-mono text-outline">SKU: {skuCode}</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-cuero-habano tracking-tight">
                {product.name}
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {product.description}
              </p>

              {/* Reseñas Camperas */}
              <div className="flex items-center gap-space-sm pt-space-xs">
                <div className="flex items-center text-bronce-envejecido">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined material-symbols-filled text-[18px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="font-label-md text-label-md text-cuero-habano font-bold">
                  5.0
                </span>
                <span className="text-outline text-label-sm">•</span>
                <a
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2"
                  href="#opiniones"
                >
                  18 testimonios de jinetes y estancieros
                </a>
              </div>
            </div>

            {/* Tarjeta de Precio & Facilidades */}
            <div className="p-space-md rounded-lg bg-surface-container shadow-sm border border-cuero-crudo space-y-space-sm">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <span className="font-headline-lg text-[2.25rem] text-bordo-profundo font-bold leading-none">
                  ${currentPrice.toLocaleString("es-AR")}{" "}
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                    ARS
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  15% OFF Transferencia
                </span>
              </div>
              <div className="space-y-space-xs font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs text-cuero-habano font-semibold">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    credit_card
                  </span>
                  <span>
                    6 cuotas sin interés de{" "}
                    <span className="font-bold text-primary">
                      ${installmentPrice.toLocaleString("es-AR")} ARS
                    </span>{" "}
                    con todas las tarjetas
                  </span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-bronce-envejecido text-[18px]">
                    account_balance
                  </span>
                  <span>
                    Precio especial por transferencia directa:{" "}
                    <strong className="text-cuero-habano">
                      ${discountedTransferPrice.toLocaleString("es-AR")} ARS
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Configuración 1: Curtido & Acabado */}
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-cuero-habano uppercase tracking-wider font-semibold">
                  Terminación / Tono de Taller:
                </label>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  {selectedCurtido.fullName}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-xs sm:gap-space-sm">
                {CURTIDO_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCurtido(c)}
                    className={`flex flex-col items-center gap-1.5 p-space-sm rounded bg-surface-container hover:bg-surface-container-high text-center transition-all cursor-pointer ${
                      selectedCurtido.id === c.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full shadow-inner"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="font-label-sm text-label-sm text-cuero-habano font-semibold">
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Configuración 2: Variantes / Medidas del Producto */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-cuero-habano uppercase tracking-wider font-semibold">
                    Opción / Medida Disponible:
                  </label>
                  <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      straighten
                    </span>{" "}
                    Guía de taller
                  </span>
                </div>
                <div
                  className={`grid gap-space-xs sm:gap-space-sm ${
                    product.variants.length > 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3"
                  }`}
                >
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`py-2.5 px-2 rounded bg-surface-container hover:bg-surface-container-high text-center font-label-md text-label-md text-cuero-habano transition-all cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? "ring-2 ring-primary font-bold"
                          : ""
                      }`}
                    >
                      <span className="block">{v.name}</span>
                      {v.priceModifier ? (
                        <span className="block text-[10px] text-secondary font-normal">
                          {v.priceModifier > 0
                            ? `+$${v.priceModifier.toLocaleString("es-AR")}`
                            : `-$${Math.abs(v.priceModifier).toLocaleString("es-AR")}`}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Opciones de Personalización de Autor (Add-ons) */}
            <div className="p-space-md rounded-lg bg-surface-container-low space-y-space-sm shadow-sm border border-cuero-crudo">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  brush
                </span>
                <span className="font-label-md text-label-md text-cuero-habano uppercase font-bold tracking-wider">
                  Personalizaciones Criollas a Pedido
                </span>
              </div>
              <div className="space-y-space-sm">
                {/* Addon 1: Monograma */}
                <label className="flex items-start gap-space-sm cursor-pointer select-none">
                  <input
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    checked={addonMonograma}
                    onChange={(e) => setAddonMonograma(e.target.checked)}
                    type="checkbox"
                  />
                  <div className="flex-1 font-body-sm text-body-sm">
                    <span className="text-cuero-habano font-semibold block">
                      Cincelado de iniciales o monograma personalizado
                    </span>
                    <span className="text-on-surface-variant text-[0.75rem]">
                      Grabado en bajorrelieve tradicional artesanal (+ $18.000
                      ARS)
                    </span>
                  </div>
                </label>
                {addonMonograma && (
                  <div className="pl-6 pt-1">
                    <input
                      value={monogramaText}
                      onChange={(e) => setMonogramaText(e.target.value)}
                      className="w-full px-space-sm py-1.5 rounded bg-surface-container-lowest border border-cuero-crudo font-body-sm text-body-sm text-cuero-habano placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      maxLength={6}
                      placeholder="Ej: J.A.M. (Hasta 5 letras)"
                      type="text"
                    />
                  </div>
                )}

                {/* Addon 2: Marca de Ganado */}
                <label className="flex items-start gap-space-sm cursor-pointer select-none">
                  <input
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    checked={addonMarca}
                    onChange={(e) => setAddonMarca(e.target.checked)}
                    type="checkbox"
                  />
                  <div className="flex-1 font-body-sm text-body-sm">
                    <span className="text-cuero-habano font-semibold block">
                      Grabado a fuego de marca de estancia o hacienda
                    </span>
                    <span className="text-on-surface-variant text-[0.75rem]">
                      Aplicado con hierro caliente sobre cuero (+ $24.000 ARS)
                    </span>
                  </div>
                </label>
                {addonMarca && (
                  <div className="pl-6 pt-1">
                    <input
                      value={marcaText}
                      onChange={(e) => setMarcaText(e.target.value)}
                      className="w-full px-space-sm py-1.5 rounded bg-surface-container-lowest border border-cuero-crudo font-body-sm text-body-sm text-cuero-habano placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      placeholder="Nombre de estancia / Adjuntar diseño por WhatsApp"
                      type="text"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Disponibilidad & Plazos */}
            <div className="flex items-center gap-space-sm px-space-sm py-2 rounded bg-surface-container font-body-sm text-body-sm text-cuero-habano">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span>
                <strong>Pieza disponible en taller</strong> — Lista para
                despacho desde Esquel en 24hs (15 días si lleva marca grabada a
                fuego).
              </span>
            </div>

            {/* Botones de Acción Principales */}
            <div className="space-y-space-xs pt-space-xs">
              <button
                onClick={handleAddToCart}
                className="w-full py-space-md px-space-lg rounded bg-primary hover:bg-bordo-profundo text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-space-sm group cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
                  shopping_bag
                </span>
                <span>Comprar Pieza de Autor Ahora</span>
              </button>
              <a
                className="w-full py-space-sm px-space-md rounded bg-cuero-habano hover:bg-carbon-charcoal text-cuero-crudo font-label-md text-label-md uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center justify-center gap-space-sm"
                href={whatsappInquiryUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                  chat
                </span>
                <span>Consultar con el Maestro Talabartero</span>
                <span className="text-[0.6875rem] opacity-75 font-normal lowercase">
                  (responde en ~1h)
                </span>
              </a>
            </div>

            {/* Garantías e Información de Envío Campero */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <div className="p-space-xs rounded bg-surface-container flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                  inventory_2
                </span>
                <span className="font-label-sm text-label-sm font-bold text-cuero-habano">
                  Cajón Criollo
                </span>
                <span className="text-[0.75rem]">Madera &amp; arpillera</span>
              </div>
              <div className="p-space-xs rounded bg-surface-container flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                  verified_user
                </span>
                <span className="font-label-sm text-label-sm font-bold text-cuero-habano">
                  Garantía Vitalicia
                </span>
                <span className="text-[0.75rem]">En costuras y tientos</span>
              </div>
              <div className="p-space-xs rounded bg-surface-container flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                  local_shipping
                </span>
                <span className="font-label-sm text-label-sm font-bold text-cuero-habano">
                  Envío Seguro
                </span>
                <span className="text-[0.75rem]">Todo el país con seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-SELLING: PIEZAS QUE COMPLETAN ESTE APERO (4 TARJETAS) */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-space-xl px-gutter-mobile lg:px-gutter bg-surface border-t border-cuero-crudo/50">
          <div className="max-w-7xl mx-auto space-y-space-lg">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Combinaciones Recomendadas de Taller
                </span>
                <h3 className="font-headline-lg text-headline-lg text-cuero-habano">
                  Piezas que Completan este Apero
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                Ver toda la talabartería y cuchillería
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {relatedProducts.map((rel) => {
                const relInstallment = Math.round(rel.price / 6);
                return (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct && onSelectProduct(rel)}
                    className="rounded-lg bg-surface-container-lowest p-space-sm shadow-sm hover:shadow-md border border-cuero-crudo/60 transition-shadow flex flex-col group cursor-pointer"
                  >
                    <div className="w-full aspect-square rounded overflow-hidden bg-surface-container-high relative">
                      <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-cuero-habano/90 text-cuero-crudo font-label-sm text-[0.625rem] tracking-wider uppercase">
                        {rel.badge || "Taller Esquel"}
                      </span>
                      <Image
                        src={rel.images[0] || "/placeholder.jpg"}
                        alt={rel.name}
                        fill
                        className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                        sizes="280px"
                      />
                    </div>
                    <div className="pt-space-sm flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-secondary uppercase">
                          {rel.categoryName}
                        </span>
                        <h4 className="font-headline-sm text-[1.125rem] text-cuero-habano group-hover:text-primary transition-colors line-clamp-1">
                          {rel.name}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                          {rel.description}
                        </p>
                      </div>
                      <div className="pt-space-sm flex items-center justify-between">
                        <div>
                          <span className="font-title-md text-title-md text-bordo-profundo font-bold">
                            ${rel.price.toLocaleString("es-AR")} ARS
                          </span>
                          <span className="block font-label-sm text-[0.6875rem] text-outline">
                            6 cuotas de ${relInstallment.toLocaleString("es-AR")}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(rel);
                          }}
                          className="p-2 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-cuero-habano transition-colors cursor-pointer"
                          title="Agregar al apero"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            add_shopping_cart
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN DE TESTIMONIOS Y EXPERIENCIA CAMPERA */}
      <section
        className="w-full py-space-xl bg-surface-container-low px-gutter-mobile lg:px-gutter"
        id="opiniones"
      >
        <div className="max-w-7xl mx-auto space-y-space-lg">
          <div className="flex flex-col items-center text-center space-y-space-xs max-w-xl mx-auto">
            <span className="font-label-sm text-label-sm text-bronce-envejecido uppercase tracking-widest">
              Testimonios de Campo &amp; Destrezas
            </span>
            <h3 className="font-headline-lg text-headline-lg text-cuero-habano">
              La Palabra de Quienes Galopan con Los Troperos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="p-space-lg rounded-lg bg-surface shadow-sm border border-cuero-crudo space-y-space-sm flex flex-col justify-between">
              <div className="space-y-space-xs">
                <div className="flex items-center text-bronce-envejecido">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined material-symbols-filled text-[16px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <h4 className="font-headline-sm text-[1.125rem] text-cuero-habano">
                  «La nobleza del cuero aguanta el rigor de la cordillera»
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  «En la cordillera el clima no perdona. Este apero lo usamos
                  para arriar en veranada y subir a la piedra; el cuero curtido
                  al tanino y los tientos sobados se amoldan perfecto al lomo
                  sin pasmarse con la helada. Una obra de primera.»
                </p>
              </div>
              <div className="pt-space-sm flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-cuero-habano text-cuero-crudo font-label-sm text-label-sm flex items-center justify-center font-bold">
                  LW
                </div>
                <div>
                  <span className="font-label-sm text-label-sm font-bold text-cuero-habano block">
                    Don Lautaro Williams
                  </span>
                  <span className="text-[0.6875rem] text-outline">
                    Estancia Huemules, Esquel (Chubut)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-space-lg rounded-lg bg-surface shadow-sm border border-cuero-crudo space-y-space-sm flex flex-col justify-between">
              <div className="space-y-space-xs">
                <div className="flex items-center text-bronce-envejecido">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined material-symbols-filled text-[16px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <h4 className="font-headline-sm text-[1.125rem] text-cuero-habano">
                  «El calce y la cincha firmes en subidas bravas»
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  «Llegó el cajón campero impecable por transporte hasta Esquel.
                  La postura de los bastos y la bajada de estribos dan una
                  firmeza bárbara para andar en mallines y cañadones. Muy
                  agradecido por el trato.»
                </p>
              </div>
              <div className="pt-space-sm flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-cuero-habano text-cuero-crudo font-label-sm text-label-sm flex items-center justify-center font-bold">
                  RN
                </div>
                <div>
                  <span className="font-label-sm text-label-sm font-bold text-cuero-habano block">
                    Rodrigo Nahuelpán
                  </span>
                  <span className="text-[0.6875rem] text-outline">
                    Cabaña Leleque, Cushamen (Chubut)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-space-lg rounded-lg bg-surface shadow-sm border border-cuero-crudo space-y-space-sm flex flex-col justify-between">
              <div className="space-y-space-xs">
                <div className="flex items-center text-bronce-envejecido">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined material-symbols-filled text-[16px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <h4 className="font-headline-sm text-[1.125rem] text-cuero-habano">
                  «Terminación criolla con estampa de desfile y campo»
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  «Lo lucí en la Fiesta del Caballo y en las jineteadas de la
                  zona cordillerana. La virola y el marcado a fuego en la carona
                  quedaron con una precisión impecable. Digno de herencia
                  familiar.»
                </p>
              </div>
              <div className="pt-space-sm flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-cuero-habano text-cuero-crudo font-label-sm text-label-sm flex items-center justify-center font-bold">
                  BO
                </div>
                <div>
                  <span className="font-label-sm text-label-sm font-bold text-cuero-habano block">
                    Bautista Ortiz de Rozas
                  </span>
                  <span className="text-[0.6875rem] text-outline">
                    Establecimiento La Primavera, San Carlos de Bariloche (Río
                    Negro)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
