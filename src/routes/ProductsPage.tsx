import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import Filter from "../components/productpageuitils/Filter";
import ProductsMain from "../components/productpageuitils/ProductsMain";

const ProductsPage: React.FC = () => {
  return (
    <div className="product-page-wrapper">
      <div className="products-page">
        <NavigationShower prevpage="Kataloq" />

        <div className="container-products">
          <Filter />
          <ProductsMain />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
