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

type props = {
  prevpage: string;
};

const NavigationShower: React.FC<props> = (props) => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/delivery" || location.pathname === "/paymentdetails";

  const isBlogInnerPage = useMatch("/blog/:slug");

  const isProductInnerPage = useMatch("/products/:slugproduct");

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
          const selectedCategoryId = selectedCat?.length > 0 && selectedCat?.map((s: CatProductType) => {
            return innerchild?.id === s?.category_id
          });
          return selectedCategoryId;
        })
      })
    });

    const productSlug = isProductInnerPage?.params?.slugproduct;
    
    

  return (
    <div className="navigation-shower">
      <span className="prevpage" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Ana Səhifə
      </span>
      {isDeliveryPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/mybasket" className="prevpage" style={{ textDecoration: "none" }}>
            Səbət
          </Link>
        </>
      ) : isBlogInnerPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/blog" className="prevpage" style={{ textDecoration: "none" }}>
            Blog
          </Link>
        </>
      ) : isProductInnerPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/products" className="prevpage" style={{ textDecoration: "none" }}>
            Kataloq
          </Link>
        </>
      ) : null}
      <span className="slash">/</span>

      {props?.prevpage === "Kataloq" ? (
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
