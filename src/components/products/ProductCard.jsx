import { useEffect } from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { FaStar, FaHeart, FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ProductCard = ({ product }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      delay: 50,
      offset: 100
    })
  }, [])

  // New JSON structure
  const totalReviews =
    product?.reviewsSummary?.totalReviews ??
    (Array.isArray(product?.reviews) ? product.reviews.length : 0)

  const rating = product?.reviewsSummary?.averageRating ?? product?.rating ?? 0

  const stock = product?.stock ?? 0

  const isInStock = stock > 0

  return (
    <div>
      <div
        data-aos="fade-up"
        className="group overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-md transition-all hover:duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* ================= IMAGE ================= */}
        <div className="relative overflow-hidden bg-gray-100">
          <Link to={`/products/details/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Discount */}
          {product.discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow">
              -{product.discount}%
            </span>
          )}

          {/* New Badge */}
          {product.isNew && (
            <span className="absolute left-4 top-14 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow">
              New
            </span>
          )}

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-red-50 hover:text-red-500"
          >
            <FaHeart />
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-5">
          {/* Brand + Category */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-blue-600">
              {product.brand}
            </p>

            {product.category && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                {product.category}
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/products/details/${product.id}`}>
            <h2 className="mt-3 line-clamp-2 min-h-14 cursor-pointer text-xl font-bold text-gray-900 transition hover:text-blue-700">
              {product.name}
            </h2>
          </Link>

          {/* ================= RATING ================= */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <FaStar className="text-sm text-yellow-400" />

              <span className="font-semibold text-gray-800">
                {Number(rating).toFixed(1)}
              </span>
            </div>

            <span className="text-gray-300">•</span>

            <span className="text-sm text-gray-500">
              {Number(totalReviews).toLocaleString()} reviews
            </span>
          </div>

          {/* ================= PRICE ================= */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-black text-blue-600">
              ${Number(product.price).toLocaleString()}
            </h3>

            {product.oldPrice && (
              <del className="text-sm font-medium text-gray-400">
                ${Number(product.oldPrice).toLocaleString()}
              </del>
            )}

            {product.discount > 0 && (
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* ================= STOCK ================= */}
          <div className="mt-4">
            {isInStock ? (
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-sm text-emerald-500" />

                <p className="text-sm font-semibold text-emerald-600">
                  In Stock
                </p>

                <span className="text-xs text-gray-400">
                  ({stock} available)
                </span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-red-500">Out of Stock</p>
            )}
          </div>

          {/* ================= SELLER ================= */}
          {product.seller && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Sold by{' '}
                  <span className="font-semibold text-gray-700">
                    {product.seller.name}
                  </span>
                </span>

                {product.seller.verified && (
                  <span className="flex items-center gap-1 font-medium text-blue-600">
                    <FaCheckCircle />
                    Verified
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ================= SHIPPING ================= */}
          {product.shipping?.freeShipping && (
            <p className="mt-3 text-xs font-medium text-gray-500">
              🚚 Free shipping • {product.shipping.estimatedDelivery}
            </p>
          )}

          {/* ================= BUTTON ================= */}
          <button
            type="button"
            disabled={!isInStock}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all duration-300 ${
              isInStock
                ? 'border border-cyan-400 bg-white text-gray-900 hover:border-blue-700 hover:bg-blue-700 hover:text-white'
                : 'cursor-not-allowed bg-gray-100 text-gray-400'
            }`}
          >
            <FaCartShopping />

            {isInStock ? 'Add To Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
