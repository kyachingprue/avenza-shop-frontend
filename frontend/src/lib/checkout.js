import { API_BASE_URL } from './api-base'

async function requestCheckout(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error?.message || 'Unable to verify checkout. Please try again.')
  }
  return data
}

export async function createCheckoutSession(items) {
  const data = await requestCheckout('/api/checkout/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map(({ productId, variantId, quantity }) => ({
        productId,
        quantity,
        ...(variantId ? { variantId } : {}),
      })),
    }),
  })

  const checkoutUrl = new URL(data.url)
  if (checkoutUrl.protocol !== 'https:' || checkoutUrl.hostname !== 'checkout.stripe.com') {
    throw new Error('Stripe returned an invalid checkout address.')
  }
  window.location.assign(checkoutUrl.href)
}

export function getCheckoutSession(sessionId, options) {
  return requestCheckout(
    `/api/checkout/sessions/${encodeURIComponent(sessionId)}`,
    options,
  )
}
