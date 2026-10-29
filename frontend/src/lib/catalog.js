const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  || `${window.location.protocol}//${window.location.hostname}:4000`

const CATALOG_CACHE_DURATION = 60_000
let catalogCache
let catalogCacheExpiresAt = 0
let catalogRequest

async function requestCatalog(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error?.message || 'Unable to load the product catalog.')
  }
  return data
}

export async function getCatalogProducts(options) {
  if (!options && catalogCache && Date.now() < catalogCacheExpiresAt) {
    return catalogCache
  }

  if (!options && catalogRequest) {
    return catalogRequest
  }

  const request = requestCatalog('/api/catalog/products', options).then(data => {
    if (!options) {
      catalogCache = data.products
      catalogCacheExpiresAt = Date.now() + CATALOG_CACHE_DURATION
    }
    return data.products
  })

  if (!options) {
    catalogRequest = request
    return request.finally(() => {
      if (catalogRequest === request) catalogRequest = undefined
    })
  }

  return request
}

export async function getCatalogProduct(id, options) {
  const data = await requestCatalog(`/api/catalog/products/${encodeURIComponent(id)}`, options)
  return data.product
}

export async function getCatalogPosts(options) {
  const data = await requestCatalog('/api/catalog/posts', options)
  return data.posts
}

export async function getCatalogPost(id, options) {
  const data = await requestCatalog(`/api/catalog/posts/${encodeURIComponent(id)}`, options)
  return data.post
}
