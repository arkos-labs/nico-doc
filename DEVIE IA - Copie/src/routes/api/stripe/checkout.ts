import { createFileRoute } from "@tanstack/react-router";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const Route = createFileRoute("/api/stripe/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isStripeEnabled()) {
          return new Response(JSON.stringify({ error: "Stripe non configuré" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const body = await request.json();
          const { invoiceNumber, amount, clientName, successUrl, cancelUrl } = body;

          if (!invoiceNumber || !amount || !clientName) {
            return new Response(JSON.stringify({ error: "Paramètres manquants" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Convertir le montant en centimes
          const amountInCents = Math.round(amount * 100);

          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "sepa_debit"],
            line_items: [
              {
                price_data: {
                  currency: "eur",
                  product_data: {
                    name: `Facture ${invoiceNumber}`,
                    description: `Paiement pour le client ${clientName}`,
                  },
                  unit_amount: amountInCents,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: successUrl || request.headers.get("referer") || "http://localhost:5173",
            cancel_url: cancelUrl || request.headers.get("referer") || "http://localhost:5173",
            metadata: {
              invoiceNumber,
            },
          });

          return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("Erreur Stripe Checkout:", err);
          return new Response(JSON.stringify({ error: "Erreur serveur" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
