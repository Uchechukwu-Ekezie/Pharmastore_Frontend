import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Headers from "./Component/Header";
import Hader from "./Component/Hader";
import ScrollToTop from "./ScrollTop";
import WhatsAppIcon from "./Component/Whatsapp";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! Status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();
      console.log("Fetch User Details Response:", dataApi);

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        console.error("Failed to fetch user details:", dataApi.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: "include",
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! Status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        setCartProductCount(dataApi?.data?.count);
      } else {
        console.error(dataApi.message);
      }
    } catch (error) {
      console.error("Failed to fetch cart product count:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <div>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ScrollToTop/>
        <ToastContainer position="top-center" />
        <Headers />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
      <WhatsAppIcon/>
    </div>
  );
}

export default App;
