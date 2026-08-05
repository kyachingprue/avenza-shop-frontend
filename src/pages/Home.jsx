import Category from "../components/category/Category";
import Banner from "../components/home/Banner";
import HomeProducts from "../components/home/HomeProducts";
import Testimonials from "../components/home/Testimonials";


const Home = () => {
  return (
    <div className="pt-20">
      <Banner />
      <Category />
      <HomeProducts />
      <Testimonials/>
    </div>
  );
};

export default Home;
