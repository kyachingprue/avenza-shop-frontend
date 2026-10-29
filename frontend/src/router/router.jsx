import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Products from "../pages/Products";
import ProductDetails from "../components/products/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PostCardDetails from "../components/post/PostCardDetails";
import UserPost from "../components/post/UserPost";
import CheckoutResult from "../pages/CheckoutResult";
import AuthPage from "../pages/AuthPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import PaymentHistoryPage from "../pages/PaymentHistoryPage";
import OrdersPage from "../pages/OrdersPage";
import SellerRequestPage from "../pages/SellerRequestPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage/>
  },
  {
    path: "/register",
    element: <AuthPage/>
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: null
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
      },
      {
        path: "/checkout/success",
        element: <CheckoutResult/>
      },
      {
        path: "/checkout/cancel",
        element: <CheckoutResult canceled/>
      },
      {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
          { index: true, element: <DashboardPage/> },
          { path: "profile", element: <ProfilePage/> },
          { path: "payments", element: <PaymentHistoryPage/> },
          { path: "orders", element: <OrdersPage/> },
          { path: "seller-request", element: <SellerRequestPage/> }
        ]
      }
    ]
  }
])

export default router;
