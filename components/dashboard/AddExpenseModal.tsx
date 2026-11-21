"use client";

import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { addExpenseAction } from "@/app/(dashboard)/depenses/actions";

export function AddExpenseModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(addExpenseAction, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Dépense enregistrée !");
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
          <h2 className="text-lg font-bold text-slate-900">Nouvelle dépense</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Catégorie</label>
            <select name="category" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none">
              <option value="Achat de marchandises">Achat de marchandises</option>
              <option value="Transport">Transport</option>
              <option value="Loyer">Loyer</option>
              <option value="Salaires">Salaires</option>
              <option value="Électricité">Électricité</option>
              <option value="Internet">Internet</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Montant (FCFA) *</label>
            <input name="amount" type="number" required className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
            <input name="expense_date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description (Optionnel)</label>
            <input name="description" className="w-full rounded-lg border px-3 py-2 text-sm focus:border-brand-600 focus:outline-none" />
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