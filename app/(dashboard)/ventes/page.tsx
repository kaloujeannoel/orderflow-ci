"use client";

import { useState, useEffect } from "react";
import { Wallet, Plus, FileText } from "lucide-react";
import { NewSaleModal } from "@/components/dashboard/NewSaleModal";
import { createClient } from "@/lib/supabase/client";
import { generateInvoicePDF } from "@/lib/pdf/invoice";

interface Sale {
  id: string;
  sale_number: string | null;
  created_at: string;
  payment_method: string;
  total: number;
  customers: { name: string } | null;
}

export default function SalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
      if (business) {
        const { data } = await supabase
          .from("sales")
          .select("*, customers(name)")
          .eq("business_id", business.id)
          .order("created_at", { ascending: false });
        setSales(data || []);
      }
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchSales(); }, []);

  const handleCloseModal = () => { 
    setIsModalOpen(false); 
    setTimeout(() => fetchSales(), 300); 
  };

  // Fonction pour générer le PDF
  const handleDownloadPDF = async (sale: Sale) => {
    const supabase = createClient();
    
    // Récupérer les détails des produits vendus
    const { data: items } = await supabase
      .from("sale_items")
      .select("product_name, quantity, unit_price")
      .eq("sale_id", sale.id);

    // Récupérer les infos du commerce
    const { data: { user } } = await supabase.auth.getUser();
    const { data: business } = await supabase.from("businesses").select("*").eq("owner_id", user?.id).single();

    generateInvoicePDF({
      saleNumber: sale.sale_number || `V-${sale.id.slice(0, 6)}`,
      date: new Date(sale.created_at).toLocaleDateString("fr-CI"),
      businessName: business?.name || "Mon Commerce",
      businessPhone: business?.phone,
      businessCity: business?.city,
      customerName: sale.customers?.name || "Client de passage",
      items: (items || []).map(i => ({
        name: i.product_name,
        quantity: i.quantity,
        price: Number(i.unit_price),
      })),
      total: Number(sale.total),
      paymentMethod: sale.payment_method,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ventes</h1>
          <p className="mt-1 text-sm text-slate-600">Enregistrez vos ventes au comptoir.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Nouvelle vente
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Chargement...</div>
      ) : sales.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mb-4">
            <Wallet className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Aucune vente</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">Commencez par enregistrer votre première vente.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" /> Nouvelle vente
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Paiement</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
                <th className="px-4 py-3 font-medium text-center">Facture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-500">{new Date(s.created_at).toLocaleDateString("fr-CI")}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{s.customers?.name || "Client de passage"}</td>
                  <td className="px-4 py-3 text-slate-500">{s.payment_method}</td>
                  <td className="px-4 py-3 text-right font-bold text-brand-600">{s.total.toLocaleString("fr-CI")} FCFA</td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => handleDownloadPDF(s)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <FileText className="h-3 w-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewSaleModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}