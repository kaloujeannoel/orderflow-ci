"use client";

import { useState, useEffect } from "react";
import { Users, Plus } from "lucide-react";
import { AddCustomerModal } from "@/components/dashboard/AddCustomerModal";
import { createClient } from "@/lib/supabase/client";

interface Customer {
  id: string;
  name: string;
  phone: string | null;
  city: string | null;
}

export default function CustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
      if (business) {
        const { data } = await supabase.from("customers").select("*").eq("business_id", business.id).order("created_at", { ascending: false });
        setCustomers(data || []);
      }
    }
    setLoading(false);
  };

  // Chargement initial asynchrone depuis Supabase.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchCustomers(); }, []);

  const handleCloseModal = () => { setIsModalOpen(false); fetchCustomers(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="mt-1 text-sm text-slate-600">Gérez votre base de clients.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Nouveau client
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Chargement...</div>
      ) : customers.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Aucun client</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">Ajoutez votre premier client pour commencer.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" /> Ajouter un client
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Téléphone</th>
                <th className="px-4 py-3 font-medium">Ville</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-slate-500">{c.phone || "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{c.city || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddCustomerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}