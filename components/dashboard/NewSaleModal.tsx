"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createSaleAction } from "@/app/(dashboard)/ventes/actions";
import { createClient } from "@/lib/supabase/client";

interface OptionItem { id: string; name: string }
interface SaleProduct extends OptionItem { sale_price: number; stock_quantity: number }
interface SaleItem { product_id: string; quantity: number }

export function NewSaleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [customers, setCustomers] = useState<OptionItem[]>([]);
  const [products, setProducts] = useState<SaleProduct[]>([]);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user?.id).single();
      
      if (business) {
        const [cust, prod] = await Promise.all([
          supabase.from("customers").select("id, name").eq("business_id", business.id),
          supabase.from("products").select("id, name, sale_price, stock_quantity").eq("business_id", business.id).gt("stock_quantity", 0)
        ]);
        setCustomers(cust.data || []);
        setProducts(prod.data || []);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems([{ product_id: "", quantity: 1 }]);
  }, [isOpen]);

  const addItem = () => setItems([...items, { product_id: "", quantity: 1 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  
  const updateItem = (index: number, field: keyof SaleItem, value: string | number) => {
    const newItems = [...items];
    if (field === "product_id" && typeof value === "string") newItems[index] = { ...newItems[index], product_id: value };
    if (field === "quantity" && typeof value === "number") newItems[index] = { ...newItems[index], quantity: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.product_id);
      return sum + (product ? product.sale_price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    
    // Nettoyer les lignes vides
    const validItems = items.filter(i => i.product_id && i.quantity > 0);
    if (validItems.length === 0) {
      toast.error("Ajoutez au moins un produit");
      setPending(false);
      return;
    }
    
    formData.set("items", JSON.stringify(validItems));
    const res = await createSaleAction(undefined, formData);
    setPending(false);

    if (res?.error) toast.error(res.error);
    else {
      toast.success("Vente enregistrée ! Le stock a été mis à jour.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Nouvelle vente</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Client (Optionnel)</label>
              <select name="customerId" className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="">Client de passage</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Mode de paiement</label>
              <select name="paymentMethod" className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="Espèces">Espèces</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Virement">Virement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Produits</label>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <select 
                    value={item.product_id} 
                    onChange={(e) => updateItem(index, "product_id", e.target.value)}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  >
                    <option value="">Sélectionner un produit</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.sale_price.toLocaleString("fr-CI")} FCFA (Stock: {p.stock_quantity})
                      </option>
                    ))}
                  </select>
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                    className="w-20 rounded-lg border px-2 py-2 text-sm text-center" 
                  />
                  <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addItem} className="mt-2 text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              <Plus className="h-4 w-4" /> Ajouter un produit
            </button>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between text-lg font-bold text-slate-900">
              <span>Total à payer</span>
              <span>{calculateTotal().toLocaleString("fr-CI")} FCFA</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary py-2">Annuler</button>
            <button type="submit" disabled={pending} className="btn-primary py-2">
              {pending ? "Enregistrement..." : "Valider la vente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}