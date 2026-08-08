import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../components/products/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PostCardDetails from "../components/post/PostCardDetails";
import UserPost from "../components/post/UserPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element:<Home/>
      },
      {
        path: "/products",
        element:<Products/>
      },
      {
        path: "/products/details/:id",
        element: <ProductDetails/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/posts",
        element:<UserPost/>
      },
      {
        path: "/posts/details",
        element: <PostCardDetails/>
      }
    ]
  }
])

export default router;
