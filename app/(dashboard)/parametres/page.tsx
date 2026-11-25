"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface Business {
  id: string;
  name: string;
  phone: string | null;
  city: string | null;
}

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase.from("businesses").select("*").eq("owner_id", user.id).single();
        setBusiness(data);
      }
      setLoading(false);
    };
    fetchBusiness();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!business) return;
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    
    const { error } = await supabase.from("businesses").update({
      name: formData.get("name"),
      phone: formData.get("phone"),
      city: formData.get("city"),
    }).eq("id", business.id);

    setSaving(false);
    if (error) toast.error("Erreur lors de la sauvegarde");
    else toast.success("Paramètres mis à jour !");
  };

  if (loading) return <div className="p-8 text-slate-500">Chargement...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-600">Gérez les informations de votre commerce.</p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nom du commerce</label>
            <input name="name" defaultValue={business?.name ?? ""} required className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Téléphone</label>
            <input name="phone" defaultValue={business?.phone ?? ""} className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Ville</label>
            <input name="city" defaultValue={business?.city ?? ""} className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          <div className="pt-4">
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              <Save className="h-4 w-4" />
              {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>

      {/* NOUVELLE SECTION : Aide & Support */}
      <div className="card p-6 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Aide & Support</h2>
        <p className="text-sm text-slate-600 mb-6">
          Un problème technique ? Une question sur votre abonnement ? Notre équipe est là pour vous aider.
        </p>
        
        <div className="flex flex-col gap-4">
          {/* Lien WhatsApp */}
          <a 
            href="https://wa.me/2250789399776?text=Bonjour%20l'équipe%20OrderFlow%20CI,%20j'ai%20besoin%20d'aide." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 group-hover:text-green-700">WhatsApp Support</p>
              <p className="text-xs text-slate-500">+225 07 89 39 97 76</p>
            </div>
          </a>
          
          {/* Lien Email */}
          <a 
            href="mailto:orderflowci@gmail.com" 
            className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">Email Support</p>
              <p className="text-xs text-slate-500">orderflowci@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}