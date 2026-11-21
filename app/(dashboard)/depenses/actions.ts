"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addExpenseAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non autorisé" };

  const { data: business } = await supabase.from("businesses").select("id").eq("owner_id", user.id).single();
  if (!business) return { error: "Commerce introuvable" };

  const category = formData.get("category") as string;
  const amount = Number(formData.get("amount"));
  const description = formData.get("description") as string;
  const expense_date = formData.get("expense_date") as string;

  if (!amount || amount <= 0) return { error: "Le montant doit être supérieur à 0." };

  const { error } = await supabase.from("expenses").insert({
    business_id: business.id,
    category,
    amount,
    description,
    expense_date,
  });

  if (error) return { error: error.message };

  revalidatePath("/depenses");
  return { success: true };
}