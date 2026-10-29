import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { getCheckoutSession } from '../lib/checkout'
import { useCart } from '../contexts/CartContext'

const CheckoutResult = ({ canceled = false }) => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [payment, setPayment] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(!canceled && Boolean(sessionId))
  const { clear } = useCart()

  useEffect(() => {
    if (payment?.paymentStatus === 'paid') clear()
  }, [payment, clear])

  useEffect(() => {
    if (canceled) return undefined

    if (!sessionId) return undefined

    const controller = new AbortController()
    getCheckoutSession(sessionId, { signal: controller.signal })
      .then(setPayment)
      .catch(fetchError => {
        if (fetchError.name !== 'AbortError') setError(fetchError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [canceled, sessionId])

  const paid = payment?.paymentStatus === 'paid'
  const title = canceled
    ? 'Checkout canceled'
    : paid
      ? 'Payment confirmed'
      : payment
        ? 'Payment processing'
        : sessionId
          ? 'Checking your payment'
          : 'Payment status unavailable'

  return (
    <main className="mx-auto flex min-h-[65vh] w-11/12 max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <div className="w-full rounded-3xl border border-cyan-100 bg-white p-8 shadow-xl shadow-cyan-950/5 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">Avenza Shop</p>
        <h1 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-gray-600">
          {canceled
            ? 'Your payment was not completed. Your items are still available whenever you are ready.'
            : loading
              ? 'Please wait while we confirm the payment status with Stripe.'
              : error
                ? error
                : !sessionId
                  ? 'No checkout session was provided, so the payment cannot be verified.'
                : paid
                  ? 'Thank you for your order. Your payment was securely processed by Stripe.'
                  : 'Stripe has not marked this payment as complete yet. Please check again shortly.'}
        </p>
        {payment?.amountTotal != null && (
          <p className="mt-3 font-semibold text-gray-800">
            Total: {(payment.amountTotal / 100).toLocaleString(undefined, {
              style: 'currency',
              currency: payment.currency?.toUpperCase() || 'USD',
            })}
          </p>
        )}
        {loading && <p className="mt-6 animate-pulse text-sm text-cyan-700">Verifying securely…</p>}
        <Link
          to="/products"
          className="mt-8 inline-flex rounded-xl bg-cyan-700 px-6 py-3 font-bold text-white transition hover:bg-cyan-800"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  )
}

export default CheckoutResult
