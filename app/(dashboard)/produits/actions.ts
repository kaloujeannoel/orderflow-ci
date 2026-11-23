"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/action-state";

export async function addProductAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé" };

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!business) return { error: "Commerce introuvable" };

  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const purchase_price = Number(formData.get("purchase_price"));
  const sale_price = Number(formData.get("sale_price"));
  const stock_quantity = Number(formData.get("stock_quantity"));

  if (!name || sale_price <= 0) {
    return { error: "Le nom et le prix de vente sont obligatoires." };
  }

  const { error } = await supabase.from("products").insert({
    business_id: business.id,
    name,
    sku,
    purchase_price,
    sale_price,
    stock_quantity,
  });

  if (error) return { error: error.message };

  revalidatePath("/produits");
  return { success: true };
}