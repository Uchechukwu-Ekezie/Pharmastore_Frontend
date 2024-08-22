import React from "react";
import CategoryList from "../Component/CategoryList";
import BannerProduct from "../Component/BannerProduct";
import HorizontalCardProduct from "../Component/HorizontalCardProduct";
import VerticalCardProduct from "../Component/VerticalCardProduct";

function Homed() {
  return (
    <div>
      
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct
        category={"firstaid"}
        heading={"Top's First Aids"}
      />
      <HorizontalCardProduct
        category={"Pain Management"}
        heading={"Pain Management"}
      />

      <VerticalCardProduct category={"Cough & Cold"} heading={"Cough & Cold"} />
      <VerticalCardProduct category={"Vitamins & Supplements"} heading={"Vitamins & Supplements"} />
      <VerticalCardProduct category={"Chronic Diseases"} heading={"Chronic Diseases"} />
      <VerticalCardProduct
        category={"Family Planning"}
        heading={"Family Planning"}
      />
      <VerticalCardProduct category={"Mother & Child Care"} heading={"Mother & Child Care"} />
      <VerticalCardProduct
        category={"Skin Care"}
        heading={"Skin Care"}
      />
    </div>
  );
}

export default Homed;
