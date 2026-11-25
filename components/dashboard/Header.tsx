"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/app/(auth)/actions";

export function Header({ userEmail }: { userEmail: string }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Compteur de notifications (à 0 pour l'instant)
  const [notificationCount, setNotificationCount] = useState(0);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  // Fermer les menus si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      
      {/* Barre de recherche */}
      <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-100 px-3 py-2 rounded-lg w-96 focus-within:ring-2 focus-within:ring-brand-600/20 transition-all">
        <Search className="h-4 w-4" />
        <input 
          type="text" 
          placeholder="Rechercher un produit, un client..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Bell className="h-5 w-5" />
            
            {/* Le badge ne s'affiche que si notificationCount > 0 */}
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notificationCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-lg bg-white p-4 shadow-xl border border-slate-100 z-50">
              <p className="text-sm font-medium text-slate-900 mb-2">Notifications</p>
              
              {notificationCount === 0 ? (
                <div className="text-xs text-slate-500 p-2 bg-slate-50 rounded text-center">
                  Aucune nouvelle notification
                </div>
              ) : (
                <div className="text-xs text-slate-500 p-2 bg-slate-50 rounded">
                  📦 Vous avez {notificationCount} nouvelle(s) notification(s).
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="relative border-l border-slate-200 pl-4" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-brand-700 font-bold">
              {initial}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-900">Mon Commerce</p>
              <p className="text-xs text-slate-500">{userEmail}</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white p-1 shadow-xl border border-slate-100 z-50">
              <Link 
                href="/parametres" 
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <Settings className="h-4 w-4" /> Paramètres
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4" /> Déconnexion
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}