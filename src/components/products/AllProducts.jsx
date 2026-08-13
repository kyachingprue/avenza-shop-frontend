import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useSearchParams } from 'react-router'
import Loading from '../common/Loading'
import LocomotiveScroll from 'locomotive-scroll'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true);

  const productsPerPage = 12

  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      !category || product.category.toLowerCase() === category.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json')
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    }
    fetchProducts()
  }, [])


  useEffect(() => {
    setCurrentPage(1)
  }, [search, category])

   useEffect(() => {
     const locomotiveScroll = new LocomotiveScroll()

     return () => {
       locomotiveScroll.destroy()
     }
   }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full h-full mx-auto">
      <div className="relative overflow-hidden bg-linear-to-r from-cyan-900 via-sky-500 to-blue-900 py-20 w-full mx-auto text-center text-white mb-12">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative z-10 w-8/12 mx-auto">
          <h2 className="text-4xl font-serif md:text-5xl font-black mb-5">
            Discover Amazing Products
          </h2>

          <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto leading-8">
            Browse premium electronics, fashion, gaming, home appliances and
            thousands of quality products at the best prices.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full bg-white/20 px-6 py-3 backdrop-blur-lg">
            <span className="font-semibold">
              {filteredProducts.length} Products Available
            </span>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-3xl font-bold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try searching with another keyword or category.
          </p>
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center gap-3 mt-16">
        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-5 py-3 rounded-xl font-semibold transition
      ${
        currentPage === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white shadow hover:bg-cyan-500 hover:text-white'
      }`}
        >
          Previous
        </button>

        {/* Page Numbers */}

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-12 h-12 rounded-xl font-bold transition-all duration-300
      ${
        currentPage === index + 1
          ? 'bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-xl scale-110'
          : 'bg-white hover:bg-cyan-100'
      }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-5 py-3 rounded-xl font-semibold transition
      ${
        currentPage === totalPages
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white shadow hover:bg-cyan-500 hover:text-white'
      }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllProducts
