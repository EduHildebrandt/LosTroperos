import { NextResponse } from "next/server";
import { prisma, isPostgresConfigured } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNumber = `TRP-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!isPostgresConfigured()) {
      return NextResponse.json({
        success: true,
        orderId: `local-${Date.now()}`,
        orderNumber,
        savedToDatabase: false,
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: body.customer?.fullName || "Cliente",
        customerEmail: body.customer?.email || null,
        customerPhone: body.customer?.phone || "",
        customerDni: body.customer?.dni || null,
        shippingOption: body.shipping?.shippingOption || "delivery",
        address: body.shipping?.address || null,
        city: body.shipping?.city || null,
        province: body.shipping?.province || "Argentina",
        postalCode: body.shipping?.postalCode || null,
        shippingCost: body.shippingCost || 0,
        subtotal: body.subtotal,
        discountAmount: body.discountAmount || 0,
        total: body.total,
        paymentMethod: body.paymentMethod || "transfer",
        status: "pending_payment",
        notes: body.notes || null,
        items: {
          create: (body.items || []).map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            variantName: item.variantName || null,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
            image: item.image || null,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      savedToDatabase: true,
    });
  } catch (error: any) {
    console.error("Error al persistir orden en PostgreSQL:", error);
    // Retornamos fallback exitoso para no interrumpir el flujo comercial del usuario
    const fallbackNumber = `TRP-${Math.floor(100000 + Math.random() * 900000)}`;
    return NextResponse.json({
      success: true,
      orderId: `local-fallback-${Date.now()}`,
      orderNumber: fallbackNumber,
      savedToDatabase: false,
      warning: "Procesado en modo local debido a que la conexión a la base de datos no está disponible.",
    });
  }
}
