"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ReportsPage() {
  const [data, setData] = useState({
    revenue: 0,
    expenses: 0,
    margin: 0,
    salesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
        
        if (business) {
          // 1. Total des ventes
          const { data: sales } = await supabase.from("sales").select("total").eq("business_id", business.id);
          const revenue = sales?.reduce((sum, s) => sum + Number(s.total), 0) || 0;
          const salesCount = sales?.length || 0;

          // 2. Total des dépenses
          const { data: expenses } = await supabase.from("expenses").select("amount").eq("business_id", business.id);
          const totalExpenses = expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

          // 3. Calcul du bénéfice net (Chiffre d'affaires - Dépenses)
          // Note : on ne calcule pas la marge des produits ici pour faire simple, 
          // on regarde juste ce qui rentre et ce qui sort de la caisse.
          const margin = revenue - totalExpenses;

          setData({ revenue, expenses: totalExpenses, margin, salesCount });
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Chargement des rapports...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Rapports & Analyses</h1>
        <p className="mt-1 text-sm text-slate-600">Vue d'ensemble de votre rentabilité.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Wallet className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-slate-500">Chiffre d'affaires</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{data.revenue.toLocaleString("fr-CI")} FCFA</p>
        </div>

        <div className="card p-5">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600">
            <TrendingDown className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-slate-500">Dépenses</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{data.expenses.toLocaleString("fr-CI")} FCFA</p>
        </div>

        <div className="card p-5">
          <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${data.margin >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-slate-500">Bénéfice net</p>
          <p className={`mt-1 text-xl font-bold ${data.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
            {data.margin.toLocaleString("fr-CI")} FCFA
          </p>
        </div>

        <div className="card p-5">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <BarChart3 className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-slate-500">Nombre de ventes</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{data.salesCount}</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900">Graphique des ventes</h3>
        <p className="mt-2 text-sm text-slate-600">Les graphiques détaillés arriveront dans la prochaine version.</p>
      </div>
    </div>
  );
}