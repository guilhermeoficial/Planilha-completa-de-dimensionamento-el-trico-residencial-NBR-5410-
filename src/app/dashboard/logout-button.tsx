"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.push("/login");
      }}
      className="rounded-md border border-panel-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-text"
    >
      Sair
    </button>
  );
}
