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
import { ProductsInterface } from "../components/homepageuitils/PopularProducts";

const ProductInner: React.FC = () => {
  const { slugproduct } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: allProductsData } = useQuery({
    queryKey: ["allProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/all_products`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.products;
    },
    staleTime: 1000000,
  });

  const productInner = allProductsData && allProductsData?.length > 0 && allProductsData.find((item: ProductsInterface) => {
    return item?.slug.toLowerCase() === slugproduct?.toLowerCase();
  });

  return (
    <main className="product-inner-page-wrapper">
      <section className="productinnerpage">
        <NavigationShower
          prevpage={productInner && productInner.title.toString() ? productInner.title.toString() : ""}
        />

        <div className="product-showing-area">
          <div className="product-showing">
            <ImageSection />
            <ProductSection />
          </div>
        </div>
        <Sizes />
        <SimiliarProducts />
      </section>
    </main>
  );
};

export default ProductInner;
