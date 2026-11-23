"use client";

import { useState, useEffect } from "react";
import { Receipt, Plus } from "lucide-react";
import { AddExpenseModal } from "@/components/dashboard/AddExpenseModal";
import { createClient } from "@/lib/supabase/client";

interface Expense {
  id: string;
  expense_date: string;
  category: string;
  description: string | null;
  amount: number;
}

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
      if (business) {
        const { data } = await supabase.from("expenses").select("*").eq("business_id", business.id).order("expense_date", { ascending: false });
        setExpenses(data || []);
      }
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchExpenses(); }, []);

  const handleCloseModal = () => { 
  setIsModalOpen(false); 
  setTimeout(() => fetchExpenses(), 500); // Attend une demi-seconde que la modale se ferme
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dépenses</h1>
          <p className="mt-1 text-sm text-slate-600">Suivez vos charges et vos achats.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Nouvelle dépense
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Chargement...</div>
      ) : expenses.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mb-4">
            <Receipt className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Aucune dépense</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">Enregistrez vos dépenses pour suivre votre rentabilité.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" /> Ajouter une dépense
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-500">{new Date(e.expense_date).toLocaleDateString("fr-CI")}</td>
                  <td className="px-4 py-3"><span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{e.category}</span></td>
                  <td className="px-4 py-3 text-slate-500">{e.description || "—"}</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">{Number(e.amount).toLocaleString("fr-CI")} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddExpenseModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}