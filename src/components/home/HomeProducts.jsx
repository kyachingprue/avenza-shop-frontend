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
    <div className="w-full h-full py-8 px-4">
      <div className="flex justify-between items-center mb-4 py-10">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <Link to="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            View All
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
