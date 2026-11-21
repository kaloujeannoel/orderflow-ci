"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [data, setData] = useState({
    revenue: 0,
    customersCount: 0,
    productsCount: 0,
    lowStockCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: business } = await supabase
          .from("businesses")
          .select("id")
          .eq("owner_id", user.id)
          .single();

        if (business) {
          // 1. Récupérer les ventes
          const { data: sales } = await supabase
            .from("sales")
            .select("total")
            .eq("business_id", business.id);

          // 2. Récupérer le nombre de clients
          const { count: customersCount } = await supabase
            .from("customers")
            .select("*", { count: "exact", head: true })
            .eq("business_id", business.id);

          // 3. Récupérer le nombre de produits
          const { data: products } = await supabase
            .from("products")
            .select("stock_quantity, low_stock_threshold")
            .eq("business_id", business.id);

          // Calculs
          const revenue = sales?.reduce((sum, s) => sum + Number(s.total), 0) || 0;
          const productsCount = products?.length || 0;
          const lowStockCount = products?.filter(p => p.stock_quantity <= p.low_stock_threshold).length || 0;

          setData({
            revenue,
            customersCount: customersCount || 0,
            productsCount,
            lowStockCount,
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

      <StatsCards 
        revenue={data.revenue}
        customersCount={data.customersCount}
        productsCount={data.productsCount}
        lowStockCount={data.lowStockCount}
      />

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900">Activité récente</h3>
        <p className="mt-2 text-sm text-slate-600">
          Les graphiques de ventes et les dernières commandes arriveront bientôt.
        </p>
      </div>
    </div>
  );
}