import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      {/* Sur mobile : pas de padding gauche. Sur PC : padding de 64 (16rem) pour la Sidebar */}
      <div className="lg:pl-64">
        {/* pt-16 pour laisser de la place au bouton Menu sur mobile, p-4 sur mobile, p-8 sur PC */}
        <main className="p-4 pt-16 lg:p-8 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}