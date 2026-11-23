"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

interface SalesChartProps {
  sales: { total: number; created_at: string }[];
}

export function SalesChart({ sales }: SalesChartProps) {
  // Préparer les données pour les 7 derniers jours
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0]; // Format YYYY-MM-DD
      const dayLabel = d.toLocaleDateString("fr-CI", { weekday: "short" });
      
      // Calculer le total des ventes pour ce jour
      const dailyTotal = sales
        .filter((s) => s.created_at.startsWith(dateString))
        .reduce((sum, s) => sum + Number(s.total), 0);

      days.push({ name: dayLabel, ventes: dailyTotal });
    }
    return days;
  };

  const data = getLast7Days();

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#15803D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#15803D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748B", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748B", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            formatter={(value) => {
              const amount = Array.isArray(value) ? value[0] : value;
              const numericAmount = typeof amount === "number" ? amount : Number(amount ?? 0);
              return [`${numericAmount.toLocaleString("fr-CI")} FCFA`, "Ventes"];
            }}
            contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
          />
          <Area 
            type="monotone" 
            dataKey="ventes" 
            stroke="#15803D" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorVentes)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}