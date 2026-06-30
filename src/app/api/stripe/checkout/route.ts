import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const PRICE_IDS: Record<string, string> = {
  questoes: process.env.STRIPE_PRICE_QUESTOES!,
  ensino:   process.env.STRIPE_PRICE_ENSINO!,
  combo:    process.env.STRIPE_PRICE_COMBO!,
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // plano vem no body: { plano: "questoes" | "ensino" | "combo" }
  let plano = "questoes";
  try {
    const body = await request.json();
    if (body?.plano && PRICE_IDS[body.plano]) plano = body.plano;
  } catch { /* body vazio — usa questoes como padrão */ }

  const priceId = PRICE_IDS[plano];

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  const origin = new URL(request.url).origin;

  const baseParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
    mode: "subscription",
    customer: profile?.stripe_customer_id ?? undefined,
    customer_email: profile?.stripe_customer_id ? undefined : user.email,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?assinatura=sucesso`,
    cancel_url: `${origin}/assinar?cancelado=1`,
    allow_promotion_codes: true,
    metadata: { supabase_user_id: user.id, plano },
    subscription_data: { metadata: { supabase_user_id: user.id, plano } },
  };

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      ...baseParams,
      payment_method_types: ["card", "pix"],
      payment_method_options: {
        pix: { mandate_options: { amount: plano === "questoes" ? 1990 : 3990, payment_schedule: "monthly" } },
      },
    });
  } catch {
    session = await stripe.checkout.sessions.create({
      ...baseParams,
      payment_method_types: ["card"],
    });
  }

  return NextResponse.json({ url: session.url });
}
