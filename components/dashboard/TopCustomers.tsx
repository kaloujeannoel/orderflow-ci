"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users } from "lucide-react";

interface TopCustomer {
  name: string;
  orders: number;
  total: number;
}

export function TopCustomers({ businessId }: { businessId: string }) {
  const [customers, setCustomers] = useState<TopCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      const supabase = createClient();
      
      const { data } = await supabase
        .from("sales")
        .select("customer_id, total, customers(name)")
        .eq("business_id", businessId)
        .not("customer_id", "is", null);

      if (data) {
        const grouped = new Map<string, TopCustomer>();
        data.forEach((sale) => {
          const customer = sale.customers as unknown as { name: string } | null;
          const name = customer?.name || "Client inconnu";
          const current = grouped.get(name) || { name, orders: 0, total: 0 };
          if (!grouped.has(name)) {
            grouped.set(name, current);
          }
          current.orders += 1;
          current.total += Number(sale.total);
        });

        const sorted = Array.from(grouped.values())
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        setCustomers(sorted);
      }
      setLoading(false);
    };

    fetchTopCustomers();
  }, [businessId]);

  if (loading) return <div className="p-4 text-sm text-slate-500">Chargement...</div>;

  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
          <tr>
            <th className="px-4 py-3 rounded-l-lg">Client</th>
            <th className="px-4 py-3 text-center">Commandes</th>
            <th className="px-4 py-3 text-right rounded-r-lg">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {customers.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-slate-400">
                <Users className="h-6 w-6 mx-auto mb-2 opacity-50" />
                Aucune donnée client
              </td>
            </tr>
          ) : (
            customers.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3 text-center text-slate-600">{c.orders}</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {c.total.toLocaleString("fr-CI")} F
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}