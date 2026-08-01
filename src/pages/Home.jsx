import Category from "../components/category/Category";
import Banner from "../components/home/Banner";
import HomeProducts from "../components/home/HomeProducts";


const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <HomeProducts/>
    </div>
  );
};

export default Home;
