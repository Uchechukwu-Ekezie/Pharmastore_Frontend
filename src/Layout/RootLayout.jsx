import React from "react";
import Header from "../Component/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/StoreNav/Navbar";

function RootLayout() {
  const location = useLocation();
  return (
    <div>
      {location.pathname==='/' ? <Header /> : <Navbar/>}
      
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
