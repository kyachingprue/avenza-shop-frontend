import { Link } from "react-router";


const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-cyan-200 shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
        {/* Image */}
        <div className="relative overflow-hidden">
          <Link to={`/products/details/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
            />
          </Link>

          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            -{product.discount}%
          </span>

          <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
            ❤️
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-base text-blue-600 font-medium mt-1">
            {product.brand}
          </p>

          <Link to={`/products/details/${product.id}`}>
            <h2 className="font-semibold hover:underline cursor-pointer hover:text-blue-800 text-xl mt-2 line-clamp-2">
              {product.name}
            </h2>
          </Link>

          <div className="flex items-center gap-2 mt-3">
            ⭐<span>{product.rating}</span>
            <span className="text-gray-500">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <h3 className="text-2xl font-bold text-blue-600">
              ${product.price}
            </h3>

            <del className="text-gray-400">${product.oldPrice}</del>
          </div>

          <p className="mt-3 text-green-600 font-medium">
            In Stock ({product.stock})
          </p>

          <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
};

export default ProductCard;
