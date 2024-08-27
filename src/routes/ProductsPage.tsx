import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import Filter from "../components/productpageuitils/Filter";
import ProductsMain from "../components/productpageuitils/ProductsMain";
import { Helmet } from "react-helmet";

const ProductsPage: React.FC = () => {
  return (
    <div className="product-page-wrapper">
      <Helmet>
        <title>Furqan Mebel | Məhsullar</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
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
