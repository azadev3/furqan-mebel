import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import Filter from "../components/productpageuitils/Filter";
import ProductsMain from "../components/productpageuitils/ProductsMain";
import { Helmet } from "react-helmet";
import { useSeo } from "../useSeo";
import { useRecoilValue } from "recoil";
import {
  CategoryNameForSelected,
  CategoryNameForSelectedID,
} from "../components/productpageuitils/filteruitils/CategoriesForFilter";

const ProductsPage: React.FC = () => {
  const seoData = useSeo("products_page");
  const catName = useRecoilValue(CategoryNameForSelected);
  const catID = useRecoilValue(CategoryNameForSelectedID);

  return (
    <div className="product-page-wrapper">
      <Helmet>
        <title>
          {`${seoData?.title} | ${catName[catID ? catID : 0] || "Bütün məhsullar"}` || "Furqan Mebel | Məhsullar"}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
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
