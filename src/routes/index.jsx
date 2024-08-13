import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homed from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassowrd";
import Signup from "../pages/Signup";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homed/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd/>,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails/>,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel/>,
        children: [
          {
            path: "all-users",
            element: <AllUsers/>,
          },
          {
            path: "all-products",
            element: <AllProducts/>,
          },
        ],
      },
    ],
  },
]);

export default Router;
