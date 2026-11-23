import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Receipt } from "lucide-react";

interface StatsProps {
  revenue: number;
  salesCount: number;
  expenses: number;
  customersCount: number;
  productsCount: number;
}

export function DashboardStats({ revenue, salesCount, expenses, customersCount, productsCount }: StatsProps) {
  // Formatage des nombres en FCFA
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat("fr-CI").format(amount) + " F";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      
      {/* Carte 1 : Chiffre d&apos;Affaires */}
      <div className="card p-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-slate-500">Chiffre d&apos;affaires</p>
          <DollarSign className="h-4 w-4 text-brand-600" />
        </div>
        <div className="text-2xl font-bold text-slate-900">{formatMoney(revenue)}</div>
        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-green-500" /> Ventes totales
        </p>
      </div>

      {/* Carte 2 : Nombre de Ventes */}
      <div className="card p-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-slate-500">Ventes</p>
          <ShoppingCart className="h-4 w-4 text-blue-600" />
        </div>
        <div className="text-2xl font-bold text-slate-900">{salesCount}</div>
        <p className="mt-1 text-xs text-slate-500">Commandes reçues</p>
      </div>

      {/* Carte 3 : Dépenses */}
      <div className="card p-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-slate-500">Dépenses</p>
          <Receipt className="h-4 w-4 text-red-500" />
        </div>
        <div className="text-2xl font-bold text-slate-900">{formatMoney(expenses)}</div>
        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
          <TrendingDown className="h-3 w-3 text-red-500" /> Charges totales
        </p>
      </div>

      {/* Carte 4 : Clients */}
      <div className="card p-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-slate-500">Clients</p>
          <Users className="h-4 w-4 text-purple-600" />
        </div>
        <div className="text-2xl font-bold text-slate-900">{customersCount}</div>
        <p className="mt-1 text-xs text-slate-500">Base de données</p>
      </div>

      {/* Carte 5 : Produits */}
      <div className="card p-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-slate-500">Produits</p>
          <Package className="h-4 w-4 text-amber-500" />
        </div>
        <div className="text-2xl font-bold text-slate-900">{productsCount}</div>
        <p className="mt-1 text-xs text-slate-500">En stock</p>
      </div>

    </div>
  );
}