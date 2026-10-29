import { FaMinus, FaPlus, FaTrashCan, FaXmark } from 'react-icons/fa6'
import { Link } from 'react-router'
import { useCart } from '../../contexts/CartContext'
import CheckoutButton from '../payment/CheckoutButton'

const money = amount => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amount)

const CartDrawer = ({ onClose }) => {
  const { items, updateQuantity, removeItem } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-70 flex justify-end bg-slate-950/55 backdrop-blur-sm" onMouseDown={onClose}>
      <aside
        className="flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Avenza Shop</p>
            <h2 id="cart-title" className="mt-1 text-2xl font-black text-gray-900">Your cart</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-cyan-100 hover:text-cyan-800">
            <FaXmark />
          </button>
        </div>

        {items.length ? (
          <>
            <div className="flex-1 divide-y divide-gray-100 overflow-y-auto px-6">
              {items.map(item => (
                <article key={`${item.productId}-${item.variantId || 'default'}`} className="flex gap-4 py-5">
                  <img src={item.thumbnail} alt={item.name} className="h-24 w-24 rounded-2xl bg-gray-50 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{item.brand}</p>
                    <h3 className="mt-1 line-clamp-2 font-bold text-gray-900">{item.name}</h3>
                    {item.variantLabel && <p className="mt-1 text-xs text-gray-500">{item.variantLabel}</p>}
                    <p className="mt-2 font-extrabold text-cyan-800">{money(item.price)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-2 py-1">
                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-lg hover:bg-gray-100"><FaMinus className="text-xs" /></button>
                        <span className="min-w-4 text-center text-sm font-bold">{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} disabled={item.quantity >= Math.min(10, item.stock)} className="grid h-7 w-7 place-items-center rounded-lg hover:bg-gray-100 disabled:opacity-40"><FaPlus className="text-xs" /></button>
                      </div>
                      <button type="button" onClick={() => removeItem(item.productId, item.variantId)} className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 transition hover:text-rose-700"><FaTrashCan /> Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="mb-4 flex items-center justify-between text-gray-600">
                <span>Subtotal</span><strong className="text-xl text-gray-900">{money(total)}</strong>
              </div>
              <CheckoutButton
                items={items.map(({ productId, variantId, quantity }) => ({ productId, variantId, quantity }))}
                label="Payment products"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 font-bold text-white transition hover:bg-cyan-800 disabled:cursor-wait disabled:opacity-60"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-cyan-50 text-2xl text-cyan-700">🛍</div>
            <h3 className="mt-5 text-xl font-black text-gray-900">Your cart is waiting</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">Find something you love and it will be right here.</p>
            <Link to="/products" onClick={onClose} className="mt-6 rounded-xl bg-cyan-700 px-6 py-3 font-bold text-white transition hover:bg-cyan-800">Explore products</Link>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
