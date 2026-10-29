import { Link } from "react-router";
import CategoryCard from "./CategoryCard";


const Category = () => {

  const categories = [
    "Smartphones",
    "Headphones",
    "Laptops",
    "Smart Watches",
    "Accessories",
    "Cameras",
    "Shoes",
    "Fashion",
    "Speakers",
    "Gaming",
    "Home Appliances",
    "Kitchen",
    "Television",
    "Tablets",
    "Drones"
  ]

  return (
    <div className="w-11/12 h-full mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold">Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {categories.map(category => (
          <Link key={category} to={`/products?category=${category}`} className="no-underline">
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    </div>
  )
};

export default Category;
