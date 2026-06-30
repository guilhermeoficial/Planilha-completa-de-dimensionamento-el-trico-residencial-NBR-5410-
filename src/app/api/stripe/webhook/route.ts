import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const PRICE_PLANO: Record<string, string> = {
  [process.env.STRIPE_PRICE_QUESTOES ?? ""]: "questoes",
  [process.env.STRIPE_PRICE_ENSINO   ?? ""]: "ensino",
  [process.env.STRIPE_PRICE_COMBO    ?? ""]: "combo",
};

function planoDoPrice(priceId: string): string {
  return PRICE_PLANO[priceId] ?? "questoes";
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const mensagem = err instanceof Error ? err.message : "Assinatura inválida.";
    return NextResponse.json({ error: mensagem }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id ?? session.metadata?.supabase_user_id;
      const plano  = session.metadata?.plano ?? "questoes";
      if (userId && session.customer) {
        await supabase
          .from("profiles")
          .update({
            stripe_customer_id: String(session.customer),
            stripe_subscription_id: session.subscription ? String(session.subscription) : null,
            subscription_status: "active",
            plano,
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId  = subscription.metadata?.supabase_user_id;
      const status  = mapearStatus(subscription.status);
      const priceId = subscription.items.data[0]?.price?.id ?? "";
      const plano   = subscription.metadata?.plano ?? planoDoPrice(priceId);
      const periodEndUnix = (subscription as unknown as { current_period_end?: number }).current_period_end;

      const query = supabase.from("profiles").update({
        stripe_subscription_id: subscription.id,
        subscription_status: status,
        plano: status === "active" ? plano : "free",
        current_period_end: periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null,
      });

      if (userId) await query.eq("id", userId);
      else await query.eq("stripe_customer_id", String(subscription.customer));
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      const query = supabase.from("profiles").update({
        subscription_status: "canceled",
        plano: "free",
      });
      if (userId) await query.eq("id", userId);
      else await query.eq("stripe_customer_id", String(subscription.customer));
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function mapearStatus(stripeStatus: Stripe.Subscription.Status): "active" | "past_due" | "canceled" | "inactive" {
  if (stripeStatus === "active" || stripeStatus === "trialing") return "active";
  if (stripeStatus === "past_due" || stripeStatus === "unpaid") return "past_due";
  if (stripeStatus === "canceled" || stripeStatus === "incomplete_expired") return "canceled";
  return "inactive";
}
