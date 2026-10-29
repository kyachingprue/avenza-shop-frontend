import { useEffect, useState } from 'react'
import { FaCheckCircle, FaStar } from 'react-icons/fa'
import { FaCartShopping, FaEye } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { addProductToCart } from '../../lib/cart-actions'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ProductCard = ({ product, isSample = false }) => {
  const { user } = useAuth()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 500, once: true, offset: 60 })
  }, [])

  const rating = product?.reviewsSummary?.averageRating ?? product?.rating ?? 0
  const stock = product?.stock ?? 0
  const isInStock = stock > 0
  const handleAddToCart = () => {
    if (addProductToCart({ user, addItem, navigate, location, product })) {
      setAdded(true)
      window.setTimeout(() => setAdded(false), 1600)
    }
  }

  return (
    <article
      data-aos="fade-up"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden bg-slate-50">
        {isSample ? (
          <div className="block">
            <img
              src={product.thumbnail}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
            />
          </div>
        ) : (
          <Link to={`/products/details/${product.id}`} className="block">
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
          />
          </Link>
        )}
        {isSample && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
            Sample
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-bold text-white">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-cyan-800">{product.brand}</p>
          <span className="max-w-1/2 truncate rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{product.category}</span>
        </div>
        {isSample ? (
          <h2 className="mt-2 line-clamp-2 pb-2 text-sm font-bold leading-5 text-slate-900 sm:text-base">
            {product.name}
          </h2>
        ) : (
          <Link to={`/products/details/${product.id}`}>
          <h2 className="mt-2 line-clamp-2 pb-2 text-sm font-bold leading-5 text-slate-900 transition hover:text-cyan-800 sm:text-base">
            {product.name}
          </h2>
          </Link>
        )}

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <FaStar className="text-amber-400" />
          <span className="font-bold text-slate-800">{Number(rating).toFixed(1)}</span>
          <span className="text-slate-400">·</span>
          {isInStock
            ? <span className="inline-flex items-center gap-1 text-emerald-700"><FaCheckCircle /> In stock</span>
            : <span className="text-rose-600">Out of stock</span>}
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <strong className="text-xl font-black text-cyan-800">${Number(product.price).toLocaleString()}</strong>
          {product.oldPrice > product.price && (
            <del className="text-xs text-slate-400">${Number(product.oldPrice).toLocaleString()}</del>
          )}
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-400">{product.currency || 'USD'}</span>
        </div>

        {isSample ? (
          <p className="mt-3 rounded-lg bg-slate-100 px-2 py-2.5 text-center text-xs font-semibold text-slate-500">
            Sample item · not available to purchase
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              to={`/products/details/${product.id}`}
              className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-cyan-800 px-2 text-base font-bold text-cyan-900 transition hover:bg-cyan-50"
            >
              <FaEye /> Details
            </Link>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`flex h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
                added ? 'bg-emerald-600' : 'bg-cyan-800 hover:bg-cyan-900'
              }`}
            >
              <FaCartShopping /> {added ? 'Added' : 'Add to cart'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProductCard
