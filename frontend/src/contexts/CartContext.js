import { createContext, useContext } from 'react'

export const CartContext = createContext(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

const cartKey = userId => `avenza-cart-${userId}`

export function readCart(userId) {
  try {
    const value = JSON.parse(localStorage.getItem(cartKey(userId)) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function saveCartItemForUser(userId, item) {
  const cart = readCart(userId)
  const existing = cart.find(entry =>
    entry.productId === item.productId && entry.variantId === item.variantId,
  )
  if (existing) {
    existing.quantity = Math.min(item.stock, 10, existing.quantity + item.quantity)
  } else {
    cart.push(item)
  }
  localStorage.setItem(cartKey(userId), JSON.stringify(cart))
}

export function writeCart(userId, cart) {
  localStorage.setItem(cartKey(userId), JSON.stringify(cart))
}
