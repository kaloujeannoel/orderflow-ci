"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { ipRateLimit, accountRateLimit } from "@/lib/rate-limit";

type State = { error?: string; success?: string } | undefined;

export async function loginAction(prevState: State, formData: FormData): Promise<State> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  // --- SÉCURITÉ : RATE LIMITING ---
  // 1. Récupérer l'adresse IP de l'utilisateur
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";

  // 2. Vérifier la limite par IP (ex: max 10 tentatives / 15 min)
  const ipResult = await ipRateLimit.limit(`login:ip:${ip}`);
  if (!ipResult.success) {
    return { error: "Trop de tentatives depuis cette adresse. Réessayez dans 15 minutes." };
  }

  // 3. Vérifier la limite par email (ex: max 5 tentatives / 15 min)
  const accountResult = await accountRateLimit.limit(`login:email:${parsed.data.email}`);
  if (!accountResult.success) {
    return { error: "Trop de tentatives pour ce compte. Réessayez dans 15 minutes." };
  }
  // --------------------------------

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) return { error: "Email ou mot de passe incorrect" };

  redirect("/dashboard");
}

export async function registerAction(prevState: State, formData: FormData): Promise<State> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    businessName: formData.get("businessName"),
    businessType: formData.get("businessType"),
    city: formData.get("city"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
        phone: parsed.data.phone,
        business_name: parsed.data.businessName,
        business_type: parsed.data.businessType,
        city: parsed.data.city,
      },
    },
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}