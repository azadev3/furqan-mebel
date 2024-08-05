import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import SimiliarProducts from "../components/basketpageuitils/SimiliarProducts";
import Basket from "../components/basketpageuitils/Basket";

const BasketPage: React.FC = () => {
  return (
    <div className="basket-page-wrapper">
      <div className="basketpage">
        <NavigationShower prevpage="Səbət" />
        <Basket />
        <SimiliarProducts />
      </div>
    </div>
  );
};

export default BasketPage;
