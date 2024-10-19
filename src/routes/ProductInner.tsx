import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useParams } from "react-router-dom";
import SimiliarProducts from "../components/basketpageuitils/SimiliarProducts";
import ImageSection from "../components/productinneruitils/ImageSection";
import ProductSection from "../components/productinneruitils/ProductSection";
import Sizes from "../components/productinneruitils/Sizes";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../api/Baseurl";
import axios from "axios";
import { CatProductType } from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import { Helmet } from "react-helmet";
import Loader from "../uitils/Loader";

const ProductInner: React.FC = () => {
  const { slugproduct } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: allProductsData, isLoading } = useQuery({
    queryKey: ["allProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/product_single/${slugproduct}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.product;
    },
    staleTime: 1000000,
  });

  const productInner =
    allProductsData &&
    allProductsData?.length > 0 &&
    allProductsData.find((item: CatProductType) => {
      return item?.slug === slugproduct?.toLowerCase();
    });

  return (
    <main className="product-inner-page-wrapper">
      <Helmet>
        <title>{productInner && productInner?.meta_title}</title>
        <meta name="keywords" content={productInner && productInner?.meta_keywords} />
        <meta name="description" content={productInner && productInner?.meta_description} />
      </Helmet>
      <section className="productinnerpage">
        {isLoading ? (
          <Loader />
        ) : (
          <>
          <NavigationShower
          prevpage={productInner && productInner.title?.toString() ? productInner.title?.toString() : ""}
        />

        <div className="product-showing-area">
          <div className="product-showing">
            <ImageSection />
            <ProductSection />
          </div>
        </div>
        <Sizes />
        <SimiliarProducts />
          </>
        )}
      </section>
    </main>
  );
};

export default ProductInner;
