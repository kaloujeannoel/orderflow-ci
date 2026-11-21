import { Wallet, Users, Package, AlertTriangle } from "lucide-react";

export function StatsCards({ 
  revenue, 
  customersCount, 
  productsCount, 
  lowStockCount 
}: { 
  revenue: number, 
  customersCount: number, 
  productsCount: number, 
  lowStockCount: number 
}) {
  const cards = [
    {
      label: "Chiffre d'affaires",
      value: `${revenue.toLocaleString("fr-CI")} FCFA`,
      icon: Wallet,
      color: "text-brand-600 bg-brand-50",
    },
    {
      label: "Clients",
      value: customersCount.toString(),
      icon: Users,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Produits en stock",
      value: productsCount.toString(),
      icon: Package,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Alertes de stock",
      value: lowStockCount.toString(),
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="card p-5">
          <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
}