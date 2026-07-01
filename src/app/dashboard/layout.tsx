import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";
import ManageSubscriptionButton from "./manage-subscription-button";
import TemaToggle from "@/components/tema-toggle";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  let ehAdmin = false;

  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status, is_admin")
      .eq("id", data.user.id)
      .single();

    ehAdmin = profile?.is_admin === true;

    if (!ehAdmin && (!profile || profile.subscription_status !== "active")) {
      redirect("/assinar");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-panel-border bg-bg-elevated px-6 py-3.5">
        <Link href="/dashboard" className="flex items-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Voltis
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted">
          {ehAdmin && (
            <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
              Conta mestre
            </span>
          )}
          <span className="hidden sm:inline">{data.user?.email}</span>
          <TemaToggle />
          {!ehAdmin && <ManageSubscriptionButton />}
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1 blueprint-grid">{children}</main>
    </div>
  );
}
