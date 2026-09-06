import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') as string
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Initialisation de Stripe avec la clé secrète stockée dans les variables d'environnement Supabase
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Gestion du preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { cart, customerDetails } = await req.json()

    // Construction des Line Items pour Stripe
    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe attend le montant en centimes
      },
      quantity: item.qty,
    }))

    // Calcul du total pour savoir si on ajoute les frais de livraison
    const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.qty), 0)
    
    if (totalAmount < 60) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
          },
          unit_amount: 499, // 4.99 €
        },
        quantity: 1,
      })
    }

    // Création de la Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?checkout=success`,
      cancel_url: `${req.headers.get('origin')}/?checkout=cancel`,
      customer_email: customerDetails.email,
      metadata: {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        address: customerDetails.address,
        postalCode: customerDetails.postalCode,
        city: customerDetails.city,
      }
    })

    // Sauvegarde de la commande dans la base de données Supabase
    const { error: dbError } = await supabaseClient
      .from('orders')
      .insert([
        {
          customer_email: customerDetails.email,
          customer_name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          customer_address: `${customerDetails.address}, ${customerDetails.postalCode} ${customerDetails.city}`,
          items: cart,
          total_amount: totalAmount < 60 ? totalAmount + 4.99 : totalAmount,
          status: 'pending',
          stripe_session_id: session.id
        }
      ])

    if (dbError) {
      throw new Error(`Erreur DB: ${dbError.message || JSON.stringify(dbError)}`)
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
