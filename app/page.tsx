import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingBag, ShieldCheck, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-slate-50 flex flex-col">
      
      {/* 👇 LE BANDEAU DÉFILANT EST ICI 👇 */}
      <AnnouncementBar />

      {/* Header : fond blanc opaque pour bien séparer du contenu */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold text-slate-900">OrderFlow CI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Connexion
            </Link>
            <Link href="/register" className="btn-primary py-2">
              Essai gratuit
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container-page grid items-center gap-8 py-8 lg:grid-cols-2 lg:py-16">
          
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800 mb-4">
              Nouveau : disponible en Côte d&apos;Ivoire
            </span>
            
            <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:mx-0 lg:text-6xl">
              Gérez votre commerce.{" "}
              <span className="text-brand-600">Développez vos ventes.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 lg:mx-0">
              La plateforme tout-en-un qui remplace vos cahiers et fichiers Excel. 
              Commandes, stocks, ventes, clients et factures — depuis un seul endroit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/register" className="btn-primary w-full px-8 py-4 text-base sm:w-auto">
                Démarrer gratuitement <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/login" className="btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Se connecter
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600 lg:justify-start">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-600" /> 14 jours d&apos;essai</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-600" /> Données sécurisées</span>
              <span className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-brand-600" /> Compatible mobile</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Image
              src="/hero-image.svg" 
              alt="Illustration OrderFlow CI" 
              width={640}
              height={640}
              className="relative w-full drop-shadow-2xl"
            />
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold text-slate-900">OrderFlow CI</span>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-600">
            <Link href="/faq" className="hover:text-brand-600">FAQ</Link>
            <Link href="/confidentialite" className="hover:text-brand-600">Confidentialité</Link>
            <Link href="mailto:contact@orderflow.ci" className="hover:text-brand-600">Contact</Link>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} OrderFlow CI. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
import Image from "next/image";