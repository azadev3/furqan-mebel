import React from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CategoriesForFilterIsSelectedCategoryProductState,
  CatProductType,
} from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import { Categories, Children, InnerChilds } from "../components/header/CatalogToggleMenu";
import { useQuery } from "@tanstack/react-query";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { Baseurl } from "../api/Baseurl";
import axios from "axios";
import { useTranslations } from "../TranslateContext";

type props = {
  prevpage: string;
};

const NavigationShower: React.FC<props> = (props) => {

  const { translations } = useTranslations();
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/delivery" || location.pathname === "/paymentdetails";

  const isBlogInnerPage = useMatch("/blog/:slug");

  const isProductInnerPage = useMatch("/products/:slugproduct");
  const isCatalogPage = useMatch("/catalog/:slugcategory");

  const navigate = useNavigate();

  const selectedCat = useRecoilValue(CategoriesForFilterIsSelectedCategoryProductState);

  // FETCH CATEGORIES
  const activelanguage = useRecoilValue(SelectedLanguageState);
  const { data: CategoryProductsData } = useQuery<Categories[]>({
    queryKey: ["categoryProductsKey", activelanguage],
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

  const ids = CategoryProductsData?.find((item: Categories) => {
    item?.children?.map((child: Children) => {
      child?.children?.map((innerchild: InnerChilds) => {
        const selectedCategoryId =
          selectedCat?.length > 0 &&
          selectedCat?.map((s: CatProductType) => {
            return innerchild?.id === s?.category_id;
          });
        return selectedCategoryId;
      });
    });
  });

  return (
    <div className="navigation-shower">
      <span className="prevpage" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        {translations['nav_anasehife']}
      </span>
      {isDeliveryPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/mybasket" className="prevpage" style={{ textDecoration: "none" }}>
            {translations['sebet_title']}
          </Link>
        </>
      ) : isBlogInnerPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/blog" className="prevpage" style={{ textDecoration: "none" }}>
            {translations["nav_blog"]}
          </Link>
        </>
      ) : isProductInnerPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/products" className="prevpage" style={{ textDecoration: "none" }}>
            {translations['catalog']}
          </Link>
        </>
      ) : isCatalogPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/products" className="prevpage" style={{ textDecoration: "none" }}>
            {translations['catalog']}
          </Link>
        </>
      ) : null}
      <span style={{ display: isCatalogPage ? "none" : "" }} className="slash">
        /
      </span>

      {props?.prevpage === translations['catalog'] ? (
        <>
          <span className="nowpage">
            {props.prevpage} / {ids?.title}
          </span>
        </>
      ) : (
        <span className="nowpage">{props.prevpage}</span>
      )}
    </div>
  );
};

export default NavigationShower;
