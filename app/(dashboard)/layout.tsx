import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

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
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        
        {/* On appelle le composant Header interactif */}
        <Header userEmail={user.email || ""} />
        
        {/* Contenu principal */}
        <main className="flex-1 p-4 pt-8 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}