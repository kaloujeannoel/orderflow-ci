"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/action-state";

export async function addCustomerAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
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
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;

  if (!name) return { error: "Le nom est obligatoire." };

  const { error } = await supabase.from("customers").insert({
    business_id: business.id,
    name,
    phone,
    city,
  });

  if (error) return { error: error.message };

  revalidatePath("/clients");
  return { success: true };
}