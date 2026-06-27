import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";
import ManageSubscriptionButton from "./manage-subscription-button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  let ehAdmin = false;

  if (data.user) {
    const { data: profile, error: erroProfile } = await supabase
      .from("profiles")
      .select("subscription_status, is_admin")
      .eq("id", data.user.id)
      .single();

    ehAdmin = profile?.is_admin === true;

    if (!ehAdmin && (!profile || profile.subscription_status !== "active")) {
      if (process.env.DEBUG_ADMIN === "1") {
        return (
          <pre style={{ padding: 24, color: "#fff", background: "#111", fontSize: 12, whiteSpace: "pre-wrap" }}>
            DEBUG{"\n"}
            user.id: {data.user.id}{"\n"}
            user.email: {data.user.email}{"\n"}
            profile: {JSON.stringify(profile)}{"\n"}
            erroProfile: {JSON.stringify(erroProfile)}
          </pre>
        );
      }
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
        <div className="flex items-center gap-4 text-sm text-muted">
          {ehAdmin && (
            <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
              Conta mestre
            </span>
          )}
          <span className="hidden sm:inline">{data.user?.email}</span>
          {!ehAdmin && <ManageSubscriptionButton />}
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1 blueprint-grid">{children}</main>
    </div>
  );
}
