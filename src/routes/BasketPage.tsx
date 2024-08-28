import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import SimiliarProducts from "../components/basketpageuitils/SimiliarProducts";
import Basket from "../components/basketpageuitils/Basket";
import { useSeo } from "../useSeo";
import { Helmet } from "react-helmet";

const BasketPage: React.FC = () => {
  const seoData = useSeo("basket_page");

  return (
    <div className="basket-page-wrapper">
      <Helmet>
        <title>{seoData?.title || "Furqan Mebel"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
      </Helmet>
      <div className="basketpage">
        <NavigationShower prevpage="Səbət" />
        <Basket />
        <SimiliarProducts />
      </div>
    </div>
  );
};

export default BasketPage;
