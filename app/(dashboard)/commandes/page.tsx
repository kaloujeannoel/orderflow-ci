"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { AddOrderModal } from "@/components/dashboard/AddOrderModal";
import { createClient } from "@/lib/supabase/client";
import { updateOrderStatusAction } from "./actions";

export default function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
      if (business) {
        const { data } = await supabase.from("orders").select("*, customers(name)").eq("business_id", business.id).order("created_at", { ascending: false });
        setOrders(data || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCloseModal = () => { 
    setIsModalOpen(false); 
    setTimeout(() => fetchOrders(), 300); 
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateOrderStatusAction(id, status);
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commandes</h1>
          <p className="mt-1 text-sm text-slate-600">Gérez vos commandes et livraisons.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Nouvelle commande
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Chargement...</div>
      ) : orders.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mb-4">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Aucune commande</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">Enregistrez votre première commande pour commencer.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" /> Nouvelle commande
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">N°</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{o.order_number}</td>
                  <td className="px-4 py-3 text-slate-600">{o.customers?.name || "Client de passage"}</td>
                  <td className="px-4 py-3">
                    <select 
                      value={o.status} 
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-xs font-medium border-0 cursor-pointer ${
                        o.status === 'delivered' ? 'bg-green-50 text-green-700' : 
                        o.status === 'canceled' ? 'bg-red-50 text-red-700' : 
                        'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <option value="pending">En attente</option>
                      <option value="delivered">Livrée</option>
                      <option value="canceled">Annulée</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-brand-600">{o.total.toLocaleString("fr-CI")} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddOrderModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}