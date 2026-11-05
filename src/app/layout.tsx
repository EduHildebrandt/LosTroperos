import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talabartería Los Troperos | Esquel, Chubut - Aperos Criollos & Cuchillería",
  description:
    "Tienda online oficial de Talabartería Los Troperos en Esquel, Chubut. Monturas, bastos, cojinillos de lana pura, cuchillería artesanal, soguería en lonja de potro e indumentaria de campo. 15% OFF abonando por transferencia y envíos bonificados.",
  keywords: [
    "talabarteria los troperos",
    "talabarteria esquel",
    "aperos criollos",
    "monturas de descarne",
    "cuchillos artesanales chubut",
    "sogueria criolla",
    "articulos de campo patagonia",
  ],
  openGraph: {
    title: "Talabartería Los Troperos | Esquel, Patagonia",
    description:
      "Artesanía en cuero, aperos criollos, cuchillería forjada y prendas de campo. Dante Brozzi 669, Esquel, Chubut.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbf9f5] text-[#261b14]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
