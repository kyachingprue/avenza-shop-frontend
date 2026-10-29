import { useEffect, useState } from 'react'
import { FaBriefcase, FaCircleCheck, FaClock } from 'react-icons/fa6'
import { authenticatedRequest } from '../contexts/AuthContext'

const SellerRequestPage = () => {
  const [sellerRequest, setSellerRequest] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    authenticatedRequest('/api/users/seller-requests/me', { signal: controller.signal })
      .then(result => setSellerRequest(result.sellerRequest))
      .catch(requestError => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const submitRequest = async event => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await authenticatedRequest('/api/users/seller-requests', {
        method: 'POST',
        body: JSON.stringify({ message }),
      })
      setSellerRequest(result.sellerRequest)
      setMessage('')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Seller program</p>
      <h1 className="mt-2 text-3xl font-black text-gray-950">Request seller access</h1>
      <p className="mt-2 text-sm leading-6 text-gray-500">Tell our administrators about your store and the products you plan to offer.</p>
      {error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
      {loading ? <p className="mt-6 text-sm text-slate-500">Checking request status...</p> : sellerRequest ? (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3">
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${sellerRequest.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : sellerRequest.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
              {sellerRequest.status === 'APPROVED' ? <FaCircleCheck /> : sellerRequest.status === 'PENDING' ? <FaClock /> : <FaBriefcase />}
            </span>
            <div>
              <p className="font-bold text-slate-900">Request {sellerRequest.status.toLowerCase()}</p>
              <p className="text-xs text-slate-500">Submitted {new Date(sellerRequest.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          {sellerRequest.message && <p className="mt-4 text-sm leading-6 text-slate-700">{sellerRequest.message}</p>}
          {sellerRequest.status === 'REJECTED' && (
            <button type="button" onClick={() => setSellerRequest(null)} className="mt-5 rounded-xl bg-cyan-800 px-4 py-2.5 text-sm font-bold text-white">Submit a new request</button>
          )}
        </section>
      ) : (
        <form onSubmit={submitRequest} className="mt-6 space-y-4 rounded-2xl border border-slate-200 p-6">
          <label className="block text-sm font-bold text-slate-800" htmlFor="seller-request-message">About your store and products</label>
          <textarea id="seller-request-message" value={message} onChange={event => setMessage(event.target.value)} minLength={20} maxLength={1000} rows={6} required placeholder="Share your store name, product categories, and seller experience..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" />
          <p className="text-xs text-slate-500">At least 20 characters. An administrator will review your request.</p>
          <button type="submit" disabled={busy} className="rounded-xl bg-cyan-800 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{busy ? 'Submitting...' : 'Submit seller request'}</button>
        </form>
      )}
    </div>
  )
}

export default SellerRequestPage
