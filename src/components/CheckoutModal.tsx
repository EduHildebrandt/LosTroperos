"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { submitOrder } from "@/services/productService";
import {
  X,
  ShieldCheck,
  Truck,
  Building,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  CreditCard,
  Tag,
} from "lucide-react";

export default function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    subtotal,
    paymentMethod,
    setPaymentMethod,
    transferDiscountPercent,
    transferDiscountAmount,
    total,
    shipping,
    setShippingOption,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dni: "",
    address: "",
    city: shipping.city || "",
    postalCode: shipping.postalCode || "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    orderId: string;
    total: number;
    paymentMethod: string;
  } | null>(null);

  const [copiedAlias, setCopiedAlias] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Por favor completa tu Nombre y Teléfono de contacto.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        orderNumber: "",
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dni: formData.dni,
        },
        shipping: {
          postalCode: formData.postalCode,
          city: formData.city,
          province: "Argentina",
          address: formData.address,
          shippingOption: shipping.shippingOption,
          calculatedCost: shipping.cost,
          isFreeShipping: shipping.isFree,
        },
        items: items.map((item) => {
          const variantExtra = item.selectedVariant?.priceModifier || 0;
          const price = item.product.price + variantExtra;
          return {
            productId: item.product.id,
            productName: item.product.name,
            variantName: item.selectedVariant?.name,
            price,
            quantity: item.quantity,
            subtotal: price * item.quantity,
            image: item.product.images[0] || "",
          };
        }),
        subtotal,
        discountAmount: transferDiscountAmount,
        shippingCost: shipping.cost,
        total,
        paymentMethod,
        status: "pending_payment" as const,
        notes: formData.notes,
      };

      const result = await submitOrder(orderPayload);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setCompletedOrder({
        orderNumber: result.orderNumber,
        orderId: result.orderId,
        total,
        paymentMethod,
      });

      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Hubo un inconveniente al procesar la orden. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    if (!completedOrder) return "";
    const itemsList = items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.product.name}${it.selectedVariant ? ` (${it.selectedVariant.name})` : ""}`
      )
      .join("%0A");

    const message = `*NUEVO PEDIDO EN TALABARTERÍA LOS TROPEROS*%0A%0A*Orden N°:* ${completedOrder.orderNumber}%0A*Cliente:* ${formData.fullName}%0A*Tel:* ${formData.phone}%0A*Entrega:* ${shipping.shippingOption === "pickup" ? "Retiro en local Esquel" : `Envío a domicilio (${formData.address || "A coordinar"}, ${formData.city || ""})`}%0A*Medio de Pago:* ${completedOrder.paymentMethod === "transfer" ? "Transferencia Bancaria (15% OFF)" : "Mercado Pago"}%0A*Total a abonar:* $${completedOrder.total.toLocaleString("es-AR")}%0A%0A*Detalle de artículos:*%0A${itemsList}%0A%0A_Aguardo confirmación y datos para coordinar el despacho/retiro. ¡Muchas gracias!_`;

    return `https://wa.me/5492945532486?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#fbf9f5] rounded-2xl max-w-2xl w-full border border-[#dfd2be] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Encabezado */}
        <div className="leather-gradient p-5 text-amber-50 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg">
              {completedOrder ? "¡Pedido Confirmado!" : "Finalizar Compra"}
            </h2>
            <p className="text-xs text-amber-200/90">
              Talabartería Los Troperos &bull; Esquel, Chubut
            </p>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCompletedOrder(null);
            }}
            className="text-amber-200 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pantalla de Éxito cuando se completó la orden */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8c5836]">
                ¡Muchas gracias por elegirnos!
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#261b14]">
                Orden #{completedOrder.orderNumber}
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Tu solicitud ha sido registrada exitosamente. Para agilizar el embalaje y despacho artesanal, comunicate con nosotros por WhatsApp.
              </p>
            </div>

            {completedOrder.paymentMethod === "transfer" && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5c3716]">
                    Datos para la Transferencia (15% OFF aplicado):
                  </span>
                  <span className="text-xs font-extrabold text-[#7b4224]">
                    Total: ${completedOrder.total.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-200/80 space-y-1.5 text-xs text-[#3d2314]">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Banco:</span>
                    <span className="font-semibold">Banco del Chubut / Galicia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Alias:</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-[#7b4224]">
                      <span>LOS.TROPEROS.ESQUEL</span>
                      <button
                        onClick={() => copyToClipboard("LOS.TROPEROS.ESQUEL")}
                        className="text-stone-500 hover:text-stone-800"
                        title="Copiar alias"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">CBU:</span>
                    <span className="font-mono text-[11px]">0830006501000012345678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Titular:</span>
                    <span className="font-semibold">Talabartería Los Troperos</span>
                  </div>
                </div>
                {copiedAlias && (
                  <p className="text-[11px] text-emerald-700 font-semibold text-center">
                    ✓ Alias copiado al portapapeles
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirmar y Enviar Comprobante por WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setCompletedOrder(null);
                }}
                className="w-full py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        ) : (
          /* Formulario de Checkout */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
            {/* 1. Datos Personales */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#3d2314] border-b border-[#dfd2be] pb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#7b4224] text-white text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                Tus Datos de Contacto
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#543b2b] mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ej: Facundo Gómez"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#d6c7b2] bg-white focus:outline-none focus:ring-1 focus:ring-[#7b4224]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#543b2b] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej: +54 9 2945..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#d6c7b2] bg-white focus:outline-none focus:ring-1 focus:ring-[#7b4224]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#543b2b] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#d6c7b2] bg-white focus:outline-none focus:ring-1 focus:ring-[#7b4224]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#543b2b] mb-1">
                    DNI / CUIT (para guía de despacho)
                  </label>
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    placeholder="Ej: 32.456.789"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#d6c7b2] bg-white focus:outline-none focus:ring-1 focus:ring-[#7b4224]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Modalidad de Entrega */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#3d2314] border-b border-[#dfd2be] pb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#7b4224] text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                Modalidad de Entrega
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShippingOption("delivery")}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    shipping.shippingOption === "delivery"
                      ? "border-[#7b4224] bg-white shadow-xs ring-1 ring-[#7b4224]"
                      : "border-[#e0d3bf] bg-white/60 opacity-80"
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#7b4224] mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-[#261b14] block">
                      Envío a Domicilio / Sucursal Correo
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      100% Bonificado (GRATIS)
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingOption("pickup")}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    shipping.shippingOption === "pickup"
                      ? "border-[#7b4224] bg-white shadow-xs ring-1 ring-[#7b4224]"
                      : "border-[#e0d3bf] bg-white/60 opacity-80"
                  }`}
                >
                  <Building className="w-4 h-4 text-[#7b4224] mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-[#261b14] block">
                      Retiro en Local Esquel
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Dante Brozzi 669, Esquel
                    </span>
                  </div>
                </button>
              </div>

              {shipping.shippingOption === "delivery" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#543b2b] mb-1">
                      Dirección y Número *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Calle, número, piso o depto"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#d6c7b2] bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#543b2b] mb-1">
                      Ciudad / Provincia
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Localidad"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#d6c7b2] bg-white focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Forma de Pago y Resumen */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#3d2314] border-b border-[#dfd2be] pb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#7b4224] text-white text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
                Forma de Pago & Resumen
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("transfer")}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentMethod === "transfer"
                      ? "border-[#7b4224] bg-amber-50/80 shadow-xs ring-1 ring-[#7b4224]"
                      : "border-[#dfd2be] bg-white opacity-70"
                  }`}
                >
                  <Tag className="w-4 h-4 text-amber-700 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3d2314]">
                      Transferencia Bancaria
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold">
                      15% de Descuento Especial
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("mercadopago")}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentMethod === "mercadopago"
                      ? "border-[#7b4224] bg-white shadow-xs ring-1 ring-[#7b4224]"
                      : "border-[#dfd2be] bg-white opacity-70"
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-stone-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3d2314]">
                      Mercado Pago / Tarjetas
                    </div>
                    <div className="text-[10px] text-stone-500">
                      Débito / Crédito
                    </div>
                  </div>
                </button>
              </div>

              {/* Desglose de totales */}
              <div className="bg-white p-3.5 rounded-xl border border-[#dfd2be] space-y-1.5 text-xs text-[#4a3528]">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} productos):</span>
                  <span>${subtotal.toLocaleString("es-AR")}</span>
                </div>
                {paymentMethod === "transfer" && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Bonificación por Transferencia (15%):</span>
                    <span>-${transferDiscountAmount.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Envío:</span>
                  <span className="font-bold text-emerald-700">GRATIS (100% Bonificado)</span>
                </div>
                <div className="border-t border-[#dfd2be] pt-2 flex justify-between items-baseline font-serif">
                  <span className="font-bold text-base text-[#261b14]">Total a pagar:</span>
                  <span className="font-bold text-xl text-[#7b4224]">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de Confirmación */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl leather-gradient text-amber-50 font-bold text-sm shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {isSubmitting ? "Registrando orden..." : "Confirmar Pedido"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
