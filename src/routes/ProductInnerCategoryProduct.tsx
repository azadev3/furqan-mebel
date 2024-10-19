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
import ImageSectionCat from "../components/productinneruitils/ImageSectionCat";
import ProductSectionCat from "../components/productinneruitils/ProductSectionCat";

const ProductInnerCategoryProduct: React.FC = () => {
  const { slugproductcategories } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: categoriesProduct, isLoading, refetch } = useQuery({
    queryKey: ["catProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/product_single/${slugproductcategories}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.product;
    },
  });

  React.useEffect(() => {
    refetch();
  }, [slugproductcategories]);

  const productInner =
    categoriesProduct &&
    categoriesProduct?.length > 0 &&
    categoriesProduct.find((item: CatProductType) => {
      return item?.slug?.toLowerCase() === slugproductcategories?.toLowerCase();
    });


    
  //FETCH ALL PRODUCTS
  const { data: categoryProducts } = useQuery({
    queryKey: ["catProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/product_single/${slugproductcategories}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.product;
    },
    staleTime: 1000000,
  });


    const productInnerForMetaTitle =
    categoryProducts && categoryProducts.length > 0
      ? categoryProducts.find((item: CatProductType) => {
          return item?.slug === slugproductcategories;
        })
      : "";

  return (
    <main className="product-inner-page-wrapper">
      <Helmet>
        <title>{productInnerForMetaTitle && productInnerForMetaTitle?.meta_title || productInner?.title}</title>
        <meta name="keywords" content={productInner && productInner?.meta_keywords} />
        <meta name="description" content={productInner && productInner?.meta_description} />
      </Helmet>
      <section className="productinnerpage">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <NavigationShower
              prevpage={productInner && productInner.title?.toString() ? productInner?.title?.toString() : ""}
            />

            <div className="product-showing-area">
              <div className="product-showing">
                <ImageSectionCat />
                <ProductSectionCat />
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

export default ProductInnerCategoryProduct;
