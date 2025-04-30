// import { stripe } from '@/lib/stripe'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Route to create a new Stripe Checkout Session
export async function GET() {
  // Checking if the user is logged in
  const user = await currentUser()
  if (!user) return NextResponse.json({ status: 404 })
  
  // Fetching the subscription price ID which corresponds to a subscription product set up in the Stripe dashboard.
  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

  // COMMENT FOR STRIPE
  // Creating a new Stripe Checkout Session 
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'subscription',
  //   line_items: [ 
  //     {
  //       price: priceId,
  //       quantity: 1,
  //     },
  //   ],
  //   success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
  // })

  // Respond with the Session URL // COMMENT FOR STRIPE
  // if (session) {
  //   return NextResponse.json({
  //     status: 200,
  //     session_url: session.url,
  //   })
  // }

  return NextResponse.json({ status: 400 })
}