import { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { Link } from "react-router";
import LocomotiveScroll from "locomotive-scroll";


const HomeProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data);
      }
      fetchProducts();
    } catch (err) {
      console.error(err)
    }
  }, [])

   useEffect(() => {
     const locomotiveScroll = new LocomotiveScroll()

     return () => {
       locomotiveScroll.destroy()
     }
   }, [])
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        {products.slice(0, 12).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
};

export default HomeProducts;
