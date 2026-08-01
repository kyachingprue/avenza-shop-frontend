import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState, useRef} from "react";


const Navbar = () => {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false)
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
           const response = await fetch('/products.json')
           const data = await response.json()
           setProducts(data)
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

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  }

  return (
    <div className="flex justify-between items-center p-4 bg-cyan-950 mx-auto px-4 py-4">
      {/* Website Logo */}
      <Link to="/" className="flex items-center cursor-pointer gap-2">
        <img
          src="https://i.ibb.co.com/RTLSy2hP/ecommerce-web-logo.png"
          alt="e-commerce website logo"
          className="w-14 object-contain"
        />
        <h3 className="text-xl text-white font-bold leading-5">
          Avenza <br /> <span className="text-blue-400">Shop</span>
        </h3>
      </Link>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input + Suggestions */}
        <div ref={searchRef} className="relative flex-1">
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-96 h-12 rounded-xl border border-cyan-300 bg-white px-5 text-gray-700 text-base md:text-lg outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200"
          />

          {showSuggestions && search.length > 0 && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              <ul className="max-h-96 overflow-y-auto">
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
      <ul className="flex items-center gap-8 text-lg font-medium">
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
      <div className="flex gap-3 mx-4">
        <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 active:scale-95">
          Login
        </button>
        <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 active:scale-95">
          Register
        </button>
      </div>
    </div>
  )
};

export default Navbar;
