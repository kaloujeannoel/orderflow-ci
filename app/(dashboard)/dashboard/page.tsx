"use client";

import { SalesChart } from "@/components/dashboard/SalesChart";
import { TopCustomers } from "@/components/dashboard/TopCustomers";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { useEffect, useState } from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [data, setData] = useState({
    revenue: 0,
    salesCount: 0,
    expenses: 0,
    customersCount: 0,
    productsCount: 0,
    salesRaw: [] as { total: number; created_at: string }[],
    businessId: "", // Ajout de l'ID du commerce
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();

        if (business) {
          const [salesRes, customersRes, productsRes, expensesRes] = await Promise.all([
            supabase.from("sales").select("total, created_at").eq("business_id", business.id),
            supabase.from("customers").select("*", { count: "exact", head: true }).eq("business_id", business.id),
            supabase.from("products").select("*", { count: "exact", head: true }).eq("business_id", business.id),
            supabase.from("expenses").select("amount").eq("business_id", business.id)
          ]);

          const salesData = salesRes.data || [];
          const revenue = salesData.reduce((sum, s) => sum + Number(s.total), 0);
          const expenses = expensesRes.data?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;

          setData({
            revenue,
            salesCount: salesData.length,
            expenses,
            customersCount: customersRes.count || 0,
            productsCount: productsRes.count || 0,
            salesRaw: salesData,
            businessId: business.id,
          });
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Chargement des données...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-600">Voici un aperçu de votre activité.</p>
      </div>

      <DashboardStats 
        revenue={data.revenue}
        salesCount={data.salesCount}
        expenses={data.expenses}
        customersCount={data.customersCount}
        productsCount={data.productsCount}
      />

      {/* Graphique */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-900">Évolution des ventes</h3>
        </div>
        <SalesChart sales={data.salesRaw} />
      </div>

      {/* Tableaux de classement */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Clients</h3>
          <TopCustomers businessId={data.businessId} />
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Produits</h3>
          <TopProducts businessId={data.businessId} />
        </div>
      </div>
    </div>
  );
}