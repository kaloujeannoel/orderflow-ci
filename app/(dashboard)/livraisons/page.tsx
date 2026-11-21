"use client";

import { useState, useEffect } from "react";
import { Truck, Plus } from "lucide-react";
import { AddDeliveryModal } from "@/components/dashboard/AddDeliveryModal";
import { createClient } from "@/lib/supabase/client";
import { updateDeliveryStatusAction } from "./actions";

export default function DeliveriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
      if (business) {
        const { data } = await supabase.from("deliveries").select("*, customers(name)").eq("business_id", business.id).order("created_at", { ascending: false });
        setDeliveries(data || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => { fetchDeliveries(); }, []);

  const handleCloseModal = () => { 
    setIsModalOpen(false); 
    setTimeout(() => fetchDeliveries(), 300); 
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateDeliveryStatusAction(id, status);
    fetchDeliveries();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Livraisons</h1>
          <p className="mt-1 text-sm text-slate-600">Suivez vos livraisons et vos livreurs.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Nouvelle livraison
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Chargement...</div>
      ) : deliveries.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mb-4">
            <Truck className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Aucune livraison</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">Enregistrez votre première livraison.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" /> Nouvelle livraison
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">N°</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Livreur</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Frais</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{d.delivery_number}</td>
                  <td className="px-4 py-3 text-slate-600">{d.customers?.name || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{d.driver_name || "—"}</td>
                  <td className="px-4 py-3">
                    <select 
                      value={d.status} 
                      onChange={(e) => handleStatusChange(d.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-xs font-medium border-0 cursor-pointer ${
                        d.status === 'delivered' ? 'bg-green-50 text-green-700' : 
                        d.status === 'failed' ? 'bg-red-50 text-red-700' : 
                        'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <option value="to_deliver">À livrer</option>
                      <option value="in_progress">En cours</option>
                      <option value="delivered">Livrée</option>
                      <option value="failed">Échec</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-900">{Number(d.fee).toLocaleString("fr-CI")} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddDeliveryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}