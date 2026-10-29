import { useEffect, useRef, useState } from 'react'
import { FaBagShopping, FaChevronDown, FaMagnifyingGlass, FaRightFromBracket, FaUser, FaXmark } from 'react-icons/fa6'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import CartDrawer from '../cart/CartDrawer'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { getCatalogProducts } from '../../lib/catalog'

const StoreNavbar = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)
  const [visible, setVisible] = useState(true)
  const previousScroll = useRef(0)
  const profileRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { count } = useCart()

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setProducts(await getCatalogProducts())
      } catch (error) {
        console.error('Product search could not be loaded:', error)
      }
    }
    fetchCatalog()
  }, [])

  useEffect(() => {
    const onPointerDown = event => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false)
      if (searchRef.current && !searchRef.current.contains(event.target)) setSuggestionsOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < 120 || current < previousScroll.current)
      previousScroll.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const matches = search.trim()
    ? products.filter(product =>
      [product.name, product.brand, product.category].some(value =>
        value?.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    ).slice(0, 5)
    : []

  const startLogin = () => {
    setMenuOpen(false)
    navigate('/login', { state: { from: `${location.pathname}${location.search}` } })
  }

  const submitSearch = event => {
    event.preventDefault()
    if (!search.trim()) return
    navigate(`/products?search=${encodeURIComponent(search.trim())}`)
    setSearch('')
    setSuggestionsOpen(false)
    setMenuOpen(false)
  }

  const signOut = async () => {
    setLogoutError('')
    setLoggingOut(true)
    try {
      await logout()
      setProfileOpen(false)
      navigate('/', { replace: true })
    } catch (error) {
      setLogoutError(error.message || 'Unable to sign out. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  const navClass = ({ isActive }) =>
    `relative whitespace-nowrap py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-cyan-300 after:transition-transform ${isActive ? 'text-cyan-200 after:scale-x-100' : 'text-white after:scale-x-0 hover:text-cyan-200 hover:after:scale-x-100'}`
  const avatar = user?.name?.trim().charAt(0).toUpperCase() || <FaUser />

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-xl shadow-slate-950/10 backdrop-blur-xl transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex h-19 w-11/12 max-w-360 items-center justify-between gap-4">
          <button type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white transition hover:bg-white/10 xl:hidden">
            {menuOpen ? <FaXmark /> : <HiOutlineMenuAlt3 size={23} />}
          </button>
          <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="" className="h-10 w-10 rounded-full object-contain" />
            <span className="text-lg font-black leading-5 tracking-tight sm:text-xl">Avenza<span className="block text-xs font-bold tracking-[0.2em] text-cyan-300">SHOP</span></span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            <NavLink to="/" end className={navClass} style={({ isActive }) => isActive ? { color: '#a5f3fc' } : undefined}>Home</NavLink>
            <NavLink to="/products" className={navClass} style={({ isActive }) => isActive ? { color: '#a5f3fc' } : undefined}>Products</NavLink>
            <NavLink to="/about" className={navClass} style={({ isActive }) => isActive ? { color: '#a5f3fc' } : undefined}>About</NavLink>
            <NavLink to="/contact" className={navClass} style={({ isActive }) => isActive ? { color: '#a5f3fc' } : undefined}>Contact</NavLink>
          </nav>

          <div className="hidden min-w-0 max-w-105 flex-1 lg:block" ref={searchRef}>
            <form onSubmit={submitSearch} className="relative flex h-10 items-center overflow-visible rounded-xl border border-white/15 bg-white/10 transition-colors focus-within:border-cyan-300/70">
              <FaMagnifyingGlass className="ml-3 shrink-0 text-sm text-cyan-200" />
              <input value={search} onChange={event => { setSearch(event.target.value); setSuggestionsOpen(true) }} onFocus={() => setSuggestionsOpen(true)} placeholder="Search products..." aria-label="Search products" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none focus-visible:outline-none placeholder:text-slate-300" />
              <button type="submit" className="mr-1 inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-cyan-600 px-3 text-xs font-bold leading-none text-white transition hover:bg-cyan-500">Search</button>
              {suggestionsOpen && matches.length > 0 && (
                <ul className="absolute left-0 right-0 top-full z-60 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-900 shadow-2xl">
                  {matches.map(product => (
                    <li key={product.id}>
                      <Link to={`/products/details/${product.id}`} onClick={() => { setSearch(''); setSuggestionsOpen(false) }} className="flex items-center gap-3 border-b border-gray-100 p-3 transition last:border-0 hover:bg-cyan-50">
                        <img src={product.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <span className="min-w-0 flex-1"><strong className="block truncate text-sm">{product.name}</strong><small className="text-gray-500">{product.brand} · {product.category}</small></span>
                        <strong className="text-sm text-cyan-800">${Number(product.price).toLocaleString()}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => user ? setCartOpen(true) : startLogin()} aria-label={user ? `Open cart, ${count} items` : 'Sign in to open your cart'} className="relative grid h-10 w-10 place-items-center rounded-xl text-white transition hover:bg-white/10 hover:text-cyan-200">
              <FaBagShopping className="text-lg" />
              {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan-400 px-1 text-[10px] font-black text-slate-950">{count}</span>}
            </button>
            {user ? (
              <div className="relative" ref={profileRef}>
                <button type="button" onClick={() => setProfileOpen(value => !value)} aria-expanded={profileOpen} aria-label="Open account menu" className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1 pr-2 text-white transition hover:border-cyan-300/60 hover:bg-white/15">
                  {user.photoURL ? <img src={user.photoURL} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-black text-white">{avatar}</span>}
                  <FaChevronDown className={`hidden text-xs text-cyan-100 transition sm:block ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-800 shadow-2xl">
                    <div className="border-b border-gray-100 bg-linear-to-r from-cyan-50 to-blue-50 px-4 py-4">
                      <p className="truncate font-bold">{user.name}</p>
                      <p className="truncate text-xs text-gray-500">{user.email}</p>
                      <span className="mt-2 inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-cyan-900">{user.role}</span>
                    </div>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="block px-4 py-3 text-sm font-semibold transition hover:bg-cyan-50 hover:text-cyan-800">Dashboard</Link>
                    <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-3 text-sm font-semibold transition hover:bg-cyan-50 hover:text-cyan-800">My profile</Link>
                    {logoutError && <p role="alert" className="px-4 py-2 text-xs text-rose-600">{logoutError}</p>}
                    <button type="button" onClick={signOut} disabled={loggingOut} className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"><FaRightFromBracket /> {loggingOut ? 'Signing out...' : 'Sign out'}</button>
                  </div>
                )}
              </div>
            ) : (
              <button type="button" onClick={startLogin} className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-cyan-900/20 transition hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500">Login</button>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950 px-5 pb-5 pt-4 lg:hidden">
            <form onSubmit={submitSearch} className="mb-4 flex items-center gap-2">
              <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products..." className="h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none focus-visible:outline-none placeholder:text-slate-300 focus:border-cyan-300" />
              <button type="submit" className="inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-cyan-600 px-4 font-bold leading-none text-white">Search</button>
            </form>
            <nav className="grid grid-cols-2 gap-2" aria-label="Mobile navigation">
              {[['Home', '/'], ['Products', '/products'], ['About', '/about'], ['Contact', '/contact']].map(([label, to]) => (
                <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-cyan-700 text-white' : 'text-white hover:bg-white/10 hover:text-cyan-200'}`}>{label}</NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  )
}

export default StoreNavbar
