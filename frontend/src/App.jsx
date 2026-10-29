import { useEffect, useMemo, useState } from 'react'
import {
  FaArrowRight,
  FaBagShopping,
  FaBolt,
  FaCheck,
  FaChevronDown,
  FaHeart,
  FaMagnifyingGlass,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShieldHalved,
  FaStar,
  FaTrashCan,
  FaTruckFast,
  FaXmark,
} from 'react-icons/fa6'
import './App.css'
import { getCatalogProducts } from './lib/catalog'

const CART_STORAGE_KEY = 'avenza-cart'
const WISHLIST_STORAGE_KEY = 'avenza-wishlist'
const fallbackImages = {
  smartphones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  'smart watches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  fashion: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  gaming: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80',
  'home appliances': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
  television: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
  tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
  drones: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80',
  default: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
}
const handleImageError = (event, category) => {
  const image = event.currentTarget
  if (image.dataset.fallbackApplied) {
    image.hidden = true
    return
  }
  image.dataset.fallbackApplied = 'true'
  image.src = fallbackImages[String(category || '').toLowerCase()] || fallbackImages.default
}
const formatPrice = amount =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)

const readStoredValue = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

function ProductCard({ product, onAdd, onQuickView, isSaved, onToggleSave }) {
  const image = product.thumbnail || product.images?.[0]

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          className="product-image-button"
          onClick={() => onQuickView(product)}
          aria-label={`View ${product.name} details`}
        >
          <img src={image} alt={product.name} loading="lazy" onError={event => handleImageError(event, product.category)} />
        </button>
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
        {product.isNew && <span className="new-badge">Just in</span>}
        <button
          className={`save-button ${isSaved ? 'is-saved' : ''}`}
          onClick={() => onToggleSave(product.id)}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button
          className="quick-view-button"
          onClick={() => onQuickView(product)}
        >
          Quick view <FaArrowRight />
        </button>
      </div>
      <div className="product-info">
        <div className="product-brand-row">
          <span className="product-brand">{product.brand}</span>
          <span className="product-rating">
            <FaStar /> {Number(product.rating || 0).toFixed(1)}
          </span>
        </div>
        <button
          className="product-name"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </button>
        <div className="product-bottom">
          <div className="price-stack">
            <span className="product-price">{formatPrice(product.price)}</span>
            {product.oldPrice > product.price && (
              <del>{formatPrice(product.oldPrice)}</del>
            )}
          </div>
          <button
            className="add-button"
            onClick={() => onAdd(product)}
            disabled={product.stock === 0}
            aria-label={`Add ${product.name} to cart`}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </article>
  )
}

