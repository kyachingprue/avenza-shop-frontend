import { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { Link } from "react-router";
import { getCatalogProducts } from "../../lib/catalog";
import { fallbackProducts } from "../../data/catalog-fallbacks";


const HomeProducts = ({ active = true }) => {
  const [products, setProducts] = useState([]);
  const [showingSamples, setShowingSamples] = useState(false);

  useEffect(() => {
    if (!active) return undefined

    const controller = new AbortController()
    const fetchProducts = async () => {
      try {
        const catalog = await getCatalogProducts({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setProducts(catalog.length ? catalog : fallbackProducts);
          setShowingSamples(catalog.length === 0);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error('Unable to load home products; showing sample products:', requestError);
          setProducts(fallbackProducts);
          setShowingSamples(true);
        }
      }
    }
    fetchProducts();
    return () => controller.abort()
  }, [active])

  return (
    <div className="w-11/12 h-full mx-auto py-8 px-5">
      <div className="flex justify-between items-center mb-6 py-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
          <div className="w-44 h-1 mt-2 rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600"></div>
        </div>

        <Link to="/products">
          <button
            className="group relative overflow-hidden rounded-xl border-2 border-blue-600 px-7 py-3 font-semibold text-blue-600 transition-all duration-300 hover:text-white hover:shadow-[0_10px_35px_rgba(37,99,235,0.35)] active:scale-95">
            {/* Animated Background */}
            <span
              className="absolute inset-0 origin-left scale-x-0 bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

            {/* Button Text */}
            <span className="relative z-10 flex items-center gap-2">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
      {showingSamples && (
        <p className="mb-5 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 text-sm leading-6 text-cyan-950">
          You’re viewing sample products. Live products will appear here when the catalog is available.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        {products.slice(0, 12).map(product => (
          <ProductCard key={product.id} product={product} isSample={showingSamples} />
        ))}
      </div>
    </div>
  )
};

export default HomeProducts;
