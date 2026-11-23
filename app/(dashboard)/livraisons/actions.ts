"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/action-state";

export async function addDeliveryAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé" };

  const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
  if (!business) return { error: "Commerce introuvable" };

  const customer_id = formData.get("customer_id") as string;
  const driver_name = formData.get("driver_name") as string;
  const driver_phone = formData.get("driver_phone") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const fee = Number(formData.get("fee"));

  const delivery_number = 'LIV-' + Date.now().toString().slice(-6);

  const { error } = await supabase.from("deliveries").insert({
    business_id: business.id,
    customer_id: customer_id || null,
    delivery_number,
    driver_name,
    driver_phone,
    address,
    city,
    fee,
  });

  if (error) return { error: error.message };

  revalidatePath("/livraisons");
  return { success: true };
}

export async function updateDeliveryStatusAction(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("deliveries").update({ status }).eq("id", id);
  revalidatePath("/livraisons");
  return { success: true };
}