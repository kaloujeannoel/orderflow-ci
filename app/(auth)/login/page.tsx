"use client";

import { StarsAndBubbles } from "@/components/ui/StarsAndBubbles";
import { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock, ShoppingBag, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen w-full">
      
      {/* --- COLONNE GAUCHE : Présentation (Cachée sur mobile) --- */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950 p-12 text-white lg:flex">
        
        {/* Bulles animées en fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 h-96 w-96 animate-[float_8s_ease-in-out_infinite] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 -right-24 h-80 w-80 animate-[float_10s_ease-in-out_infinite_1s] rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 animate-[float_12s_ease-in-out_infinite_2s] rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-600">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight">OrderFlow CI</span>
          </Link>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight">
            Gérez votre commerce.
            <br />
            Développez vos ventes.
          </h1>
          <p className="mt-6 text-lg text-brand-100">
            La plateforme tout-en-un qui remplace vos cahiers et fichiers Excel. 
            Commandes, stocks, ventes, clients et factures — depuis un seul endroit.
          </p>

          <ul className="mt-10 space-y-4">
            <li className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <span className="text-sm font-medium text-brand-50">
                Interface simple et rapide, pensée pour les commerçants.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                <ShieldCheck className="h-4 w-4 text-green-400" />
              </div>
              <span className="text-sm font-medium text-brand-50">
                Vos données sont sécurisées et isolées.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-brand-50">
                Compatible avec tous vos appareils (PC, Tablette, Mobile).
              </span>
            </li>
          </ul>
        </div>

        <div className="relative z-10 text-sm text-brand-300">
          © {new Date().getFullYear()} OrderFlow CI. Tous droits réservés.
        </div>
      </div>

      {/* --- COLONNE DROITE : Le Formulaire --- */}
      <div className="relative flex w-full flex-col items-center justify-center bg-slate-50 p-4 lg:w-1/2">
        
        {/* Les bulles et les étoiles animées */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <StarsAndBubbles />
        </div>

        {/* Le formulaire */}
        <div className="relative z-10 w-full max-w-md">
          
          {/* Logo mobile (visible seulement sur mobile) */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold text-slate-900">OrderFlow CI</span>
            </Link>
          </div>

          <div className="card p-8 shadow-xl bg-white/95 backdrop-blur-md">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900">Bon retour 👋</h2>
              <p className="mt-2 text-sm text-slate-600">
                Connectez-vous pour accéder à votre espace.
              </p>
            </div>

            <form action={formAction} className="space-y-5">
              {state?.error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {state.error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="vous@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-white/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Mot de passe
                  </label>
                  <Link href="#" className="text-xs font-medium text-brand-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-200 bg-white/50 py-2.5 pl-10 pr-3 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="btn-primary w-full"
              >
                {pending ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Pas encore de compte ?{" "}
              <Link href="/register" className="font-semibold text-brand-600 hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}