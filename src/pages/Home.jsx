import Category from "../components/category/Category";
import Banner from "../components/home/Banner";
import HomeProducts from "../components/home/HomeProducts";
import Testimonials from "../components/home/Testimonials";
import UserPost from "../components/post/UserPost";


const Home = () => {
  return (
    <div className="pt-20">
      <Banner />
      <Category />
      <HomeProducts />
      <UserPost/>
      <Testimonials />
    </div>
  );
};

export default Home;
