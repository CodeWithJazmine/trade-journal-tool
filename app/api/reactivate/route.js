import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sessions = await stripe.checkout.sessions.list({ limit: 100 })

  const userSession = sessions.data.find(
    s => s.metadata?.userId === userId && s.payment_status === 'paid'
  )

  if (!userSession) {
    return Response.json({ error: 'No subscription found' }, { status: 404 })
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: userSession.customer,
    status: 'active',
  })

  if (subscriptions.data.length === 0) {
    return Response.json({ error: 'No active subscription' }, { status: 404 })
  }

  await stripe.subscriptions.update(subscriptions.data[0].id, {
    cancel_at_period_end: false,
  })

  return Response.json({ success: true })
}