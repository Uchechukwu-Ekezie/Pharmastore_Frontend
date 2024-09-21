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
        category={"first_aid"}
        heading={"Top's First Aids"}
      />
      <HorizontalCardProduct
        category={"Pain Management"}
        heading={"Pain Management"}
      />

      <VerticalCardProduct category={"pres_med"} heading={"Prescription Medication"} />
      <VerticalCardProduct category={"Cough & Cold"} heading={"Cough & Cold"} />
      <VerticalCardProduct category={"vitamins_supplements"} heading={"Vitamins & Supplements"} />
      <VerticalCardProduct category={"personal_care"} heading={"Chronic Diseases"} />
      <VerticalCardProduct
        category={"health_wellness"}
        heading={"Family Planning"}
      />
      <VerticalCardProduct category={"baby_child_care"} heading={"Mother & Child Care"} />
      <VerticalCardProduct
        category={"skin_care"}
        heading={"Skin Care"}
      />
       <VerticalCardProduct
        category={"malaria"}
        heading={"Malaria"}
      />
    </div>
  );
}

export default Homed;
