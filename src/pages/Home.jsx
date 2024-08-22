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
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
}

export default Homed;
