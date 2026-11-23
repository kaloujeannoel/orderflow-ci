"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Package } from "lucide-react";

interface TopProduct {
  name: string;
  qty: number;
  revenue: number;
}

export function TopProducts({ businessId }: { businessId: string }) {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const supabase = createClient();
      
      // On récupère les items de vente et on regroupe par produit
      const { data } = await supabase
        .from("sale_items")
        .select("product_name, quantity, line_total, sales!inner(business_id)")
        .eq("sales.business_id", businessId);

      if (data) {
        // Regrouper par nom de produit
        const grouped = data.reduce<Record<string, TopProduct>>((acc, item) => {
          if (!acc[item.product_name]) {
            acc[item.product_name] = { name: item.product_name, qty: 0, revenue: 0 };
          }
          acc[item.product_name].qty += item.quantity;
          acc[item.product_name].revenue += Number(item.line_total);
          return acc;
        }, {});

        // Trier par quantité vendue et prendre le top 5
        const sorted = Object.values(grouped)
          .sort((a, b) => b.qty - a.qty)
          .slice(0, 5);

        setProducts(sorted);
      }
      setLoading(false);
    };

    fetchTopProducts();
  }, [businessId]);

  if (loading) return <div className="p-4 text-sm text-slate-500">Chargement...</div>;

  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
          <tr>
            <th className="px-4 py-3 rounded-l-lg">Produit</th>
            <th className="px-4 py-3 text-center">Vendus</th>
            <th className="px-4 py-3 text-right rounded-r-lg">Revenus</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-slate-400">
                <Package className="h-6 w-6 mx-auto mb-2 opacity-50" />
                Aucune vente enregistrée
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3 text-center text-slate-600">{p.qty}</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {p.revenue.toLocaleString("fr-CI")} F
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}