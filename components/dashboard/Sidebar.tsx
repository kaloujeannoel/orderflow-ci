"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, Package, Users, ShoppingCart, Wallet, 
  Receipt, Truck, BarChart3, Settings, LogOut, ShoppingBag, X, MessageCircle 
} from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";

const NAV = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/produits", label: "Produits", icon: Package },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/ventes", label: "Ventes", icon: Wallet },
  { href: "/commandes", label: "Commandes", icon: ShoppingCart },
  { href: "/depenses", label: "Dépenses", icon: Receipt },
  { href: "/livraisons", label: "Livraisons", icon: Truck },
  { href: "/rapports", label: "Rapports", icon: BarChart3 },
  { href: "/parametres", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fond sombre (Overlay) quand le menu est ouvert sur mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* La Sidebar (Fond Sombre) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1E293B] text-slate-300 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold tracking-tight">OrderFlow CI</span>
          </div>
          {/* Bouton Fermer (Mobile uniquement) */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active 
                    ? "bg-brand-600 text-white" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Section Aide WhatsApp (Nouveau) */}
        <div className="px-3 pb-2 border-t border-slate-800 pt-4">
          <a
            href="https://wa.me/2250789399776?text=Bonjour%20l'équipe%20OrderFlow%20CI,%20j'ai%20besoin%20d'aide."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-green-400 transition-colors hover:bg-slate-800 hover:text-green-300"
          >
            <MessageCircle className="h-4 w-4" />
            Aide WhatsApp
          </a>
        </div>

        {/* Déconnexion */}
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-slate-800 hover:text-red-300">
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}