"use client";

import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { addProductAction } from "@/app/(dashboard)/produits/actions";

export function AddProductModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(addProductAction, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Produit ajouté avec succès !");
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Nouveau produit</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nom du produit *</label>
            <input name="name" required className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">SKU (Référence)</label>
            <input name="sku" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Prix d&apos;achat (FCFA)</label>
              <input name="purchase_price" type="number" defaultValue={0} className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Prix de vente *</label>
              <input name="sale_price" type="number" required className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Quantité en stock</label>
            <input name="stock_quantity" type="number" defaultValue={0} className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
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