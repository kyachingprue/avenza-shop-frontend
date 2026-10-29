import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/common/StoreNavbar";
import Footer from "../components/common/Footer";
import Home from "../pages/Home";

const MainLayout = () => {
  const { pathname } = useLocation();
  const homeActive = pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div>
      <Navbar/>
      <div hidden={!homeActive} aria-hidden={!homeActive}>
        <Home active={homeActive} />
      </div>
      <div hidden={homeActive}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
