import { useQuery } from "@tanstack/react-query";
import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./SelectedLanguage";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { Link } from "react-router-dom";
import { catalogState } from "../../recoil/Atoms";
import { CgClose } from "react-icons/cg";

export const clickedCategoryForFilter = atom<number | null>({
  key: "clickedCategoryForFilter",
  default: null,
});

export type InnerChilds = {
  id: number;
  title: string;
  img: string | null;
};

export type Children = {
  id: number;
  title: string;
  img: string | null;
  children: InnerChilds[];
};

export interface Categories {
  id: number;
  title: string;
  img: string | null;
  children: Children[];
}

const CatalogToggleMenu: React.FC = () => {
  const [__, setCatalogMenu] = useRecoilState(catalogState);

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

  const [hoveredCategory, setHoveredCategory] = React.useState<number | null>(
    CategoryProductsData && CategoryProductsData?.length > 0 ? CategoryProductsData[0].id : null
  );

  const handleHoverCategory = (id: number) => {
    setHoveredCategory(id);
  };

  const [_, setClickedCategory] = useRecoilState(clickedCategoryForFilter);

  return (
    <div className="toggle-catalog-menu">
      <CgClose
        className="close-togglemenu"
        style={{ display: "none" }}
        onClick={() => {
          setCatalogMenu(false);
        }}
      />
      <div className="main-categories">
        {CategoryProductsData && CategoryProductsData?.length > 0
          ? CategoryProductsData?.map((item: Categories) => (
              <span
                className={`${hoveredCategory === item?.id ? "actived-cat" : ""}`}
                key={item?.id}
                onMouseEnter={() => {
                  handleHoverCategory(item?.id);
                }}>
                {item?.title}
              </span>
            ))
          : ""}
      </div>

      <div className="right-sub-categories-container">
        {CategoryProductsData && CategoryProductsData?.length > 0
          ? CategoryProductsData?.map((item: Categories) => {
              if (hoveredCategory === item?.id) {
                return item && item?.children && item?.children?.length > 0
                  ? item.children?.map((children: Children) => (
                      <div className="links-categories" key={children?.id}>
                        <Link
                          to="/products"
                          key={children?.id}
                          onClick={() => {
                            //navigate products and show clicked category names
                            setClickedCategory(children?.id);
                            setCatalogMenu(false);
                          }}>
                          {children?.title}
                        </Link>

                        <div className="other-links">
                          {hoveredCategory &&
                          hoveredCategory === item?.id &&
                          children &&
                          children?.children &&
                          children?.children?.length > 0
                            ? children?.children?.map((children: InnerChilds) => (
                                <Link
                                  onClick={() => {
                                    //navigate products and show clicked category names
                                    setClickedCategory(children?.id);
                                    setCatalogMenu(false);
                                  }}
                                  to="/products"
                                  className="inner-child-link"
                                  key={children?.id}>
                                  {children?.title}
                                </Link>
                              ))
                            : ""}
                        </div>
                      </div>
                    ))
                  : "Hələ ki bura heç nə əlavə olunmayıb";
              }
            })
          : ""}
      </div>
    </div>
  );
};

export default CatalogToggleMenu;
