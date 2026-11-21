import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: "OrderFlow CI — Gérez votre commerce",
  description: "La plateforme tout-en-un pour les commerçants ivoiriens.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      {/* On force m-0 p-0 pour être sûr qu'il n'y a aucune marge */}
      <body className="min-h-screen font-sans antialiased bg-slate-50 m-0 p-0">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}