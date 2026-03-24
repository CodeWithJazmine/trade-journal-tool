import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { userId } = await auth()
    console.log('userId:', userId)

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    console.log('body:', body)
    const { priceId } = body

    if (!priceId) {
      return Response.json({ error: 'No price selected' }, { status: 400 })
    }

    console.log('priceId:', priceId)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tool?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tool?canceled=true`,
      metadata: { userId },
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}