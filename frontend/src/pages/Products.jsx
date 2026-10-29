import AllProducts from "../components/products/AllProducts";
import { useLocation } from "react-router";


const Products = () => {
  const { search } = useLocation()

  return (
    <div className="pt-20">
      <AllProducts key={search} />
    </div>
  );
};

export default Products;
