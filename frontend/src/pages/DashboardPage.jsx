import { useEffect, useState } from 'react'
import { FaBoxOpen, FaChartLine, FaCircleCheck, FaUsers } from 'react-icons/fa6'
import { useSearchParams } from 'react-router'
import { authenticatedRequest, useAuth } from '../contexts/AuthContext'

const cardClass = 'rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-cyan-50/60 p-5 shadow-sm'

const DashboardPage = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || 'overview'
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '' })

  useEffect(() => {
    if (!['SELLER', 'ADMIN'].includes(user.role)) return undefined
    const controller = new AbortController()
    const path = user.role === 'ADMIN' && view === 'users'
      ? '/api/admin/users'
      : user.role === 'ADMIN' && view === 'seller-requests'
        ? '/api/admin/seller-requests'
      : '/api/seller/products'
    authenticatedRequest(path, { signal: controller.signal })
      .then(setData)
      .catch(requestError => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [user.role, view])

  const createSellerProduct = async event => {
    event.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await authenticatedRequest('/api/seller/products', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          ...(form.imageUrl ? {} : { imageUrl: undefined }),
        }),
      })
      setForm({ name: '', description: '', price: '', imageUrl: '' })
      setNotice('Product added to your seller catalog.')
      const result = await authenticatedRequest('/api/seller/products')
      setData(result)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  const updateRole = async (id, role) => {
    setError('')
    try {
      await authenticatedRequest(`/api/admin/users/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      })
      const result = await authenticatedRequest('/api/admin/users')
      setData(result)
      setNotice('User role updated.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const reviewSellerRequest = async (id, status) => {
    setError('')
    try {
      await authenticatedRequest(`/api/admin/seller-requests/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      const result = await authenticatedRequest('/api/admin/seller-requests')
      setData(result)
      setNotice(status === 'APPROVED' ? 'Seller request approved and seller access enabled.' : 'Seller request rejected.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (view === 'users' && user.role === 'ADMIN') {
    return (
      <>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Administration</p>
        <h1 className="mt-2 text-3xl font-black text-gray-950">User management</h1>
        <p className="mt-2 text-sm text-gray-500">Review verified accounts and manage access roles.</p>
        {error && <p className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
        {notice && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">{notice}</p>}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full min-w-155 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-4 py-3">Account</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Access</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {(data?.users || []).map(account => (
                <tr key={account.id}>
                  <td className="px-4 py-4"><p className="font-bold text-gray-900">{account.name}</p><p className="text-xs text-gray-500">{account.email}</p></td>
                  <td className="px-4 py-4">{account.emailVerified ? 'Verified' : 'Pending'}</td>
                  <td className="px-4 py-4"><span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">{account.role}</span></td>
                  <td className="px-4 py-4"><select aria-label={`Set role for ${account.name}`} value={account.role} onChange={event => updateRole(account.id, event.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2"><option value="USER">User</option><option value="SELLER">Seller</option><option value="ADMIN">Admin</option></select></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data && <p className="p-6 text-sm text-gray-500">Loading accounts...</p>}
        </div>
      </>
    )
  }

  if (view === 'seller-requests' && user.role === 'ADMIN') {
    return (
      <>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Administration</p>
        <h1 className="mt-2 text-3xl font-black text-gray-950">Seller requests</h1>
        <p className="mt-2 text-sm text-gray-500">Review applications. Approval changes the account role to seller.</p>
        {error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
        {notice && <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">{notice}</p>}
        <div className="mt-6 space-y-4">
          {(data?.sellerRequests || []).map(application => (
            <article key={application.id} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">{application.user.name}</h2>
                  <p className="text-sm text-slate-500">{application.user.email}</p>
                  <p className="mt-1 text-xs text-slate-400">Submitted {new Date(application.createdAt).toLocaleString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${application.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : application.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {application.status}
                </span>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{application.message}</p>
              {application.status === 'PENDING' && (
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => reviewSellerRequest(application.id, 'APPROVED')} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800">Approve seller</button>
                  <button type="button" onClick={() => reviewSellerRequest(application.id, 'REJECTED')} className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-50">Reject</button>
                </div>
              )}
            </article>
          ))}
          {!data && <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">Loading seller requests...</p>}
          {data && !data.sellerRequests?.length && <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">No seller requests have been submitted.</p>}
        </div>
      </>
    )
  }

  if (view === 'products' && ['SELLER', 'ADMIN'].includes(user.role)) {
    const products = data?.products || []
    return (
      <>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{user.role === 'ADMIN' ? 'Store catalog' : 'Seller center'}</p>
        <h1 className="mt-2 text-3xl font-black text-gray-950">{user.role === 'ADMIN' ? 'All products' : 'My products'}</h1>
        {user.role === 'SELLER' && (
          <form onSubmit={createSellerProduct} className="mt-6 grid gap-3 rounded-2xl bg-gray-50 p-5 md:grid-cols-2">
            <input aria-label="Product name" placeholder="Product name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required maxLength={160} className="rounded-xl border border-gray-200 px-4 py-3" />
            <input aria-label="Price" type="number" min="0.01" step="0.01" placeholder="Price (USD)" value={form.price} onChange={event => setForm({ ...form, price: event.target.value })} required className="rounded-xl border border-gray-200 px-4 py-3" />
            <input aria-label="Image URL" type="url" placeholder="Image URL (optional)" value={form.imageUrl} onChange={event => setForm({ ...form, imageUrl: event.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 md:col-span-2" />
            <textarea aria-label="Product description" placeholder="Description" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} required maxLength={10000} rows={3} className="rounded-xl border border-gray-200 px-4 py-3 md:col-span-2" />
            <button disabled={busy} className="rounded-xl bg-cyan-700 px-5 py-3 font-bold text-white transition hover:bg-cyan-800 disabled:opacity-60 md:col-span-2">{busy ? 'Saving...' : 'Add product'}</button>
          </form>
        )}
        {error && <p className="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
        {notice && <p className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">{notice}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map(product => (
            <article key={product.id} className="rounded-2xl border border-gray-100 p-4">
              {product.imageUrl && <img src={product.imageUrl} alt="" className="mb-4 h-36 w-full rounded-xl bg-gray-50 object-cover" />}
              <h2 className="font-bold text-gray-900">{product.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{product.description}</p>
              <p className="mt-3 font-black text-cyan-800">${Number(product.price).toFixed(2)}</p>
              {user.role === 'ADMIN' && <p className="mt-1 text-xs text-gray-400">Seller: {product.sellerId}</p>}
            </article>
          ))}
        </div>
        {!products.length && data && <p className="mt-6 rounded-2xl bg-gray-50 p-6 text-sm text-gray-500">No products have been added yet.</p>}
      </>
    )
  }

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{user.role} dashboard</p>
      <h1 className="mt-2 text-3xl font-black text-gray-950">Welcome, {user.name?.split(' ')[0]}</h1>
      <p className="mt-2 text-sm text-gray-500">Your Avenza account, all in one place.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className={cardClass}><span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-100 text-cyan-800"><FaCircleCheck /></span><p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-500">Account status</p><p className="mt-1 text-lg font-black text-gray-900">Active</p></div>
        <div className={cardClass}><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-100 text-blue-800"><FaUsers /></span><p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-500">Account type</p><p className="mt-1 text-lg font-black text-gray-900">{user.role}</p></div>
        <div className={cardClass}><span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-100 text-indigo-800"><FaBoxOpen /></span><p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-500">Purchases</p><p className="mt-1 text-lg font-black text-gray-900">Coming soon</p></div>
      </div>
      {user.role !== 'USER' && (
        <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5">
          <div className="flex items-start gap-4"><FaChartLine className="mt-1 text-xl text-cyan-700" /><div><h2 className="font-black text-gray-900">{user.role === 'ADMIN' ? 'Store administration' : 'Seller workspace'}</h2><p className="mt-1 text-sm leading-6 text-gray-600">{user.role === 'ADMIN' ? 'Manage user roles and review catalog entries from the dashboard menu.' : 'Add products and manage your seller catalog from the dashboard menu.'}</p></div></div>
        </div>
      )}
      {error && <p className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
    </>
  )
}

export default DashboardPage
