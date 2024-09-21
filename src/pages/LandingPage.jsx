// src/pages/LandingPage.jsx
import React from "react";
import Hader from "../Component/Hader";
import Hero from "../Component/Homepage/Hero";
import HeroTwo from "../Component/Homepage/HeroTwo";
import PopularProducts from "../Component/Homepage/PopularProduct";
import Footer from "../Component/Footer";
import WhatsAppIcon from "../Component/Whatsapp";

const LandingPage = () => {
  return (
    <div>
        <Hader/>
        <Hero/>
        <HeroTwo/>
        <PopularProducts/>
        <Footer/>
        <WhatsAppIcon/>
     
    </div>
  );
};

export default LandingPage;
