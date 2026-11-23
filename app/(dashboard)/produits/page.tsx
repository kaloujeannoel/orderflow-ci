"use client";

import { useState, useEffect } from "react";
import { Package, Plus } from "lucide-react";
import { AddProductModal } from "@/components/dashboard/AddProductModal";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  sku: string | null;
  sale_price: number;
  stock_quantity: number;
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger les produits depuis Supabase
  const fetchProducts = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (business) {
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("business_id", business.id)
          .order("created_at", { ascending: false });
        
        setProducts(data || []);
      }
    }
    setLoading(false);
  };

  // Charger les produits au démarrage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  // Recharger les produits quand la modal se ferme (après ajout)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchProducts(); 
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produits</h1>
          <p className="mt-1 text-sm text-slate-600">Gérez votre catalogue et vos stocks.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Nouveau produit
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Chargement...</div>
      ) : products.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mb-4">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Aucun produit</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">Commencez par ajouter votre premier produit.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" /> Ajouter un produit
          </button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Prix de vente</th>
                <th className="px-4 py-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-slate-500">{p.sku || "—"}</td>
                  <td className="px-4 py-3">{Number(p.sale_price).toLocaleString("fr-CI")} FCFA</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.stock_quantity > 5 ? 'bg-brand-50 text-brand-700' : 'bg-red-50 text-red-700'}`}>
                      {p.stock_quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}