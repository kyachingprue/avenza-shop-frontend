import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'motion/react'
import { getCatalogProducts } from '../../lib/catalog'


const Navbar = () => {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate();
  const searchRef = useRef(null)

  const suggestions = products.filter(
    product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
  )


    useEffect(() => {
       const fetchProducts = async () => {
         try {
           setProducts(await getCatalogProducts())
         } catch (error) {
           console.error(error)
         }
       }

      fetchProducts()
    }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 120) {
        // scrolling down
        setShowNavbar(false)
      } else {
        // scrolling up
        setShowNavbar(true)
      }

      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg"
    >
      <div className="mx-auto flex h-20 w-11/12 items-center gap-6">
        {/* Website Logo */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          {menuOpen ? <HiX size={32} /> : <HiOutlineMenuAlt3 size={32} />}
        </button>
        <Link to="/" className="flex items-center cursor-pointer gap-2">
          <img
            src="https://i.ibb.co.com/RTLSy2hP/ecommerce-web-logo.png"
            alt="e-commerce website logo"
            className="w-14 object-contain"
          />
          <h3 className="text-base md:text-xl text-white font-bold leading-5">
            Avenza <br /> <span className="text-blue-400">Shop</span>
          </h3>
        </Link>
        <div className="hidden lg:flex items-center gap-3">
          {/* Search Input + Suggestions */}
          <div
            ref={searchRef}
            className="relative hidden flex-1 justify-center lg:flex"
          >
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              className="h-12 w-full md:w-72 lg:w-96 rounded-xl border border-cyan-300 bg-white px-5 text-base text-gray-700 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200"
            />

            {showSuggestions && search.length > 0 && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-y-auto z-50">
                <ul className="hidden items-start lg:flex lg:flex-col ">
                  {suggestions.map(product => (
                    <Link
                      key={product.id}
                      to={`/products?search=${encodeURIComponent(product.name)}`}
                      onClick={() => {
                        setSearch('')
                        setShowSuggestions(false)
                      }}
                    >
                      <li className="flex items-center gap-4 p-3 hover:bg-cyan-50 cursor-pointer transition duration-200 border-b border-cyan-200 last:border-b-0">
                        {/* Image */}
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 line-clamp-1">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {product.brand} • {product.category}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-cyan-600">
                              ${product.price}
                            </span>

                            <del className="text-gray-400 text-sm">
                              ${product.oldPrice}
                            </del>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-cyan-300/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Search
          </button>
        </div>
        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative inline-block pb-2 transition-all duration-300 group
        ${isActive ? 'text-cyan-500' : 'text-gray-300 hover:text-cyan-500'}`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.75 rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 transition-all duration-300
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `relative inline-block pb-2 transition-all duration-300 group
        ${isActive ? 'text-cyan-500' : 'text-gray-300 hover:text-cyan-500'}`
              }
            >
              {({ isActive }) => (
                <>
                  Products
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.75 rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 transition-all duration-300
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative inline-block pb-2 transition-all duration-300 group
        ${isActive ? 'text-cyan-500' : 'text-gray-300 hover:text-cyan-500'}`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.75 rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 transition-all duration-300
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative inline-block pb-2 transition-all duration-300 group
        ${isActive ? 'text-cyan-500' : 'text-gray-300 hover:text-cyan-500'}`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.75 rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 transition-all duration-300
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <button className="px-5 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-cyan-400/40 active:scale-95">
            Login
          </button>
          <button className="px-5 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-sky-400/40 active:scale-95">
            Register
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900"
          >
            <div className="p-5 space-y-5">
              {/* Search */}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 text-gray-100 rounded-xl border border-cyan-300 px-4 py-3 outline-none"
                />

                <button className="rounded-xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 px-5 text-white">
                  Search
                </button>
              </div>

              {/* Nav */}

              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/"
                className="block text-gray-300 hover:text-cyan-400"
              >
                Home
              </NavLink>

              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/products"
                className="block text-gray-300 hover:text-cyan-400"
              >
                Products
              </NavLink>

              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/about"
                className="block text-gray-300 hover:text-cyan-400"
              >
                About
              </NavLink>

              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/contact"
                className="block text-gray-300 hover:text-cyan-400"
              >
                Contact
              </NavLink>

              {/* Buttons */}

              <div className="flex gap-3 pt-4">
                <button className="flex-1 rounded-xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-105">
                  Login
                </button>

                <button className="flex-1 rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 py-3 font-semibold text-white transition hover:scale-105">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
};

export default Navbar;
