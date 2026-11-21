"use client";

import { useActionState, useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { addDeliveryAction } from "@/app/(dashboard)/livraisons/actions";
import { createClient } from "@/lib/supabase/client";

export function AddDeliveryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(addDeliveryAction, undefined);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const loadCustomers = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user?.id).single();
      if (business) {
        const { data } = await supabase.from("customers").select("id, name, phone, city").eq("business_id", business.id);
        setCustomers(data || []);
      }
    };
    loadCustomers();
  }, [isOpen]);

  useEffect(() => {
    if (state?.success) {
      toast.success("Livraison enregistrée !");
      onClose();
    }
    if (state?.error) toast.error(state.error);
  }, [state, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Nouvelle livraison</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Client</label>
            <select name="customer_id" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none">
              <option value="">Sélectionner un client</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Livreur</label>
              <input name="driver_name" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Tél. livreur</label>
              <input name="driver_phone" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Adresse</label>
            <input name="address" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Ville</label>
              <input name="city" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Frais (FCFA)</label>
              <input name="fee" type="number" defaultValue={0} className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary py-2">Annuler</button>
            <button type="submit" disabled={pending} className="btn-primary py-2">
              {pending ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}