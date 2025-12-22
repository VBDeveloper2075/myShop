import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MY ARCHIVE / STORE",
  description: "Colección personal en venta. Ítems únicos. Envío rápido. Precios finales.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}



