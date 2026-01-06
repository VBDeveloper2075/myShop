import type { Metadata } from "next";
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "SE VENDE",
  description: "Artículos Usados - Se Vende. Ítems únicos. Zona Caseros, Buenos Aires",
  icons: {
    icon: "/images/se-vende.jpg",
  },
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
        <ChatWidget />
      </body>
    </html>
  );
}



