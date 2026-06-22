import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-panel-border bg-bg-elevated px-6 py-3.5">
        <Link href="/dashboard" className="flex items-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span className="hidden sm:inline">{data.user?.email}</span>
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1 blueprint-grid">{children}</main>
    </div>
  );
}
