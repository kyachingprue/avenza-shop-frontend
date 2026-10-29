import { useState } from 'react'
import { FaBars, FaChartLine, FaCreditCard, FaGear, FaHouse, FaUser, FaUsers, FaBoxOpen, FaStore, FaXmark } from 'react-icons/fa6'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

const linksForRole = {
  USER: [
    { to: '/dashboard', label: 'Overview', icon: FaHouse, end: true },
    { to: '/dashboard/payments', label: 'Payments', icon: FaCreditCard },
    { to: '/dashboard/orders', label: 'My orders', icon: FaBoxOpen },
    { to: '/dashboard/seller-request', label: 'Become a seller', icon: FaStore },
  ],
  SELLER: [
    { to: '/dashboard', label: 'Overview', icon: FaHouse, end: true, view: 'overview' },
    { to: '/dashboard?view=products', label: 'My products', icon: FaChartLine, view: 'products' },
    { to: '/dashboard/payments', label: 'Payments', icon: FaCreditCard },
    { to: '/dashboard/orders', label: 'My orders', icon: FaBoxOpen },
  ],
  ADMIN: [
    { to: '/dashboard', label: 'Overview', icon: FaHouse, end: true, view: 'overview' },
    { to: '/dashboard?view=users', label: 'User management', icon: FaUsers, view: 'users' },
    { to: '/dashboard?view=seller-requests', label: 'Seller requests', icon: FaStore, view: 'seller-requests' },
    { to: '/dashboard?view=products', label: 'All products', icon: FaChartLine, view: 'products' },
  ],
}

const DashboardLayout = () => {
  const { user, ready } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  if (!ready) {
    return <main className="grid min-h-[65vh] place-items-center text-cyan-800">Loading your secure dashboard...</main>
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
  }

  const links = linksForRole[user.role] || linksForRole.USER
  const activeView = new URLSearchParams(location.search).get('view') || 'overview'

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-8 sm:px-7 lg:px-10 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Avenza account</p>
            <h1 className="mt-1 text-xl font-black text-gray-900">Your dashboard</h1>
          </div>
          <button type="button" onClick={() => setMobileOpen(value => !value)} aria-label="Toggle dashboard menu" className="grid h-11 w-11 place-items-center rounded-xl bg-white text-gray-700 shadow-sm">
            {mobileOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className={`${mobileOpen ? 'block' : 'hidden'} rounded-3xl border border-gray-100 bg-white p-5 shadow-sm lg:block`}>
            <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
              {user.photoURL
                ? <img src={user.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
                : <div className="grid h-12 w-12 place-items-center rounded-full bg-linear-to-br from-cyan-600 to-blue-700 text-lg font-black text-white">{user.name?.trim().charAt(0).toUpperCase() || <FaUser />}</div>}
              <div className="min-w-0">
                <p className="truncate font-bold text-gray-900">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.role?.toLowerCase()}</p>
              </div>
            </div>
            <nav className="mt-4 space-y-1">
              {links.map(({ to, label, icon: Icon, end, view }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive && (!view || activeView === view) ? 'bg-cyan-50 text-cyan-800' : 'text-gray-600 hover:bg-gray-50 hover:text-cyan-800'}`}
                >
                  <Icon /> {label}
                </NavLink>
              ))}
              <NavLink to="/dashboard/profile" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-cyan-50 text-cyan-800' : 'text-gray-600 hover:bg-gray-50 hover:text-cyan-800'}`}>
                <FaGear /> Profile
              </NavLink>
            </nav>
            <button type="button" onClick={() => navigate('/')} className="mt-6 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 transition hover:border-cyan-200 hover:text-cyan-800">
              Back to storefront
            </button>
          </aside>
          <section className="min-h-140 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
            <Outlet context={{ user }} />
          </section>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
