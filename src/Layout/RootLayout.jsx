import React from "react";
import Header from "../Component/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/StoreNav/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function RootLayout() {
  const location = useLocation();
  return (
    <div>

      <ToastContainer position="top-center"/>
      {location.pathname==='/' ? <Header /> : <Navbar/>}
      
      <main className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout; 
