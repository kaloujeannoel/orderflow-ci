"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "../actions";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 py-12">
      <div className="card w-full max-w-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Créer votre compte</h1>
          <p className="mt-2 text-sm text-slate-600">14 jours d&apos;essai gratuit. Sans engagement.</p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && <div className="rounded bg-red-50 p-3 text-sm text-red-600">{state.error}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Nom complet</label>
              <input name="fullName" type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Téléphone</label>
              <input name="phone" type="tel" required className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Adresse email</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Nom du commerce</label>
            <input name="businessName" type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Type de commerce</label>
              <select name="businessType" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none">
                <option value="boutique">Boutique</option>
                <option value="vendeur_en_ligne">Vendeur en ligne</option>
                <option value="grossiste">Grossiste</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Ville</label>
              <select name="city" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none">
                <option value="Abidjan">Abidjan</option>
                <option value="Bouaké">Bouaké</option>
                <option value="Yamoussoukro">Yamoussoukro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe</label>
            <input name="password" type="password" required className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none" />
          </div>

          <button type="submit" disabled={pending} className="btn-primary w-full mt-2">
            {pending ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Déjà un compte ? <Link href="/login" className="font-semibold text-brand-600 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}