"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Product, Category } from "@/types";
import { getCatalogData } from "@/services/productService";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [showAllCatalog, setShowAllCatalog] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCatalogData();
        setCategories(data.categories);
        setProducts(data.products);
      } catch (e) {
        console.error("Failed to load catalog data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleProducts =
    showAllCatalog || selectedCategory !== "all" || searchTerm !== ""
      ? filteredProducts
      : filteredProducts.slice(0, 8);

  const flagshipProduct =
    products.find((p) => p.id === "juego-basto-brasilero") || products[0];

  const handleCategoryBentoClick = (catId: string) => {
    setSelectedCategory(catId);
    setShowAllCatalog(true);
    const el = document.getElementById("catalogo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header
        onSearchChange={(val) => {
          setSearchTerm(val);
          if (detailProduct && val.trim()) {
            setDetailProduct(null);
          }
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigateHome={() => setDetailProduct(null)}
      />

      <main className="w-full pt-28 bg-surface flex-1">
        {detailProduct ? (
          <ProductDetailModal
            key={detailProduct.id}
            product={detailProduct}
            allProducts={products}
            onSelectProduct={setDetailProduct}
            onClose={() => setDetailProduct(null)}
          />
        ) : (
          <div className="flex flex-col w-full">
            {/* HERO PRINCIPAL */}
            <section className="relative w-full overflow-hidden bg-cuero-habano text-cuero-crudo -mt-28 pt-36 pb-24 lg:pb-32 px-gutter-mobile lg:px-gutter">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcF78cm8C0uuzVwBKZhN530MRkeynWCy1Mf5YleKWdkCbjnWYDrJyk--oXGPiH0LY8UeoMIpIqbgXWZd2GG0cM1DWLMFhJUMolMLIiGAY0EOFkkJ3QPPaAR-slGK7aFuxEiMKoJnqJ825c5U6zRiGZIBNkuWZqK_PmMb72AQaWbirEqvZI1DbFDdU1vife5VuKW8-j4rcf3fFCYrY0x0OSDYGlDmxT1oupr-fkPP2n')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cuero-habano via-cuero-habano/70 to-cuero-habano/30" />

              <div className="relative max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl">
                <div className="w-full lg:max-w-2xl space-y-space-md">
                  <div className="inline-flex items-center gap-space-xs px-3 py-1 bg-surface-container-high/20 rounded-full backdrop-blur-md text-bronce-envejecido">
                    <span className="material-symbols-outlined text-[16px]">
                      workspace_premium
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-cuero-crudo">
                      Talabartería Tradicional Argentina • Esquel, Chubut
                    </span>
                  </div>

                  <h1 className="font-headline-lg text-headline-lg lg:font-display lg:text-display text-surface-bright tracking-tight leading-none">
                    El Arte Criollo <br />
                    <span className="italic font-normal text-tertiary-fixed">
                      Hecho a Mano
                    </span>
                  </h1>

                  <p className="font-body-lg text-body-lg text-cuero-crudo/90 max-w-xl leading-relaxed">
                    Tradición, estirpe y nobleza en piezas de cuero genuino
                    trabajadas una a una para el hombre de a caballo y
                    apasionados de las costumbres de nuestra tierra.
                  </p>

                  <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
                    <a
                      className="px-space-lg py-space-md bg-primary hover:bg-bordo-profundo text-on-primary font-label-lg text-label-lg uppercase tracking-wider rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-space-xs"
                      href="#catalogo"
                    >
                      <span>Ver Catálogo Completo</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </a>
                    <a
                      className="px-space-lg py-space-md bg-transparent hover:bg-surface-bright/10 text-surface-bright font-label-lg text-label-lg uppercase tracking-wider rounded-lg transition-all flex items-center gap-space-xs"
                      href="#encargos"
                    >
                      <span className="material-symbols-outlined text-bronce-envejecido text-[18px]">
                        handyman
                      </span>
                      <span>Encargar a Medida</span>
                    </a>
                  </div>

                  <div className="pt-space-md grid grid-cols-3 gap-space-md max-w-md">
                    <div className="flex flex-col">
                      <span className="font-headline-md text-headline-md text-tertiary-fixed">
                        45+
                      </span>
                      <span className="font-label-sm text-label-sm uppercase text-cuero-crudo/70 tracking-wider">
                        Años de Taller
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-md text-headline-md text-tertiary-fixed">
                        100%
                      </span>
                      <span className="font-label-sm text-label-sm uppercase text-cuero-crudo/70 tracking-wider">
                        Cuero Seleccionado
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-md text-headline-md text-tertiary-fixed">
                        3.8k
                      </span>
                      <span className="font-label-sm text-label-sm uppercase text-cuero-crudo/70 tracking-wider">
                        Aperos en el Campo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Insignia Flotante & Card Destacada */}
                <div className="w-full lg:w-auto relative flex justify-center lg:justify-end">
                  <div className="relative bg-surface-container-high/95 text-on-surface p-space-lg rounded-xl shadow-2xl backdrop-blur-md max-w-sm">
                    <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-primary-container text-on-primary p-2 flex flex-col items-center justify-center text-center shadow-lg rotate-12 z-10">
                      <span className="material-symbols-outlined text-[20px]">
                        stars
                      </span>
                      <span className="font-label-sm text-[9px] uppercase font-bold leading-tight mt-0.5">
                        Sello de Origen Esquel
                      </span>
                    </div>

                    <div className="w-full h-56 rounded-lg overflow-hidden bg-surface-variant relative mb-space-md">
                      <img
                        className="w-full h-full object-cover"
                        alt="Juego de Basto Brasilero Completo"
                        src="/images/products/juego-basto-brasilero.jpg"
                      />
                      <span className="absolute bottom-2 left-2 bg-cuero-habano/85 backdrop-blur-xs text-cuero-crudo font-label-sm text-label-sm px-2 py-0.5 rounded">
                        Pieza Insignia
                      </span>
                    </div>

                    <div className="space-y-space-xs">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                        Trabajo de Colección
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-cuero-habano">
                        Juego de Basto Brasilero Completo
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Cuero vacuno flor grabado a mano con encimera,
                        estriberas reforzadas y correones labrados.
                      </p>
                    </div>

                    <div className="mt-space-md pt-space-sm flex items-center justify-between border-t border-cuero-crudo">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[11px] text-secondary">
                          Edición de Taller
                        </span>
                        <span className="font-title-lg text-title-lg text-primary-container font-bold">
                          $345.000{" "}
                          <span className="text-xs font-normal text-on-surface-variant">
                            ARS
                          </span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (flagshipProduct) {
                            setDetailProduct(flagshipProduct);
                          }
                        }}
                        className="px-space-md py-1.5 bg-cuero-habano text-cuero-crudo hover:bg-carbon-charcoal font-label-md text-label-md uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        Explorar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BANDA DE VALORES ARTESANALES */}
            <section className="w-full bg-surface-container py-space-md px-gutter-mobile lg:px-gutter border-b border-cuero-crudo/60">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-space-md">
                <div className="flex items-center gap-space-sm p-space-sm">
                  <span className="material-symbols-outlined text-primary-container text-[28px]">
                    local_shipping
                  </span>
                  <div>
                    <h4 className="font-title-md text-title-md text-cuero-habano leading-tight">
                      Envíos a Todo el País
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Embalaje reforzado y seguro
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm p-space-sm">
                  <span className="material-symbols-outlined text-primary-container text-[28px]">
                    credit_card
                  </span>
                  <div>
                    <h4 className="font-title-md text-title-md text-cuero-habano leading-tight">
                      15% OFF / 6 Cuotas
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Por transferencia o tarjetas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm p-space-sm">
                  <span className="material-symbols-outlined text-primary-container text-[28px]">
                    verified_user
                  </span>
                  <div>
                    <h4 className="font-title-md text-title-md text-cuero-habano leading-tight">
                      Garantía Criolla Escrita
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Respaldo de taller de por vida
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm p-space-sm">
                  <span className="material-symbols-outlined text-primary-container text-[28px]">
                    support_agent
                  </span>
                  <div>
                    <h4 className="font-title-md text-title-md text-cuero-habano leading-tight">
                      Atención Guarnicionera
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Asesoramiento directo en Esquel
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CATEGORÍAS PRINCIPALES - MOSAICO DISRUPTIVO */}
            <section
              className="w-full py-space-xl px-gutter-mobile lg:px-gutter bg-surface"
              id="categorias"
            >
              <div className="max-w-7xl mx-auto space-y-space-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div>
                    <span className="font-label-md text-label-md text-secondary uppercase tracking-widest block mb-space-xs">
                      Nuestros Trabajos
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-cuero-habano tracking-tight">
                      Ramas del Oficio Criollo
                    </h2>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    Especialidades tradicionales concebidas con cueros vacunos
                    de primerísima selección, curtido vegetal y fornituras
                    forjadas a mano.
                  </p>
                </div>

                {/* Bento Grid de Categorías */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-space-md">
                  {/* Categoría 1: Aperos & Recados (7 cols) */}
                  <button
                    type="button"
                    onClick={() => handleCategoryBentoClick("aperos-monturas")}
                    className="group relative rounded-xl overflow-hidden bg-cuero-habano lg:col-span-7 h-96 flex flex-col justify-end p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDC9s3C_XsJjIdNRZErEI3Ld6FwMVADZqoej6UN5wF7huAs61sHXnXfJF7D7mwf3jCazcg906O4ncJs5dmi_zPSjM5NEhcHFbAALGxpDySPGw5isVBifvc4CzTczGOlQV9LnJhNAYFo9OVZ4nBrIn6Ev8dPCX8Q4-VjrGenP5mpj6P1asgSefd35dfVJUNbRZ8SJ8Y43cf-OI114RfZQZVHrERFxSPW0Edp7yTO251')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cuero-habano via-cuero-habano/60 to-transparent" />
                    <div className="relative z-10 space-y-space-xs text-cuero-crudo">
                      <span className="inline-block bg-primary text-on-primary font-label-sm text-label-sm uppercase px-2 py-0.5 rounded">
                        Especialidad de la Casa
                      </span>
                      <h3 className="font-headline-md text-headline-md text-surface-bright group-hover:text-tertiary-fixed transition-colors">
                        Aperos, Bastos &amp; Cangallas
                      </h3>
                      <p className="font-body-sm text-body-sm text-cuero-crudo/80 max-w-lg">
                        Bastos brasileros grabados, bastos criollos al tiento,
                        juegos de recado completos y cangallas reforzadas de
                        caño y fierro.
                      </p>
                      <span className="inline-flex items-center gap-space-xs font-label-md text-label-md text-tertiary-fixed pt-space-xs">
                        Ver colección completa{" "}
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </button>

                  {/* Categoría 2: Cuchillería Criolla (5 cols) */}
                  <button
                    type="button"
                    onClick={() => handleCategoryBentoClick("cuchilleria")}
                    className="group relative rounded-xl overflow-hidden bg-cuero-habano lg:col-span-5 h-96 flex flex-col justify-end p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0sZ8s1C__bxQ09q2maXTnaemynTm7vksLY6uA3BhoLd2fx-5HY6sUWarvMKYZ7is35xLjYZzpJvTZxC4ibs_BNWIobqqQGbZ7MJMcdjXKA6oplMWg6djw-yr0wXTFkc30L2GaHB96a-myV5od2Fn96XjTx4A714zwEw8qzUkrj56HdaYbfzWUeXp8nTjKng5-FrRb4AM6mB_vHwFHYExDiPlyqyKcyJAgAyb6Bi3B')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cuero-habano via-cuero-habano/60 to-transparent" />
                    <div className="relative z-10 space-y-space-xs text-cuero-crudo">
                      <span className="inline-block bg-surface-container-high/40 text-cuero-crudo font-label-sm text-label-sm uppercase px-2 py-0.5 rounded">
                        Acero Inoxidable &amp; Suela
                      </span>
                      <h3 className="font-headline-md text-headline-md text-surface-bright group-hover:text-tertiary-fixed transition-colors">
                        Cuchillería &amp; Vainas Los Troperos
                      </h3>
                      <p className="font-body-sm text-body-sm text-cuero-crudo/80">
                        Cuchillos Eskilstuna originales de 10 cm a 30 cm con
                        vainas de cuero suela grabadas en nuestro taller.
                      </p>
                      <span className="inline-flex items-center gap-space-xs font-label-md text-label-md text-tertiary-fixed pt-space-xs">
                        Ver modelos disponibles{" "}
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </button>

                  {/* Categoría 3: Alforjas de Lona & Cordura (4 cols) */}
                  <button
                    type="button"
                    onClick={() => handleCategoryBentoClick("alforjas-recado")}
                    className="group relative rounded-xl overflow-hidden bg-cuero-habano lg:col-span-4 h-80 flex flex-col justify-end p-space-md shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage:
                          "url('/images/products/alforja-lona-cuerina.jpg')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cuero-habano via-cuero-habano/75 to-cuero-habano/20" />
                    <div className="relative z-10 space-y-space-xs text-cuero-crudo">
                      <h3 className="font-headline-sm text-headline-sm text-surface-bright group-hover:text-tertiary-fixed transition-colors">
                        Alforjas de Lona &amp; Cordura
                      </h3>
                      <p className="font-body-sm text-body-sm text-cuero-crudo/80">
                        Alforjas impermeables, con cuerina, porta botellas y
                        doble tira de cuero.
                      </p>
                      <span className="inline-flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary-fixed">
                        Explorar{" "}
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </button>

                  {/* Categoría 4: Sombreros Criollos (4 cols) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryBentoClick("indumentaria-regional")
                    }
                    className="group relative rounded-xl overflow-hidden bg-cuero-habano lg:col-span-4 h-80 flex flex-col justify-end p-space-md shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage:
                          "url('/images/products/sombreros-talle-5-5.jpg')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cuero-habano via-cuero-habano/75 to-cuero-habano/20" />
                    <div className="relative z-10 space-y-space-xs text-cuero-crudo">
                      <h3 className="font-headline-sm text-headline-sm text-surface-bright group-hover:text-tertiary-fixed transition-colors">
                        Sombreros Criollos Ala 8
                      </h3>
                      <p className="font-body-sm text-body-sm text-cuero-crudo/80">
                        Sombreros de paño firme con guarda pampa en talles 5,
                        5 1/2 y 6.
                      </p>
                      <span className="inline-flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary-fixed">
                        Explorar{" "}
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </button>

                  {/* Categoría 5: Indumentaria & Calzado Campero (4 cols) */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryBentoClick("indumentaria-regional")
                    }
                    className="group relative rounded-xl overflow-hidden bg-cuero-habano lg:col-span-4 h-80 flex flex-col justify-end p-space-md shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf5dpUyzxIbMvMvCAeOqpFExbp5V34Ka0ugxgJTfXO-35ZdO-jquMmVRJsCyD1Dd-vM1XAazn59Soyanz0POYV-OaoD7petnbUAVzTBScYRSLkGsSdha9s3AZGokhxYroVSvTv74EwEOSNTon0VPJttB-mHa8B9PhhedPl-kiI8PhycFrqKBeDxt9KymS_gfBHi8UBqR8icOUlIDk1JfTf_x6X758JcvYdBbw1BMnH')",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cuero-habano via-cuero-habano/70 to-transparent" />
                    <div className="relative z-10 space-y-space-xs text-cuero-crudo">
                      <h3 className="font-headline-sm text-headline-sm text-surface-bright group-hover:text-tertiary-fixed transition-colors">
                        Indumentaria y Calzado
                      </h3>
                      <p className="font-body-sm text-body-sm text-cuero-crudo/80">
                        Alpargatas de campo con yute Rueda, acordonadas Taba y
                        reforzadas Don Felipe.
                      </p>
                      <span className="inline-flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary-fixed">
                        Explorar{" "}
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* PIEZAS DESTACADAS DEL TALLER */}
            <section
              className="w-full py-space-xl px-gutter-mobile lg:px-gutter bg-surface-container-low"
              id="catalogo"
            >
              <div className="max-w-7xl mx-auto space-y-space-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary-container mb-space-xs">
                      <span className="material-symbols-outlined text-[18px]">
                        flare
                      </span>
                      <span className="font-label-md text-label-md uppercase tracking-widest font-semibold">
                        Taller de Creación • Mostrando {filteredProducts.length}{" "}
                        piezas
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-cuero-habano tracking-tight">
                      Piezas Destacadas
                    </h2>
                  </div>

                  {/* Filtros de Categorías Estilo Stitch */}
                  <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === "all"
                          ? "bg-cuero-habano text-cuero-crudo"
                          : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      Todas
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCategory === cat.id
                            ? "bg-cuero-habano text-cuero-crudo"
                            : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grilla de Productos */}
                {loading ? (
                  <div className="py-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Cargando catálogo artesanal...
                    </p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="py-16 text-center bg-surface-container-lowest rounded-xl border border-cuero-crudo p-8">
                    <p className="font-headline-sm text-headline-sm text-cuero-habano">
                      No encontramos piezas con ese criterio de búsqueda
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Probá seleccionando otra categoría del taller.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSearchTerm("");
                      }}
                      className="mt-4 px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider cursor-pointer"
                    >
                      Ver todas las piezas
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                      {visibleProducts.map((prod) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          onOpenDetail={setDetailProduct}
                        />
                      ))}
                    </div>

                    {filteredProducts.length > visibleProducts.length && (
                      <div className="pt-space-md flex justify-center">
                        <button
                          type="button"
                          onClick={() => setShowAllCatalog(true)}
                          className="px-space-xl py-space-md bg-surface-container-high hover:bg-surface-variant text-cuero-habano font-label-lg text-label-lg uppercase tracking-wider rounded-lg transition-colors flex items-center gap-space-xs shadow-sm cursor-pointer"
                        >
                          <span>
                            Ver Más Piezas de Catálogo (
                            {filteredProducts.length - visibleProducts.length}{" "}
                            restantes)
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            expand_more
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* TESTIMONIOS DE LA PATAGONIA */}
            <section
              className="w-full py-space-xl px-gutter-mobile lg:px-gutter bg-surface-container"
              id="testimonios-patagonia"
            >
              <div className="max-w-7xl mx-auto space-y-space-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md text-left">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary-container mb-space-xs">
                      <span className="material-symbols-outlined text-[18px]">
                        terrain
                      </span>
                      <span className="font-label-md text-label-md uppercase tracking-widest font-semibold">
                        Voces y Experiencias de Campo
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-cuero-habano tracking-tight">
                      La Palabra de Quienes Galopan en la Patagonia
                    </h2>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                      (Chubut, Cordillera &amp; Meseta · Esquel y región
                      cordillerana)
                    </p>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm bg-surface-container-high/80 px-3 py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">
                      verified
                    </span>
                    <span>Envíos directos y probados en rigor patagónico</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-cuero-crudo flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-space-sm">
                      <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className="material-symbols-outlined material-symbols-filled text-[18px]"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <p className="font-body-md text-body-md text-cuero-habano italic leading-relaxed">
                        «La nobleza del cuero aguanta el rigor cordillerano. En
                        veranada y con heladas fuertes, el cuero curtido al
                        tanino no se pasma ni pierde firmeza.»
                      </p>
                    </div>
                    <div className="pt-space-md mt-space-sm border-t border-surface-container flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-cuero-habano text-cuero-crudo flex items-center justify-center font-title-md font-bold shrink-0">
                        LW
                      </div>
                      <div>
                        <h4 className="font-title-md text-title-md text-cuero-habano leading-tight font-semibold">
                          Don Lautaro Williams
                        </h4>
                        <p className="font-body-sm text-body-sm text-secondary">
                          Estancia Huemules, Esquel (Chubut)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-cuero-crudo flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-space-sm">
                      <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className="material-symbols-outlined material-symbols-filled text-[18px]"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <p className="font-body-md text-body-md text-cuero-habano italic leading-relaxed">
                        «Aperos que calzan con precisión en subidas bravas y
                        mallines. El cajón reforzado llegó intacto a Esquel en
                        tiempo y forma.»
                      </p>
                    </div>
                    <div className="pt-space-md mt-space-sm border-t border-surface-container flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-title-md font-bold shrink-0">
                        RN
                      </div>
                      <div>
                        <h4 className="font-title-md text-title-md text-cuero-habano leading-tight font-semibold">
                          Rodrigo Nahuelpán
                        </h4>
                        <p className="font-body-sm text-body-sm text-secondary">
                          Cabaña Leleque, Cushamen (Chubut)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-cuero-crudo flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-space-sm">
                      <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className="material-symbols-outlined material-symbols-filled text-[18px]"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <p className="font-body-md text-body-md text-cuero-habano italic leading-relaxed">
                        «Costuras en tiento de potro y cuchillería de altísimo
                        nivel artesanal. Un orgullo llevar piezas de Los
                        Troperos en las fiestas gauchas de la cordillera.»
                      </p>
                    </div>
                    <div className="pt-space-md mt-space-sm border-t border-surface-container flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-secondary text-surface-bright flex items-center justify-center font-title-md font-bold shrink-0">
                        CJ
                      </div>
                      <div>
                        <h4 className="font-title-md text-title-md text-cuero-habano leading-tight font-semibold">
                          Candelaria Jones &amp; Hnos.
                        </h4>
                        <p className="font-body-sm text-body-sm text-secondary">
                          Establecimiento Río Percy, Trevelin (Chubut)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TRABAJOS ESPECIALES & ENCARGOS PERSONALIZADOS */}
            <section
              className="w-full py-space-xl px-gutter-mobile lg:px-gutter bg-cuero-habano text-cuero-crudo"
              id="encargos"
            >
              <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-cuero-habano via-bordo-profundo to-cuero-habano p-space-lg lg:p-space-xl relative overflow-hidden shadow-2xl border border-cuero-suela/30">
                <div
                  className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10 bg-contain bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCU3JdrdJT8ptJcdVwNlNgN36VKCq98JAK7cQyMSoJRO9-m_R5TmQFyb31FL-W0ChKdT2EQrmMNJI2jDU1hDmuXbuydTHrZjJtpWnJBN5lzekoH2OW89mT2zqUN7x8lNwwmGHTT7OB_H6Kv8N3t-PeZlQqODs7zarGNWuibaI_VW95jSuobv3Wvgdqj-OwNoR3FNTFuUpXUwtSxaa9WYY4FD0Zsqb2H2I9LR2mxn0mj')",
                  }}
                />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                  <div className="lg:col-span-8 space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs px-3 py-1 bg-surface-bright/10 rounded-full text-tertiary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[16px]">
                        edit_note
                      </span>
                      <span>
                        Piezas Personalizadas y Pedidos Institucionales
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-surface-bright tracking-tight">
                      ¿Busca un Recado de Desfile o un Regalo Campero
                      Inolvidable?
                    </h2>
                    <p className="font-body-lg text-body-lg text-cuero-crudo/90 max-w-2xl leading-relaxed">
                      Realizamos recados criollos a medida para exposiciones
                      rurales, estuches de cuero grabados para bodegas, platería
                      con monograma de estancia y regalos corporativos de
                      altísima distinción tradicional.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                      <a
                        className="px-space-lg py-space-md bg-surface-bright hover:bg-cuero-crudo text-cuero-habano font-label-lg text-label-lg uppercase tracking-wider rounded-lg transition-colors flex items-center gap-space-xs shadow-md"
                        href="https://wa.me/5492945532486?text=Hola%20Talabarter%C3%ADa%20Los%20Troperos,%20quisiera%20consultar%20por%20un%20trabajo%20personalizado%20a%20medida"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[20px] text-primary">
                          chat
                        </span>
                        <span>Consultar por WhatsApp Directo</span>
                      </a>
                      <div className="flex items-center gap-space-xs text-cuero-crudo font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                          schedule
                        </span>
                        <span>Respuesta habitual: menos de 2 horas</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-cuero-habano/60 p-space-md rounded-xl backdrop-blur-xs space-y-space-sm border border-cuero-crudo/15">
                    <h4 className="font-title-md text-title-md text-tertiary-fixed uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">
                        verified
                      </span>
                      Qué podemos personalizar:
                    </h4>
                    <ul className="space-y-space-xs font-body-sm text-body-sm text-cuero-crudo/80">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                          check_circle
                        </span>
                        <span>Marca de hacienda grabada a fuego</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                          check_circle
                        </span>
                        <span>Medidas exactas según anatomía del jinete</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                          check_circle
                        </span>
                        <span>Cincelado en plata 925 o alpaca gruesa</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                          check_circle
                        </span>
                        <span>Estuches de madera noble con herrajes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}
