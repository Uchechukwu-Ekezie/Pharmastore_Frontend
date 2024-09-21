import { createBrowserRouter } from "react-router-dom";
import Homed from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassowrd";
import Signup from "../pages/Signup";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import App from "../App";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";
import LandingPage from "../pages/LandingPage";
import Contact from "../pages/Contact";
import CategoryProduct from "../pages/CategoryProduct";
import ErrorBoundary from "../Component/ErrorBoundary";
import UserProfile from "../pages/UserProfile";
import VendorSignup from "../pages/VendorSignup";
import AllVendor from "../pages/AllVendor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "contact",
    element: <Contact />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/store",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "", // Matches /store
        element: <Homed />,
      },
      {
        path: "login", // Matches /store/login
        element: <Login />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "forgot-password", // Matches /store/forgot-password
        element: <ForgotPassowrd />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "sign-up", // Matches /store/sign-up
        element: <Signup />,
        errorElement: <ErrorBoundary />,
      },

      {
        path: "vendorsign-up", // Matches /store/sign-up
        element: <VendorSignup/>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "profile", // Matches /store/sign-up
        element: <UserProfile/>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "product-category", // Matches /store/product-category
        element: <CategoryProduct />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "product/:id", // Matches /store/product/:id
        element: <ProductDetails />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "cart", // Matches /store/cart
        element: <Cart />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "success", // Matches /store/success
        element: <Success />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "cancel", // Matches /store/cancel
        element: <Cancel />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "order", // Matches /store/order
        element: <OrderPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "search", // Matches /store/search
        element: <SearchProduct />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "all-users", // Matches /store/admin-panel/all-users
            element: <AllUsers />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "all-vendor", // Matches /store/admin-panel/all-users
            element: <AllVendor/>,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "all-products", // Matches /store/admin-panel/all-products
            element: <AllProducts />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "all-orders", 
            element: <AllOrder />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

export default router;
