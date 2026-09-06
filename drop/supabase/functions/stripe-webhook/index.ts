import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

// Ce secret est généré par Stripe lors de la configuration du Webhook dans le Dashboard Stripe
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()
    // Vérification de la signature Stripe pour des raisons de sécurité
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      endpointSecret
    )

    // Si le paiement est un succès
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
      // On utilise le SERVICE_ROLE_KEY ici car c'est une opération en arrière-plan (serveur à serveur)
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
      const supabase = createClient(supabaseUrl, supabaseServiceKey)

      // Mise à jour de la commande : on passe le statut à "payé"
      const { error } = await supabase
        .from('orders')
        .update({ status: 'payé' })
        .eq('stripe_session_id', session.id)

      if (error) {
        console.error('Erreur lors de la mise à jour de la commande:', error)
        return new Response('Erreur Base de Données', { status: 500 })
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})
