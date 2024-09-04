import React from "react";
import "../styles/catalogpage.scss";
import { Helmet } from "react-helmet";
import NavigationShower from "../uitils/NavigationShower";
import Filter from "./productpageuitils/Filter";
import { useSeo } from "../useSeo";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CategoryNameForSelected,
  CategoryNameForSelectedID,
  CatProductType,
} from "./productpageuitils/filteruitils/CategoriesForFilter";
import axios from "axios";
import { SelectedLanguageState } from "./header/SelectedLanguage";
import ProductCard from "../features/ProductCard";
import { OthersFilterData, PriceAscDataState, PriceMinMaxState } from "./productpageuitils/ProductsMain";
import { useQuery } from "@tanstack/react-query";
import { Categories } from "./header/CatalogToggleMenu";
import { Baseurl } from "../api/Baseurl";
import { useMatch, useParams } from "react-router-dom";

const CatalogPage: React.FC = () => {
  const { slugcategory } = useParams<{ slugcategory: string }>();

  // price sort asc
  const priceAscData = useRecoilValue(PriceAscDataState);

  // price min max data
  const priceMinMaxData = useRecoilValue(PriceMinMaxState);

  // others filter data
  const otherFilterData = useRecoilValue(OthersFilterData);

  const activelanguage = useRecoilValue(SelectedLanguageState);
  const seoData = useSeo("products_page");
  const [catName, _] = useRecoilState(CategoryNameForSelected);
  const [catID, setCatID] = useRecoilState(CategoryNameForSelectedID);
  const pageName = useMatch("/catalog/:slugcategory");

  const { data: CategoryProductsData } = useQuery<Categories[]>({
    queryKey: ["categoryProductsKey", activelanguage, slugcategory],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/categories`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });

      return response.data?.categories;
    },
    staleTime: 1000000,
  });

  const [categoryProducts, setCategoryProducts] = React.useState<CatProductType[]>([]);

  const getProductsToCatID = async (catid: number) => {
    try {
      const response = await axios.get(`https://admin.furqanmebel.az/api/all_products?category_id=${catid}`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      if (response.data) {
        setCategoryProducts(response.data?.products);
        console.log("catidin datasi", catid, catID, response?.data?.products, "produktlari");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!catID && CategoryProductsData) {
      let matchingCategory: Categories | any;

      matchingCategory = CategoryProductsData.find((c) => c?.slug === slugcategory);

      if (!matchingCategory) {
        for (const category of CategoryProductsData) {
          if (category.children && Array.isArray(category.children)) {
            for (const child of category.children) {
              matchingCategory = child?.slug === slugcategory ? child : undefined;

              if (!matchingCategory && child?.children && Array.isArray(child.children)) {
                matchingCategory = child.children.find((subChild) => subChild?.slug === slugcategory);
              }

              if (matchingCategory) break;
            }
          }

          if (matchingCategory) break;
        }
      }

      if (matchingCategory) {
        setCatID(matchingCategory.id);
        getProductsToCatID(matchingCategory.id);
      }
    } else if (catID) {
      getProductsToCatID(catID);
    }
  }, [catID, CategoryProductsData, slugcategory]);

  const hasProducts = categoryProducts && categoryProducts?.length > 0;

  const [catNameLocal, setCatNameLocal] = React.useState<string>("");
  React.useEffect(() => {
    const getCatname = localStorage.getItem("catname");
    if (getCatname) {
      setCatNameLocal(getCatname);
    }
  }, []);

  return (
    <div className="catalog-page-wrapper">
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
      <div className="catalog-page">
        <NavigationShower prevpage={pageName ? pageName?.pathname.split("/catalog").join("") : "Kataloq"} />

        <div className="container-catalogpage">
          <Filter />
          <div className="container-catalogpage-main">
            <h1>{catName[catID ? catID : 0] || catNameLocal || "Salam"}</h1>
            <div className="product">
              <ProductCard
                otherFilterData={otherFilterData}
                priceAscData={priceAscData}
                priceMinMaxData={priceMinMaxData}
                selectedCategoryProducts={hasProducts ? categoryProducts : []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
