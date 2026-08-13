import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import Loading from '../common/Loading'

const PostCardDetails = () => {
  const [searchParams] = useSearchParams()

  const postId = searchParams.get('id')

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)

        const res = await fetch('/posts.json')

        if (!res.ok) {
          throw new Error('Failed to fetch post')
        }

        const data = await res.json()

        const foundPost = data.find(item => item.id === postId)

        setPost(foundPost || null)

        if (foundPost) {
          setSelectedImage(foundPost.product.thumbnail)
          setSelectedColor(foundPost.product.colors[0]?.name || '')
          setSelectedSize(foundPost.product.sizes[0] || '')
        }
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()

  }, [postId])

  // Loading
  if (loading) {
    return (
      <Loading/>
    )
  }

  // Post not found
  if (!post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Post Not Found</h2>

        <p className="mt-3 text-gray-500">
          We couldn't find the post you're looking for.
        </p>

        <Link
          to="/posts"
          className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Back to Posts
        </Link>
      </div>
    )
  }

  const {
    user,
    title,
    shortDescription,
    content,
    product,
    pros,
    cons,
    ratingBreakdown,
    reviews,
    seller,
    shipping,
    engagement,
    tags
  } = post

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      {/* ================= HEADER ================= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto w-11/12 px-4 py-8 lg:px-5">
          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition hover:text-gray-900">
              Home
            </Link>
            <span>/</span>

            <Link to="/posts" className="transition hover:text-gray-900">
              Posts
            </Link>

            <span>/</span>

            <span className="text-gray-900">{product.category}</span>
          </div>

          {/* Author */}
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
              />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>

                  {user.verified && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                      ✓
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  @{user.username} · {user.location}
                </p>
              </div>
            </div>

            {/* Engagement */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>♡ {engagement.likes}</span>
              <span>💬 {engagement.comments}</span>
              <span>↗ {engagement.shares}</span>
              <span>👁 {engagement.views}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT ================= */}
      <section className="mx-auto w-11/12 px-4 py-10 lg:px-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* ================= IMAGE GALLERY ================= */}
          <div>
            {/* Main Image */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-95 w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-125"
              />

              {/* Discount */}
              <div className="absolute left-5 top-5 rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white">
                -{product.discount}% OFF
              </div>
            </div>
            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 mx-auto gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-xl border-4 bg-white transition ${
                    selectedImage === image
                      ? 'border-blue-900'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-20 w-full object-cover sm:h-24"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div>
            {/* Category */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {product.category}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {product.subcategory}
              </span>

              <span className="text-sm text-green-600">
                {product.availability}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>

            {/* Short Description */}
            <p className="mt-5 text-base leading-7 text-gray-600">
              {shortDescription}
            </p>

            {/* Rating */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl text-yellow-500">★</span>

                <span className="font-bold text-gray-900">
                  {product.rating}
                </span>

                <span className="text-sm text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <span className="h-4 w-px bg-gray-300" />

              <span className="text-sm text-gray-500">
                {product.soldCount.toLocaleString()} sold
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>

              <span className="text-xl text-gray-400 line-through">
                ${product.oldPrice}
              </span>

              <span className="rounded-lg bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                Save {product.discount}%
              </span>
            </div>

            {/* Brand */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Brand</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.brand}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Model</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.model}
                  </p>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Color</h3>

                <span className="text-sm text-gray-500">{selectedColor}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    disabled={!color.available}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                      selectedColor === color.name
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                    } ${
                      !color.available ? 'cursor-not-allowed opacity-40' : ''
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: color.hex
                      }}
                    />

                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Size</h3>

                <span className="text-sm text-gray-500">
                  Selected: {selectedSize}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-600">
                Add to Cart
              </button>

              <button className="flex-1 rounded-xl border border-gray-900 bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white">
                Buy Now
              </button>
            </div>

            {/* Shipping */}
            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🚚</span>

                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>

                  <p className="mt-1 text-sm text-gray-600">
                    Estimated delivery: {shipping.estimatedDelivery}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {shipping.returnPeriod} return available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Full Review */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Product Review
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  My Experience With This Product
                </h2>
              </div>

              <div className="space-y-7 text-gray-600">
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Introduction
                  </h3>

                  <p className="leading-7">{content.introduction}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Full Description
                  </h3>

                  <p className="leading-7">{content.fullDescription}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Comfort
                  </h3>

                  <p className="leading-7">{content.comfort}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Breathability
                  </h3>

                  <p className="leading-7">{content.breathability}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Grip</h3>

                  <p className="leading-7">{content.grip}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Durability
                  </h3>

                  <p className="leading-7">{content.durability}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Final Opinion
                  </h3>

                  <p className="leading-7">{content.finalOpinion}</p>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.features.map(feature => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm text-green-600">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Specifications */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Specifications
              </h2>

              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
                {Object.entries(product.specifications).map(
                  ([key, value], index) => (
                    <div
                      key={key}
                      className={`grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <span className="text-sm font-semibold capitalize text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>

                      <span className="text-sm text-gray-600">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
                <h2 className="text-xl font-bold text-gray-900">What I Like</h2>

                <div className="mt-5 space-y-3">
                  {pros.map(item => (
                    <div
                      key={item}
                      className="flex gap-3 text-sm text-gray-700"
                    >
                      <span className="text-green-600">✓</span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  What Could Be Better
                </h2>

                <div className="mt-5 space-y-3">
                  {cons.map(item => (
                    <div
                      key={item}
                      className="flex gap-3 text-sm text-gray-700"
                    >
                      <span className="text-red-500">×</span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Box Contents */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                What's Inside The Box?
              </h2>

              <div className="mt-6 space-y-3">
                {product.boxContents.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                      {index + 1}
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.reviewCount} reviews
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {product.rating}
                  </div>

                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="mt-7 space-y-3">
                {Object.entries(ratingBreakdown)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([star, count]) => {
                    const percentage = (count / product.reviewCount) * 100

                    return (
                      <div
                        key={star}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="w-8">{star} ★</span>

                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-yellow-400"
                            style={{
                              width: `${percentage}%`
                            }}
                          />
                        </div>

                        <span className="w-10 text-right text-gray-500">
                          {count}
                        </span>
                      </div>
                    )
                  })}
              </div>

              {/* Individual Reviews */}
              <div className="mt-8 divide-y divide-gray-100">
                {reviews.map(review => (
                  <div key={review.id} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {review.user.name}
                            </p>

                            {review.verifiedPurchase && (
                              <p className="text-xs text-green-600">
                                ✓ Verified Purchase
                              </p>
                            )}
                          </div>

                          <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="mt-2 text-yellow-500">
                          {'★'.repeat(review.rating)}
                        </div>

                        <h3 className="mt-2 font-semibold text-gray-900">
                          {review.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {review.comment}
                        </p>

                        <button className="mt-3 text-xs font-medium text-gray-500 hover:text-gray-900">
                          Helpful · {review.helpful}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6">
            {/* Seller */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Sold By
              </p>

              <div className="mt-5 flex items-center gap-3">
                <img
                  src={seller.logo}
                  alt={seller.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{seller.name}</h3>

                    {seller.verified && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {seller.totalProducts} products
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="font-bold text-gray-900">{seller.rating}</p>

                  <p className="text-xs text-gray-500">Seller Rating</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="font-bold text-gray-900">
                    {seller.positiveFeedback}%
                  </p>

                  <p className="text-xs text-gray-500">Positive</p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900">
                Visit Store
              </button>
            </div>

            {/* Engagement */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Post Engagement</h3>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ['Likes', engagement.likes],
                  ['Comments', engagement.comments],
                  ['Shares', engagement.shares],
                  ['Bookmarks', engagement.bookmarks]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-lg font-bold text-gray-900">
                      {value.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Delivery & Returns</h3>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <span>🚚</span>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Delivery
                    </p>

                    <p className="text-xs text-gray-500">
                      {shipping.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span>↩</span>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Returns
                    </p>

                    <p className="text-xs text-gray-500">
                      {shipping.returnPeriod}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span>✓</span>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Free Shipping
                    </p>

                    <p className="text-xs text-gray-500">
                      Available on this product
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Tags</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default PostCardDetails
