import { useEffect, useState } from 'react'
import { FaBoxOpen, FaCircleCheck, FaClock } from 'react-icons/fa6'
import { Link } from 'react-router'
import { authenticatedRequest } from '../contexts/AuthContext'

const OrderStatus = ({ status }) => {
  const paid = ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(status)
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${paid ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
      {paid ? <FaCircleCheck /> : <FaClock />} {status?.toLowerCase().replaceAll('_', ' ') || 'pending'}
    </span>
  )
}

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    authenticatedRequest('/api/orders', { signal: controller.signal })
      .then(result => setOrders(result.orders))
      .catch(requestError => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Account</p>
      <h1 className="mt-2 text-3xl font-black text-gray-950">My orders</h1>
      <p className="mt-2 text-sm text-gray-500">Follow each order from payment confirmation through fulfillment.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
      {loading && <p className="mt-6 animate-pulse text-sm text-cyan-800">Loading your orders...</p>}
      {!loading && !error && !orders.length && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <FaBoxOpen className="mx-auto text-3xl text-slate-300" />
          <p className="mt-3 font-bold text-slate-800">No orders to track yet</p>
          <Link to="/products" className="mt-4 inline-flex rounded-xl bg-cyan-800 px-5 py-3 text-sm font-bold text-white">Explore products</Link>
        </div>
      )}
      <div className="mt-6 space-y-4">
        {orders.map(order => (
          <article key={order.id} className="rounded-2xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                <p className="mt-1 text-sm text-slate-600">Placed {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <OrderStatus status={order.status} />
            </div>
            <div className="mt-4 space-y-3">
              {(Array.isArray(order.items) ? order.items : []).map(item => (
                <div key={`${item.productId}-${item.variantId || ''}`} className="flex items-center gap-3">
                  {item.thumbnail && <img src={item.thumbnail} alt="" className="h-12 w-12 rounded-lg bg-slate-50 object-contain p-1" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.variantLabel ? `${item.variantLabel} · ` : ''}Quantity {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{order.paymentStatus}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              {order.status === 'PAID'
                ? 'Payment confirmed. Your order is awaiting fulfillment updates.'
                : 'Payment or order status will update when checkout is confirmed.'}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
