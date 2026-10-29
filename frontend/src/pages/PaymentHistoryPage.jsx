import { useEffect, useRef, useState } from 'react'
import { FaArrowUpRightFromSquare, FaCreditCard, FaReceipt } from 'react-icons/fa6'
import { Link, useSearchParams } from 'react-router'
import { authenticatedRequest } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { getCheckoutSession } from '../lib/checkout'

const formatMoney = (cents, currency = 'usd') => new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: currency.toUpperCase(),
}).format((cents || 0) / 100)

const PaymentHistoryPage = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [payments, setPayments] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const { clear } = useCart()
  const clearCartRef = useRef(clear)

  useEffect(() => {
    clearCartRef.current = clear
  }, [clear])

  useEffect(() => {
    const controller = new AbortController()
    const loadPayments = async () => {
      try {
        if (sessionId) {
          const checkout = await getCheckoutSession(sessionId, { signal: controller.signal })
          if (checkout.paymentStatus === 'paid') {
            clearCartRef.current()
            setConfirmed(true)
          }
        }
        const result = await authenticatedRequest('/api/payments', { signal: controller.signal })
        setPayments(result.payments)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPayments()
    return () => controller.abort()
  }, [sessionId])

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Account</p>
      <h1 className="mt-2 text-3xl font-black text-gray-950">Payments</h1>
      <p className="mt-2 text-sm text-gray-500">Payment confirmations, totals, and itemized checkout details.</p>
      {confirmed && (
        <div role="status" className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800">
          Payment confirmed. Your order has been added to your account.
        </div>
      )}
      {error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
      {loading && <p className="mt-6 animate-pulse text-sm text-cyan-800">Loading your payment history...</p>}
      {!loading && !error && !payments.length && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <FaCreditCard className="mx-auto text-3xl text-slate-300" />
          <p className="mt-3 font-bold text-slate-800">No payments yet</p>
          <Link to="/products" className="mt-4 inline-flex rounded-xl bg-cyan-800 px-5 py-3 text-sm font-bold text-white">Browse products</Link>
        </div>
      )}
      <div className="mt-6 space-y-4">
        {payments.map(payment => (
          <article key={payment.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Order {payment.id.slice(0, 8).toUpperCase()}</p>
                <p className="mt-1 text-sm text-slate-600">{new Date(payment.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900">{formatMoney(payment.amountTotal, payment.currency)}</p>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${payment.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {payment.paymentStatus || 'pending'}
                </span>
              </div>
            </header>
            <div className="space-y-3 p-5">
              {Array.isArray(payment.items) && payment.items.map(item => (
                <div key={`${item.productId}-${item.variantId || ''}`} className="flex items-center gap-3">
                  {item.thumbnail && <img src={item.thumbnail} alt="" className="h-14 w-14 rounded-xl bg-slate-50 object-contain p-1" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">{item.name}</p>
                    {item.variantLabel && <p className="text-xs text-slate-500">{item.variantLabel}</p>}
                    <p className="text-xs text-slate-500">Qty {item.quantity} · {formatMoney(Math.round(item.price * 100), payment.currency)} each</p>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                {payment.customerEmail && <span>Receipt email: {payment.customerEmail}</span>}
                {payment.paymentMethodTypes?.length > 0 && <span>Method: {payment.paymentMethodTypes.join(', ')}</span>}
                {payment.stripeSessionId && <span>Stripe session: {payment.stripeSessionId}</span>}
                {payment.customerDetails?.name && <span>Paid by: {payment.customerDetails.name}</span>}
                {payment.customerDetails?.address?.country && <span>Country: {payment.customerDetails.address.country}</span>}
                {payment.receiptUrl && <a href={payment.receiptUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-cyan-800 hover:underline"><FaReceipt /> Receipt <FaArrowUpRightFromSquare /></a>}
                <Link to="/dashboard/orders" className="ml-auto font-bold text-cyan-800 hover:underline">Track order</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PaymentHistoryPage
