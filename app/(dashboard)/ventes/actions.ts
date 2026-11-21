"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createSaleAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé" };

  const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
  if (!business) return { error: "Commerce introuvable" };

  const customerId = formData.get("customerId") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  const itemsRaw = formData.get("items") as string;
  
  if (!itemsRaw) return { error: "Ajoutez au moins un produit." };

  const items = JSON.parse(itemsRaw); // ex: [{"product_id": "...", "quantity": 2}]

  const { error } = await supabase.rpc("create_sale", {
    p_business_id: business.id,
    p_customer_id: customerId || null,
    p_payment_method: paymentMethod,
    p_items: items,
  });

  if (error) return { error: error.message };

  revalidatePath("/ventes");
  revalidatePath("/produits"); // Pour mettre à jour le stock
  return { success: true };
}