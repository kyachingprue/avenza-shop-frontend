export function addProductToCart({ user, addItem, navigate, location, product, quantity = 1, variant }) {
  const variantLabel = variant
    ? [variant.color, variant.storage, variant.size, variant.option].filter(Boolean).join(' / ')
    : ''
  const item = {
    productId: product.id,
    variantId: variant?.id || '',
    quantity,
    stock: variant?.stock ?? product.stock,
    price: variant?.price ?? product.price,
    name: product.name,
    brand: product.brand,
    thumbnail: product.thumbnail,
    variantLabel,
  }

  if (!user) {
    navigate('/login', {
      state: {
        from: `${location.pathname}${location.search}`,
        pendingCartItem: item,
      },
    })
    return false
  }

  addItem(item)
  return true
}
