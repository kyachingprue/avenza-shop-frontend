import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { useSearchParams } from 'react-router'
import { getCatalogProducts } from '../../lib/catalog'
import { fallbackProducts } from '../../data/catalog-fallbacks'

const PRODUCTS_PER_PAGE = 12

const getPrice = product => {
  const price = Number(product.price)
  return Number.isFinite(price) ? price : 0
}

const getRating = product => Number(
  product.reviewsSummary?.averageRating ?? product.rating ?? 0,
)

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showingSamples, setShowingSamples] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const category = searchParams.get('category') || ''
  const catalogCategories = useMemo(() => {
    const counts = new Map()
    products.forEach(product => {
      const name = product.category?.trim()
      if (name) counts.set(name, (counts.get(name) || 0) + 1)
    })
    return [...counts.entries()].sort(([first], [second]) => first.localeCompare(second))
  }, [products])

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const minimum = minPrice === '' ? null : Number(minPrice)
    const maximum = maxPrice === '' ? null : Number(maxPrice)

    const result = products.filter(product => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.description,
      ].filter(Boolean).join(' ').toLowerCase()
      const matchesSearch = !query || searchableText.includes(query)
      const matchesCategory = !category
        || product.category?.toLowerCase() === category.toLowerCase()
      const price = getPrice(product)
      const matchesMinimum = minimum === null || price >= minimum
      const matchesMaximum = maximum === null || price <= maximum
      const matchesStock = !inStockOnly || Number(product.stock) > 0
      const matchesSale = !onSaleOnly
        || Number(product.discount) > 0
        || Number(product.oldPrice) > price
      const matchesNew = !newArrivalsOnly || product.isNew === true

      return matchesSearch
        && matchesCategory
        && matchesMinimum
        && matchesMaximum
        && matchesStock
        && matchesSale
        && matchesNew
    })

    return result.sort((first, second) => {
      switch (sortBy) {
        case 'price-ascending':
          return getPrice(first) - getPrice(second)
        case 'price-descending':
          return getPrice(second) - getPrice(first)
        case 'rating':
          return getRating(second) - getRating(first)
        case 'name':
          return first.name.localeCompare(second.name)
        case 'newest':
          return Number(second.isNew === true) - Number(first.isNew === true)
        default:
          return 0
      }
    })
  }, [
    products,
    searchQuery,
    category,
    minPrice,
    maxPrice,
    inStockOnly,
    onSaleOnly,
    newArrivalsOnly,
    sortBy,
  ])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  )

  useEffect(() => {
    let active = true
    getCatalogProducts()
      .then(data => {
        if (active) {
          setProducts(data.length ? data : fallbackProducts)
          setShowingSamples(data.length === 0)
        }
      })
      .catch(requestError => {
        if (active) {
          console.error('Unable to load the product catalog; showing sample products:', requestError)
          setProducts(fallbackProducts)
          setShowingSamples(true)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const selectCategory = nextCategory => {
    setCurrentPage(1)
    const nextParams = new URLSearchParams(searchParams)
    if (nextCategory) nextParams.set('category', nextCategory)
    else nextParams.delete('category')
    setSearchParams(nextParams, { replace: true })
  }

  const resetFilters = () => {
    setSearchQuery('')
    setMinPrice('')
    setMaxPrice('')
    setInStockOnly(false)
    setOnSaleOnly(false)
    setNewArrivalsOnly(false)
    setSortBy('featured')
    setCurrentPage(1)
    setSearchParams({}, { replace: true })
  }

  const hasActiveFilters = Boolean(
    category || searchQuery || minPrice || maxPrice
    || inStockOnly || onSaleOnly || newArrivalsOnly,
  )

  return (
    <main className="min-h-screen bg-[#faf9f6] pb-20">
      <section className="bg-[#315746] px-5 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d5b080]">
            The Avenza collection
          </p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                Find something <em className="text-[#e1bd8f]">wonderful.</em>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                Explore thoughtful picks across the collection. Search, refine, and find the right fit.
              </p>
            </div>
            <div className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              {loading ? 'Loading the collection…' : `${filteredProducts.length} products`}
            </div>
          </div>
        </div>
      </section>

      {showingSamples && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 text-sm leading-6 text-cyan-950">
            You’re viewing sample products. Live inventory will appear here when the catalog is available. Sample items are for preview only.
          </p>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            aria-expanded={showMobileFilters}
            onClick={() => setShowMobileFilters(open => !open)}
            className="inline-flex min-h-11 items-center gap-2 border border-[#dcded5] bg-white px-4 text-sm font-semibold text-[#315746]"
          >
            {showMobileFilters ? 'Hide filters' : 'Show filters'}
            {hasActiveFilters && <span className="rounded-full bg-[#315746] px-2 py-0.5 text-xs text-white">On</span>}
          </button>
          <label className="flex items-center gap-2 text-sm text-[#74786e]">
            Sort
            <select
              value={sortBy}
              onChange={event => {
                setCurrentPage(1)
                setSortBy(event.target.value)
              }}
              className="min-h-11 border border-[#dcded5] bg-white px-3 text-sm text-[#35453a]"
            >
              <option value="featured">Featured</option>
              <option value="price-ascending">Price: low to high</option>
              <option value="price-descending">Price: high to low</option>
              <option value="rating">Top rated</option>
              <option value="newest">New arrivals</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-5">
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="space-y-7 rounded-md border border-[#e8e6de] bg-white p-5 lg:sticky lg:top-28">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-[#314238]">Refine your search</h2>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs px-3 text-[#718271] underline decoration-[#bdc8b7] underline-offset-4 hover:text-[#315746]"
                >
                  Reset
                </button>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#7b8075]">Search</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={event => {
                    setCurrentPage(1)
                    setSearchQuery(event.target.value)
                  }}
                  placeholder="Name, brand, or keyword"
                  className="min-h-11 w-full border border-[#e4e3db] bg-[#faf9f6] px-3 text-sm text-[#35453a] placeholder:text-[#a3a59a] focus:border-[#718b75] focus:outline-none"
                />
              </label>

              <fieldset>
                <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#7b8075]">Category</legend>
                <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
                  <button
                    type="button"
                    aria-pressed={!category}
                    onClick={() => selectCategory('')}
                    className={`flex min-h-10 w-full items-center justify-between gap-2 px-2 text-left text-sm transition ${
                      !category ? 'bg-[#edf0e9] font-semibold text-[#315746]' : 'text-[#666d62] hover:bg-[#f6f5f0]'
                    }`}
                  >
                    <span>All categories</span>
                    <span className="text-xs text-[#8b9085]">{products.length}</span>
                  </button>
                  {catalogCategories.map(([name, count]) => (
                    <button
                      type="button"
                      key={name}
                      aria-pressed={category.toLowerCase() === name.toLowerCase()}
                      onClick={() => selectCategory(category.toLowerCase() === name.toLowerCase() ? '' : name)}
                      className={`flex min-h-10 w-full items-center justify-between gap-2 px-2 text-left text-sm transition ${
                        category.toLowerCase() === name.toLowerCase()
                          ? 'bg-[#edf0e9] font-semibold text-[#315746]'
                          : 'text-[#666d62] hover:bg-[#f6f5f0]'
                      }`}
                    >
                      <span className="truncate">{name}</span>
                      <span className="text-xs text-[#8b9085]">{count}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#7b8075]">Price range</legend>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs text-[#8b9085]">
                    Min
                    <span className="mt-1 flex min-h-11 items-center border border-[#e4e3db] bg-[#faf9f6] px-2 text-sm text-[#526052]">
                      $
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={minPrice}
                        onChange={event => {
                          setCurrentPage(1)
                          setMinPrice(event.target.value)
                        }}
                        placeholder="0"
                        aria-label="Minimum price"
                        className="min-w-0 w-full border-0 bg-transparent px-1 outline-none"
                      />
                    </span>
                  </label>
                  <label className="text-xs text-[#8b9085]">
                    Max
                    <span className="mt-1 flex min-h-11 items-center border border-[#e4e3db] bg-[#faf9f6] px-2 text-sm text-[#526052]">
                      $
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={maxPrice}
                        onChange={event => {
                          setCurrentPage(1)
                          setMaxPrice(event.target.value)
                        }}
                        placeholder="Any"
                        aria-label="Maximum price"
                        className="min-w-0 w-full border-0 bg-transparent px-1 outline-none"
                      />
                    </span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#7b8075]">Availability & style</legend>
                {[
                  ['in-stock', 'In stock', inStockOnly, setInStockOnly],
                  ['on-sale', 'On sale', onSaleOnly, setOnSaleOnly],
                  ['new-arrivals', 'New arrivals', newArrivalsOnly, setNewArrivalsOnly],
                ].map(([id, label, checked, setChecked]) => (
                  <label key={id} className="flex cursor-pointer items-center gap-3 text-sm text-[#596257]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={event => {
                        setCurrentPage(1)
                        setChecked(event.target.checked)
                      }}
                      className="h-4 w-4 accent-[#315746]"
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
            </div>
          </aside>

          <section aria-label="Product results" className="min-w-0">
            <div className="mb-5 hidden items-center justify-between border-b border-[#e8e6de] pb-4 lg:flex">
              <p className="text-sm text-[#777d72]" aria-live="polite">
                Showing <strong className="text-[#35453a]">{filteredProducts.length}</strong>
                {category && <> in <strong className="text-[#35453a]">{category}</strong></>}
              </p>
              <label className="flex items-center gap-3 text-sm text-[#777d72]">
                Sort by
                <select
                  value={sortBy}
                  onChange={event => {
                    setCurrentPage(1)
                    setSortBy(event.target.value)
                  }}
                  className="min-h-10 border border-[#dcded5] bg-white px-3 text-sm text-[#35453a]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-ascending">Price: low to high</option>
                  <option value="price-descending">Price: high to low</option>
                  <option value="rating">Top rated</option>
                  <option value="newest">New arrivals</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </label>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: PRODUCTS_PER_PAGE }, (_, index) => (
                  <div key={index} role="status" aria-label="Loading product" className="h-90 animate-pulse border border-[#e8e6de] bg-white">
                    <div className="h-52 bg-[#eeede7]" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-1/3 bg-[#eeede7]" />
                      <div className="h-4 w-3/4 bg-[#eeede7]" />
                      <div className="h-8 w-1/3 bg-[#eeede7]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} isSample={showingSamples} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <nav aria-label="Product pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(page => page - 1)}
                      className="min-h-10 border border-[#dcded5] bg-white px-4 text-sm text-[#526052] hover:bg-[#edf0e9] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1)
                      .filter(page => totalPages <= 5 || Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages)
                      .map((page, index, pages) => (
                        <span key={page} className="contents">
                          {index > 0 && page - pages[index - 1] > 1 && (
                            <span className="px-1 text-[#8b9085]" aria-hidden="true">…</span>
                          )}
                          <button
                            type="button"
                            aria-current={currentPage === page ? 'page' : undefined}
                            onClick={() => setCurrentPage(page)}
                            className={`h-10 min-w-10 border px-3 text-sm font-semibold ${
                              currentPage === page
                                ? 'border-[#315746] bg-[#315746] text-white'
                                : 'border-[#dcded5] bg-white text-[#526052] hover:bg-[#edf0e9]'
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      ))}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(page => page + 1)}
                      className="min-h-10 border border-[#dcded5] bg-white px-4 text-sm text-[#526052] hover:bg-[#edf0e9] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="border border-[#e8e6de] bg-white px-6 py-16 text-center">
                <p className="font-serif text-2xl text-[#314238]">No products match those filters</p>
                <p className="mt-2 text-sm text-[#81847b]">Try widening your price range or resetting your filters.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 min-h-11 bg-[#315746] px-5 text-sm font-semibold text-white transition hover:bg-[#254637]"
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default AllProducts
