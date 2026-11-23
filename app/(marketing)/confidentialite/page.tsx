import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container-page max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 mb-8">
          <ArrowLeft className="h-4 w-4" /> Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Politique de Confidentialité & CGU</h1>
        <p className="text-sm text-slate-500 mb-8">Dernière mise à jour : {new Date().toLocaleDateString("fr-CI")}</p>

        <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Protection de vos données</h2>
            <p>
              OrderFlow CI accorde une importance capitale à la protection de vos données personnelles et commerciales. 
              Conformément à la loi ivoirienne n° 2013-450 relative à la protection des données à caractère personnel, 
              nous vous informons que :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Vos données sont stockées de manière sécurisée et chiffrée.</li>
              <li>Chaque commerçant dispose d&apos;un espace isolé (Row Level Security). Nous ne partageons jamais vos données avec d&apos;autres commerçants.</li>
              <li>Nous ne vendons jamais vos données à des tiers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Conditions Générales d&apos;Utilisation (CGU)</h2>
            <p>
              En créant un compte sur OrderFlow CI, vous acceptez les présentes conditions :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Compte :</strong> Vous êtes responsable de la confidentialité de vos identifiants.</li>
              <li><strong>Abonnement :</strong> Les abonnements sont mensuels. L&apos;essai gratuit de 14 jours se transforme en abonnement payant sauf résiliation avant la fin de l&apos;essai.</li>
              <li><strong>Résiliation :</strong> Vous pouvez résilier à tout moment depuis votre espace client. Aucun remboursement ne sera effectué pour le mois en cours.</li>
              <li><strong>Utilisation :</strong> Le service est destiné à la gestion commerciale légale. Toute utilisation frauduleuse entraînera la suspension du compte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Cookies</h2>
            <p>
              Nous utilisons des cookies essentiels pour maintenir votre session connectée et des cookies analytiques anonymes pour améliorer notre service. 
              Vous pouvez configurer vos préférences à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Vos droits</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. 
              Pour exercer ces droits, contactez-nous à : <strong>contact@orderflow.ci</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Hébergement</h2>
            <p>
              Vos données sont hébergées sur des serveurs sécurisés (Supabase & Vercel) situés en Europe et aux États-Unis, 
              avec des garanties de sécurité de niveau bancaire.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}