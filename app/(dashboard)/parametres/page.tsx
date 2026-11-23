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
    </div>
  );
}