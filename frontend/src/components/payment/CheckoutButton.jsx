import { useState } from 'react'
import { FaLock } from 'react-icons/fa6'
import { createCheckoutSession } from '../../lib/checkout'

const CheckoutButton = ({
  items,
  disabled = false,
  className = '',
  label = 'Buy securely with Stripe',
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      await createCheckoutSession(items)
    } catch (checkoutError) {
      setError(checkoutError.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-w-0 flex-1">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || loading || !items?.length}
        className={className}
      >
        <FaLock />
        {loading ? 'Connecting to Stripe...' : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  )
}

export default CheckoutButton