function CartDrawer({ cart, onClose, onQuantityChange, onRemove, onCheckout }) {
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  )
  const freeShippingThreshold = 100
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="overlay cart-overlay" onMouseDown={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">YOUR BAG</p>
            <h2 id="cart-title">Shopping cart</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart">
            <FaXmark />
          </button>
        </div>
        {cart.length > 0 ? (
          <>
            <div className="shipping-progress">
              <div className="shipping-copy">
                <FaTruckFast />
                {amountUntilFreeShipping > 0 ? (
                  <span>
                    Add <strong>{formatPrice(amountUntilFreeShipping)}</strong>{' '}
                    for free shipping
                  </span>
                ) : (
                  <span>You’ve unlocked free shipping!</span>
                )}
              </div>
              <div className="progress-track">
                <span
                  style={{
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.thumbnail || item.images?.[0]} alt="" onError={event => handleImageError(event, item.category)} />
                  <div className="cart-item-info">
                    <span className="product-brand">{item.brand}</span>
                    <h3>{item.name}</h3>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <FaTrashCan /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button
                className="checkout-button"
                onClick={onCheckout}
              >
                Continue to checkout <FaArrowRight />
              </button>
              <button className="continue-shopping" onClick={onClose}>
                Continue shopping
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon"><FaBagShopping /></div>
            <h3>Your bag is taking a little break</h3>
            <p>Find something you love and it’ll show up here.</p>
            <button className="checkout-button" onClick={onClose}>
              Explore the collection <FaArrowRight />
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

function QuickView({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1)
  const image = product.thumbnail || product.images?.[0]

  return (
    <div className="overlay" onMouseDown={onClose}>
      <section
        className="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close details">
          <FaXmark />
        </button>
        <div className="quick-view-image">
          <img src={image} alt={product.name} onError={event => handleImageError(event, product.category)} />
        </div>
        <div className="quick-view-content">
          <span className="eyebrow">{product.brand} · {product.category}</span>
          <h2 id="quick-view-title">{product.name}</h2>
          <div className="quick-rating"><FaStar /> {Number(product.rating || 0).toFixed(1)} <span>·</span> {product.reviews?.length || 0} reviews</div>
          <div className="quick-price">{formatPrice(product.price)} {product.oldPrice > product.price && <del>{formatPrice(product.oldPrice)}</del>}</div>
          <p className="quick-description">{product.description || 'Thoughtfully designed, beautifully made, and ready to make every day a little better.'}</p>
          <div className="stock-status"><span /> {product.stock > 0 ? 'In stock and ready to ship' : 'Currently out of stock'}</div>
          <div className="quick-buy-row">
            <div className="quantity-control">
              <button onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity"><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(value => value + 1)} aria-label="Increase quantity"><FaPlus /></button>
            </div>
            <button
              className="checkout-button"
              disabled={product.stock === 0}
              onClick={() => {
                onAdd(product, quantity)
                onClose()
              }}
            >
              Add to bag · {formatPrice(product.price * quantity)}
            </button>
          </div>
          <div className="modal-perks"><span><FaTruckFast /> Free shipping over $100</span><span><FaShieldHalved /> Secure checkout</span></div>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [cart, setCart] = useState(() => readStoredValue(CART_STORAGE_KEY, []))
  const [wishlist, setWishlist] = useState(() => readStoredValue(WISHLIST_STORAGE_KEY, []))
  const [cartOpen, setCartOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [toast, setToast] = useState('')
  const [toastVersion, setToastVersion] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    let active = true
    const loadProducts = async () => {
      try {
        const data = await getCatalogProducts()
        if (!Array.isArray(data)) throw new Error('The product catalog has an invalid format.')
        if (active) setProducts(data)
      } catch (error) {
        if (active) setLoadError(error instanceof Error ? error.message : 'Unable to load the product catalog.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()
    return () => { active = false }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast, toastVersion])

  const categories = useMemo(
    () => ['All', ...new Set(products.map(product => product.category).filter(Boolean))],
    [products],
  )
  const visibleProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const searchText = `${product.name} ${product.brand} ${product.category}`.toLowerCase()
      return matchesCategory && searchText.includes(query.trim().toLowerCase())
    })
    if (sortBy === 'price-low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return [...filtered].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') return [...filtered].sort((a, b) => b.rating - a.rating)
    return filtered
  }, [products, query, selectedCategory, sortBy])
  const featuredProduct = products.find(product => product.category === 'Headphones') || products[0]
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const notify = message => {
    setToast(message)
    setToastVersion(version => version + 1)
  }

  const handleCheckout = () => {
    setCartOpen(false)
    notify('Checkout is ready to connect to your secure payment provider.')
  }

  const addToCart = (product, quantity = 1) => {
    if (product.stock === 0) {
      notify('This item is currently out of stock.')
      return
    }
    setCart(current => {
      const existing = current.find(item => item.id === product.id)
      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item,
        )
      }
      return [...current, { ...product, quantity: Math.min(quantity, product.stock || 99) }]
    })
    notify(`${product.name} added to your bag`)
  }

  const changeQuantity = (productId, quantity) => {
    if (quantity < 1) {
      setCart(current => current.filter(item => item.id !== productId))
      return
    }
    const product = products.find(item => item.id === productId)
    const maxQuantity = product?.stock || 99
    setCart(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity: Math.min(quantity, maxQuantity) } : item,
      ),
    )
  }

  const toggleWishlist = productId => {
    const alreadySaved = wishlist.includes(productId)
    setWishlist(current =>
      alreadySaved ? current.filter(id => id !== productId) : [...current, productId],
    )
    notify(alreadySaved ? 'Removed from your wishlist' : 'Saved to your wishlist')
  }

  const jumpToProducts = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="storefront">
      <div className="announcement-bar">
        <span><FaBolt /> A little something for your everyday</span>
        <span>Complimentary shipping on orders over $100</span>
        <a href="#shop">Discover the edit <FaArrowRight /></a>
      </div>
      <header className="site-header">
        <a className="brand-lockup" href="#" aria-label="Avenza home">
          <span className="brand-mark">a.</span>
          <span className="brand-name">avenza<span>goods for good days</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="nav-active" href="#shop">Shop</a>
          <a href="#shop" onClick={() => setSelectedCategory('Headphones')}>Tech & audio</a>
          <a href="#story">Our story</a>
        </nav>
        <div className="header-actions">
          <label className="header-search">
            <FaMagnifyingGlass />
            <input
              type="search"
              placeholder="Find your favorite..."
              value={query}
              onChange={event => {
                setQuery(event.target.value)
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              aria-label="Search products"
            />
            {query && <button onClick={() => setQuery('')} aria-label="Clear search"><FaXmark /></button>}
          </label>
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}>
            <FaBagShopping />
            <span>Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-kicker"><span /> THE EVERYDAY EDIT — NO. 04</span>
            <h1>Good things.<br /><em>Better days.</em></h1>
            <p>Thoughtful finds for the way you live, work, and unwind. Less scrolling, more loving what you bring home.</p>
            <div className="hero-cta-row">
              <button className="hero-cta" onClick={jumpToProducts}>Find your new favorite <FaArrowRight /></button>
              <span className="hero-note">Curated with care, always.</span>
            </div>
            <div className="hero-social-proof">
              <div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div>
              <span><strong>12k+</strong> happy everyday people</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              {featuredProduct && <img src={featuredProduct.thumbnail || featuredProduct.images?.[0]} alt={featuredProduct.name} onError={event => handleImageError(event, featuredProduct.category)} />}
              <div className="hero-image-wash" />
            </div>
            <div className="hero-floating-note"><span className="note-star"><FaStar /></span><span>Small finds,<br /><strong>big joy.</strong></span></div>
            <div className="hero-product-tag">
              <span>THE ONE EVERYONE LOVES</span>
              <strong>{featuredProduct?.name || 'Thoughtful everyday essentials'}</strong>
              <span>{featuredProduct ? formatPrice(featuredProduct.price) : 'Made for your everyday'} <FaArrowRight /></span>
            </div>
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          </div>
          <div className="hero-side-label">MADE FOR THE MOMENTS IN BETWEEN</div>
        </section>

        <section className="perks-strip" aria-label="Shopping benefits">
          <div><FaTruckFast /><span><strong>Easy on shipping</strong><small>Free over $100</small></span></div>
          <span className="perk-divider" />
          <div><FaShieldHalved /><span><strong>Thoughtfully picked</strong><small>Quality over everything</small></span></div>
          <span className="perk-divider" />
          <div><FaCheck /><span><strong>Here for you</strong><small>Real humans, real help</small></span></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><span className="eyebrow">A GOOD PLACE TO START</span><h2>Meet your next <em>favorite.</em></h2></div>
            <p>Useful, lovely, and a little unexpected.<br />The good stuff, all in one place.</p>
          </div>
          <div className="shop-controls">
            <div className="category-pills" aria-label="Filter by category">
              {categories.map(category => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'category-pill active' : 'category-pill'}
                  onClick={() => setSelectedCategory(category)}
                >{category}</button>
              ))}
            </div>
            <label className="sort-control"><span>Sort by</span><select value={sortBy} onChange={event => setSortBy(event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><FaChevronDown /></label>
          </div>
          {loading ? (
            <div className="product-grid">
              {Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index}><span /><div /><div /></div>)}
            </div>
          ) : loadError ? (
            <div className="catalog-state"><h3>We couldn’t load the collection.</h3><p>{loadError}</p><button className="text-button" onClick={() => window.location.reload()}>Try again <FaArrowRight /></button></div>
          ) : visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onQuickView={setQuickView}
                  isSaved={wishlist.includes(product.id)}
                  onToggleSave={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="catalog-state"><h3>No finds just yet.</h3><p>Try another search or choose a different category.</p><button className="text-button" onClick={() => { setQuery(''); setSelectedCategory('All') }}>Show me everything <FaArrowRight /></button></div>
          )}
          {!loading && !loadError && <p className="results-note">Showing {visibleProducts.length} of {products.length} thoughtfully chosen finds</p>}
        </section>

        <section className="story-banner" id="story">
          <div className="story-mark">a.</div>
          <div className="story-copy"><span className="eyebrow">A LITTLE MORE INTENTION, PLEASE</span><h2>Buy less.<br /><em>Love it longer.</em></h2><p>We believe the best things earn their spot in your everyday. That’s why every find here is picked for how it works, how it feels, and how long you’ll love it.</p><a href="#shop">A little more about us <FaArrowRight /></a></div>
          <div className="story-stamp"><span>GOOD THINGS<br />FOR GOOD DAYS</span><strong>100%</strong><span>GOOD-ENERGY<br />GUARANTEE</span></div>
        </section>

        <section className="newsletter">
          <div><span className="eyebrow">NOTES FROM THE GOOD SIDE</span><h2>Good things, <em>in your inbox.</em></h2><p>New finds, little joys, and a first look at what’s next. Never the noisy stuff.</p></div>
          {subscribed ? <div className="subscribe-success"><FaCheck /><span>You’re on the list. We’ll be in touch soon.</span></div> : <form className="newsletter-form" onSubmit={event => { event.preventDefault(); if (email.includes('@')) setSubscribed(true) }}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={event => setEmail(event.target.value)} required /><button type="submit">Count me in <FaArrowRight /></button></form>}
        </section>
      </main>

      <footer className="site-footer"><a className="brand-lockup" href="#"><span className="brand-mark">a.</span><span className="brand-name">avenza<span>goods for good days</span></span></a><span>Made for the moments in between.</span><span>© 2025 Avenza. A little more intentional.</span></footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onQuantityChange={changeQuantity}
          onRemove={productId => setCart(current => current.filter(item => item.id !== productId))}
          onCheckout={handleCheckout}
        />
      )}
      {quickView && <QuickView key={quickView.id} product={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} />}
      {toast && <div className="toast-message" role="status"><FaCheck /> {toast}</div>}
    </div>
  )
}

export default App
