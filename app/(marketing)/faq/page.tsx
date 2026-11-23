import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "Ai-je besoin d'une carte bancaire pour l'essai gratuit ?",
    a: "Non. L'essai de 14 jours est 100% gratuit et ne nécessite aucune carte bancaire. Vous pouvez tester toutes les fonctionnalités sans engagement.",
  },
  {
    q: "Comment payer mon abonnement ?",
    a: "Le paiement se fait par Mobile Money : Orange Money, MTN Mobile Money, Moov Money ou Wave. C'est simple et sécurisé.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Oui. Chaque commerçant dispose d'un espace strictement isolé. Vos données (chiffre d'affaires, clients, stocks) sont chiffrées et personne d'autre que vous ne peut y accéder.",
  },
  {
    q: "Puis-je utiliser OrderFlow CI sur mon téléphone ?",
    a: "Absolument. L'application est entièrement responsive et fonctionne parfaitement sur smartphone, tablette et ordinateur.",
  },
  {
    q: "Que se passe-t-il si j'arrête mon abonnement ?",
    a: "Vous conservez l'accès à vos données pendant 30 jours pour les exporter (PDF, Excel). Ensuite, elles sont définitivement supprimées de nos serveurs.",
  },
  {
    q: "Est-ce que les factures sont conformes à la réglementation ivoirienne ?",
    a: "Oui. Les factures générées intègrent les mentions légales requises (RCCM, DFE). Nous préparons également l'intégration de la Facture Normalisée Électronique (FNE).",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container-page max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 mb-8">
          <ArrowLeft className="h-4 w-4" /> Retour à l&apos;accueil
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Questions Fréquentes</h1>
          <p className="mt-4 text-lg text-slate-600">Tout ce que vous devez savoir avant de commencer.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card p-6">
              <h3 className="text-base font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center card p-8 bg-brand-50 border-brand-100">
          <MessageCircle className="h-8 w-8 text-brand-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-900">Vous avez une autre question ?</h2>
          <p className="mt-2 text-sm text-slate-600">Notre équipe est là pour vous aider.</p>
          <a href="mailto:support@orderflow.ci" className="btn-primary mt-6 inline-flex">
            Contacter le support
          </a>
        </div>
      </div>
    </div>
  );
}