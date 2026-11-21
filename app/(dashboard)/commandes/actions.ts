"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addOrderAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé" };

  const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
  if (!business) return { error: "Commerce introuvable" };

  const customerId = formData.get("customerId") as string;
  const delivery_address = formData.get("delivery_address") as string;
  const itemsRaw = formData.get("items") as string;
  
  if (!itemsRaw) return { error: "Ajoutez au moins un produit." };
  const items = JSON.parse(itemsRaw);

  // Calculer le total
  let total = 0;
  for (const item of items) {
    const { data: p } = await supabase.from("products").select("sale_price").eq("id", item.product_id).single();
    if (p) total += p.sale_price * item.quantity;
  }

  // Créer la commande
  const order_number = 'CMD-' + Date.now().toString().slice(-6);
  const { data: order, error: orderError } = await supabase.from("orders").insert({
    business_id: business.id,
    customer_id: customerId || null,
    order_number,
    total,
    delivery_address,
  }).select().single();

  if (orderError) return { error: orderError.message };

  // Créer les lignes de commande
  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    line_total: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) return { error: itemsError.message };

  revalidatePath("/commandes");
  return { success: true };
}

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  const supabase = await createClient();
  
  // Si on passe à "livrée", on déduit le stock
  if (newStatus === "delivered") {
    const { data: items } = await supabase.from("order_items").select("*").eq("order_id", orderId);
    
    if (items) {
      for (const item of items) {
        // Récupérer le stock actuel
        const { data: product } = await supabase.from("products").select("stock_quantity").eq("id", item.product_id).single();
        if (product) {
          // Mettre à jour le stock
          await supabase.from("products").update({ 
            stock_quantity: product.stock_quantity - item.quantity 
          }).eq("id", item.product_id);
        }
      }
    }
  }

  await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
  revalidatePath("/commandes");
  revalidatePath("/produits");
  return { success: true };
}