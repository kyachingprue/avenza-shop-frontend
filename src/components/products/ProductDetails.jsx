import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { motion } from 'motion/react'
import {
  FaBoxOpen,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaStar,
  FaStore,
  FaTruck,
  FaUndo,
  FaUserCheck
} from 'react-icons/fa'
import { FiMinus, FiPlus, FiShoppingCart, FiZap } from 'react-icons/fi'
import { GoArrowRight } from 'react-icons/go'
import LocomotiveScroll from 'locomotive-scroll'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json')
        if (!response.ok) throw new Error('Unable to load products')

        const data = await response.json()
        const singleProduct = data.find(item => item.id === Number(id))

        setProduct(singleProduct || null)

        if (singleProduct) {
          setSelectedImage(singleProduct.thumbnail)
          setSelectedVariant(singleProduct.variants?.[0] || null)
        }
      } catch (error) {
        console.error('Product loading error:', error)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll()

    return () => locomotiveScroll.destroy()
  }, [])

  const galleryImages = useMemo(() => {
    if (!product) return []
    return [...new Set([product.thumbnail, ...(product.images || [])])]
  }, [product])

  const reviewCount =
    product?.reviewsSummary?.totalReviews ??
    (Array.isArray(product?.reviews)
      ? product.reviews.length
      : (product?.reviews ?? 0))

  const rating = product?.reviewsSummary?.averageRating ?? product?.rating ?? 0
  const currentPrice = selectedVariant?.price ?? product?.price ?? 0
  const currentStock = selectedVariant?.stock ?? product?.stock ?? 0
  const isLowStock = currentStock <= (product?.lowStockThreshold ?? 5)

  const formatKey = value =>
    value
      .replace(/([A-Z])/g, ' $1')
      .replace(/[-_]/g, ' ')
      .replace(/^./, letter => letter.toUpperCase())

  const renderSpecValue = value => {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'object') {
      return Object.entries(value).map(([key, nestedValue]) => (
        <div
          key={key}
          className="flex justify-between gap-5 border-b border-gray-100 py-2 last:border-0"
        >
          <span className="text-gray-500">{formatKey(key)}</span>
          <span className="text-right font-medium text-gray-900">
            {String(nestedValue)}
          </span>
        </div>
      ))
    }
    return String(value)
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <FaBoxOpen className="text-2xl text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="mt-2 text-gray-500">
            The product may have been removed or the link is incorrect.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-gray-900">
      {/* Product Hero */}
      <section className="mx-auto w-11/12 max-w-7xl px-2 pb-12 pt-28">
        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="transition hover:text-cyan-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="transition hover:text-cyan-600">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="transition hover:text-cyan-600"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="max-w-55 truncate font-medium text-gray-900">
            {product.name}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-sm">
              {product.discount > 0 && (
                <span className="absolute left-6 top-6 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  Save {product.discount}%
                </span>
              )}

              <button
                onClick={() => setLiked(value => !value)}
                className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:scale-105"
                aria-label="Add to wishlist"
              >
                {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-gray-50"
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover p-2 md:p-4 rounded-2xl"
                />
              </motion.div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3 md:grid-cols-5">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square overflow-hidden rounded-2xl border-2 bg-white p-1.5 transition ${
                    selectedImage === image
                      ? 'border-cyan-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full rounded-xl object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Trust / shipping cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <FaTruck className="text-xl text-cyan-600" />
                <p className="mt-2 text-sm font-bold">Fast Delivery</p>
                <p className="mt-1 text-xs text-gray-500">
                  {product.shipping?.estimatedDelivery || '3-5 business days'}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <FaUndo className="text-xl text-cyan-600" />
                <p className="mt-2 text-sm font-bold">Easy Returns</p>
                <p className="mt-1 text-xs text-gray-500">
                  {product.shipping?.returnPeriod || '30 days'} return window
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <FaShieldAlt className="text-xl text-cyan-600" />
                <p className="mt-2 text-sm font-bold">Warranty</p>
                <p className="mt-1 text-xs text-gray-500">
                  {product.warranty?.duration || '1 Year'}
                </p>
              </div>
            </div>
          </div>

          {/* Purchase panel */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-cyan-700">
                {product.category}
              </span>
              {product.isBestSeller && (
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                  Best Seller
                </span>
              )}
              {product.isNew && (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  New Arrival
                </span>
              )}
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              {product.brand} · {product.subcategory}
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5">
                <FaStar className="text-amber-500" />
                <span className="font-bold">{Number(rating).toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-500">
                {reviewCount.toLocaleString()} verified reviews
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                SKU: {selectedVariant?.sku || product.sku}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-end gap-4">
              <span className="text-4xl font-black tracking-tight text-gray-950">
                ${currentPrice.toLocaleString()}
              </span>
              {product.oldPrice > currentPrice && (
                <del className="pb-1 text-lg text-gray-400">
                  ${product.oldPrice.toLocaleString()}
                </del>
              )}
              {product.discount > 0 && (
                <span className="mb-1 rounded-lg bg-red-50 px-2.5 py-1 text-sm font-bold text-red-600">
                  -{product.discount}%
                </span>
              )}
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {product.shortDescription || product.description}
            </p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-bold">Available Options</h3>
                  <span className="text-xs text-gray-500">
                    Select your preferred variant
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {product.variants.map(variant => {
                    const active = selectedVariant?.id === variant.id
                    const label = [
                      variant.color,
                      variant.storage,
                      variant.size,
                      variant.option
                    ]
                      .filter(Boolean)
                      .join(' / ')
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`rounded-xl border p-3 text-left transition ${
                          active
                            ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold">
                            {label || 'Standard'}
                          </span>
                          {active && (
                            <FaCheckCircle className="shrink-0 text-cyan-600" />
                          )}
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                          <span>${variant.price?.toLocaleString()}</span>
                          <span>
                            {variant.stock > 0
                              ? `${variant.stock} available`
                              : 'Out of stock'}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold">Availability</span>
                <span
                  className={
                    isLowStock
                      ? 'font-bold text-orange-600'
                      : 'font-bold text-emerald-600'
                  }
                >
                  {currentStock > 0
                    ? isLowStock
                      ? `Only ${currentStock} left`
                      : 'In Stock'
                    : 'Out of Stock'}
                </span>
              </div>
              {currentStock > 0 && (
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${isLowStock ? 'w-1/4 bg-orange-500' : 'w-3/4 bg-emerald-500'}`}
                  />
                </div>
              )}
            </div>

            {/* Quantity + CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-13 items-center justify-between rounded-xl border border-gray-300 px-2 sm:w-32">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(q => Math.min(currentStock || 1, q + 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <FiPlus />
                </button>
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={currentStock <= 0}
                className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <FiShoppingCart /> Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={currentStock <= 0}
                className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <FiZap /> Buy Now
              </motion.button>
            </div>

            {/* Seller */}
            <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                    <FaStore className="text-lg text-cyan-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">
                        {product.seller?.name ||
                          `${product.brand} Official Store`}
                      </p>
                      {product.seller?.verified && (
                        <FaCheckCircle
                          className="text-sm text-cyan-600"
                          title="Verified seller"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {product.seller?.totalProducts?.toLocaleString() ||
                        '500+'}{' '}
                      products · Trusted seller
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {product.seller?.rating || '4.8'} ★
                  </p>
                  <p className="text-xs text-gray-500">Seller rating</p>
                </div>
              </div>
            </div>

            {/* Payment / protection */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <FaUserCheck className="text-cyan-600" /> Secure checkout
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-cyan-600" /> Buyer protection
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-cyan-600" /> Free shipping
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-cyan-600" /> Easy returns
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description / features / specifications */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto w-11/12 max-w-7xl px-2 py-12 md:px-5">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {[
              ['description', 'Overview'],
              ['specifications', 'Specifications'],
              ['reviews', `Reviews (${reviewCount.toLocaleString()})`],
              ['faq', 'FAQ']
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-bold transition ${
                  activeTab === key
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="leading-8 text-gray-600">{product.description}</p>

                <h2 className="mt-9 text-2xl font-black">Key Features</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {(product.features || []).map((feature, index) => (
                    <motion.div
                      key={feature.title || index}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                          <FaCheck />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {feature.title || feature}
                          </h3>
                          {feature.description && (
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-xl font-black">What&apos;s in the box</h2>
                <div className="mt-5 space-y-3">
                  {(product.packageContents || []).map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-3 rounded-xl bg-white p-3"
                    >
                      <FaCheckCircle className="shrink-0 text-emerald-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 border-t border-gray-200 pt-6">
                  <h3 className="font-bold">Warranty & Returns</h3>
                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    <p className="flex gap-3">
                      <FaShieldAlt className="mt-0.5 text-cyan-600" />
                      {product.warranty?.duration || '1 Year'}{' '}
                      {product.warranty?.type || 'limited warranty'}
                    </p>
                    <p className="flex gap-3">
                      <FaUndo className="mt-0.5 text-cyan-600" />
                      {product.shipping?.returnPeriod || '30 days'} return
                      period
                    </p>
                    <p className="flex gap-3">
                      <FaTruck className="mt-0.5 text-cyan-600" />
                      {product.shipping?.estimatedDelivery ||
                        '3-5 business days'}{' '}
                      delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="py-10">
              <div className="grid gap-5 md:grid-cols-2">
                {Object.entries(product.specifications || {}).map(
                  ([group, values]) => (
                    <div
                      key={group}
                      className="overflow-hidden rounded-2xl border border-gray-200"
                    >
                      <div className="bg-gray-50 px-5 py-4 font-bold">
                        {formatKey(group)}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {Object.entries(values).map(([key, value]) => (
                          <div
                            key={key}
                            className="grid grid-cols-[0.85fr_1.15fr] gap-4 px-5 py-3.5 text-sm"
                          >
                            <span className="text-gray-500">
                              {formatKey(key)}
                            </span>
                            <span className="font-medium text-gray-900">
                              {renderSpecValue(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
              <div className="h-fit rounded-3xl border border-gray-200 bg-gray-50 p-7 text-center">
                <p className="text-5xl font-black">
                  {Number(rating).toFixed(1)}
                </p>
                <div className="mt-3 flex justify-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar key={star} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Based on {reviewCount.toLocaleString()} reviews
                </p>
                {Object.entries(product.reviewsSummary?.ratingBreakdown || {})
                  .reverse()
                  .map(([star, count]) => (
                    <div
                      key={star}
                      className="mt-3 flex items-center gap-2 text-xs"
                    >
                      <span className="w-8">{star} ★</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{
                            width: `${Math.min(100, (count / reviewCount) * 100)}%`
                          }}
                        />
                      </div>
                      <span className="w-12 text-right text-gray-500">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="space-y-4">
                {(Array.isArray(product.reviews) ? product.reviews : []).map(
                  review => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-gray-200 bg-white p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.user?.avatar}
                            alt={review.user?.name}
                            className="h-11 w-11 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-bold">{review.user?.name}</p>
                            <p className="text-xs text-gray-500">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        {review.verifiedPurchase && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                            <FaCheckCircle /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map(star => (
                          <FaStar
                            key={star}
                            className={
                              star <= review.rating ? '' : 'text-gray-200'
                            }
                          />
                        ))}
                      </div>
                      <h3 className="mt-3 font-bold">{review.title}</h3>
                      <p className="mt-2 leading-7 text-gray-600">
                        {review.comment}
                      </p>
                      <p className="mt-4 text-xs text-gray-400">
                        {review.helpful || 0} people found this helpful
                      </p>
                    </article>
                  )
                )}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="mx-auto max-w-4xl py-10">
              {(product.faqs || []).map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div key={index} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    >
                      <span className="font-bold">{faq.question}</span>
                      <FaChevronDown
                        className={`shrink-0 transition ${isOpen ? 'rotate-180 text-cyan-600' : 'text-gray-400'}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-5 pr-10 text-sm leading-7 text-gray-500">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Promo banner */}
      <section className="mx-auto w-11/12 max-w-7xl px-2 py-12 md:px-5">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gray-950 p-7 text-white md:p-10"
        >
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase">
                Limited Offer
              </span>
              <h2 className="mt-4 text-2xl font-black md:text-3xl">
                Upgrade your everyday setup.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                Explore more products from {product.category} and find the right
                match for your needs.
              </p>
            </div>
            <Link
              to="/products"
              className="group flex shrink-0 items-center gap-3 rounded-xl bg-white px-5 py-3 font-bold text-gray-950 transition hover:bg-cyan-500 hover:text-white"
            >
              Explore Products{' '}
              <GoArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

export default ProductDetails
