import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifica se o usuário tem assinatura ativa.
 * Se não tiver, redireciona para /assinar.
 * Use no início de qualquer Server Component de página paga.
 */
export async function verificarAssinatura() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, is_admin")
    .eq("id", data.user.id)
    .single();

  const ehAdmin = profile?.is_admin === true;
  const ehAssinante = ehAdmin || profile?.subscription_status === "active";

  if (!ehAssinante) {
    redirect("/assinar");
  }

  return { ehAdmin, ehAssinante };
}
