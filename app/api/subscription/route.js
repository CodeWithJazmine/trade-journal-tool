import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ active: false }, { status: 401 })
  }

  const sessions = await stripe.checkout.sessions.list({ limit: 100 })

  const userSession = sessions.data.find(
    s => s.metadata?.userId === userId && s.payment_status === 'paid'
  )

  if (!userSession) {
    return Response.json({ active: false, cancelAtPeriodEnd: false })
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: userSession.customer,
    status: 'active',
    expand: ['data.items'],
  })

  if (subscriptions.data.length === 0) {
    return Response.json({ active: false, cancelAtPeriodEnd: false })
  }

const sub = await stripe.subscriptions.retrieve(subscriptions.data[0].id)

const periodEnd = sub.items?.data?.[0]?.current_period_end
  ? new Date(sub.items.data[0].current_period_end * 1000).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  : null

  return Response.json({
    active: true,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    periodEnd
  })
}