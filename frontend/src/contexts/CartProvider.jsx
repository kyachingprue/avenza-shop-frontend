import { useCallback, useMemo, useState } from 'react'
import { CartContext, readCart, writeCart } from './CartContext'
import { useAuth } from './AuthContext'

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [cartState, setCartState] = useState({ ownerId: null, items: [] })
  const userId = isAuthenticated ? user.id : null
  const items = useMemo(
    () => !userId
      ? []
      : cartState.ownerId === userId
        ? cartState.items
        : readCart(userId),
    [userId, cartState],
  )
  const updateCart = useCallback(updater => {
    if (!userId) return
    const current = cartState.ownerId === userId ? cartState.items : readCart(userId)
    const updated = updater(current)
    writeCart(userId, updated)
    setCartState({ ownerId: userId, items: updated })
  }, [userId, cartState])
  const addItem = useCallback(item => {
    updateCart(current => {
      const existing = current.find(entry =>
        entry.productId === item.productId && entry.variantId === item.variantId,
      )
      if (existing) {
        return current.map(entry => entry === existing
          ? { ...entry, quantity: Math.min(item.stock, 10, entry.quantity + item.quantity) }
          : entry)
      }
      return [...current, item]
    })
  }, [updateCart])
  const updateQuantity = useCallback((productId, variantId, quantity) => {
    updateCart(current => current.map(item =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity: Math.min(item.stock, 10, Math.max(1, quantity)) }
        : item))
  }, [updateCart])
  const removeItem = useCallback((productId, variantId) => {
    updateCart(current => current.filter(item =>
      item.productId !== productId || item.variantId !== variantId,
    ))
  }, [updateCart])
  const clear = useCallback(() => updateCart(() => []), [updateCart])
  const value = useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    addItem,
    updateQuantity,
    removeItem,
    clear,
  }), [items, addItem, updateQuantity, removeItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
