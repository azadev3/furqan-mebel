import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useParams } from "react-router-dom";
import SimiliarProducts from "../components/basketpageuitils/SimiliarProducts";
import Sizes from "../components/productinneruitils/Sizes";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../api/Baseurl";
import axios from "axios";
import { CatProductType } from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import { Helmet } from "react-helmet";
import Loader from "../uitils/Loader";
import ImageSectionPopular from "../components/productinneruitils/ImageSectionPopular";
import ProductSectionPopular from "../components/productinneruitils/ProductSectionPopular";

const ProductInnerPopular: React.FC = () => {
  const { slugproductpopular } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: popularProducts, isLoading } = useQuery({
    queryKey: ["popularProductsKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/popular_products`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.popular_products;
    },
    staleTime: 1000000,
  });

  const productInner =
    popularProducts &&
    popularProducts?.length > 0 &&
    popularProducts.find((item: CatProductType) => {
      return item?.slug === slugproductpopular?.toLowerCase();
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
              prevpage={productInner && productInner.title.toString() ? productInner.title.toString() : ""}
            />

            <div className="product-showing-area">
              <div className="product-showing">
                <ImageSectionPopular />
                <ProductSectionPopular />
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

export default ProductInnerPopular;
