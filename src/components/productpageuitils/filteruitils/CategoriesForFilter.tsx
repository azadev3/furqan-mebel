import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../header/SelectedLanguage";
import { Categories, Children, InnerChilds } from "../../header/CatalogToggleMenu";
import axios from "axios";
import { Baseurl } from "../../../api/Baseurl";
import { useQuery } from "@tanstack/react-query";
import { ImagesPopularProducts, ModulesProducts } from "../../homepageuitils/PopularProducts";
import { FaAngleDown } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { LoadingState } from "../../../recoil/Atoms";
import { Link } from "react-router-dom";

export const CategoriesForFilterIsSelectedCategoryProductState = atom<CatProductType[]>({
  key: "CategoriesForFilterIsSelectedCategoryProductState",
  default: [],
});

export const CategoryNameForSelected = atom<{ [key: number]: string }>({
  key: "CategoryNameForSelected",
  default: {},
});
export const CategoryNameForSelectedID = atom<number | null>({
  key: "CategoryNameForSelectedID",
  default: null,
});

export type Options = {
  id: number;
  title: string;
  icon: string;
  filter: { title: string };
};

export interface CatProductType {
  category_id: number;
  category_name: string;
  content: string;
  discounted_price: string;
  id: number;
  images: ImagesPopularProducts;
  img: string;
  is_favorite: boolean;
  is_in_cart: boolean;
  is_new: boolean;
  is_popular: boolean;
  is_stock: boolean;
  modules: ModulesProducts[];
  options: Options[];
  price: string;
  slug: string;
  title: string;
  quantity: number;
}

const CategoriesForFilter: React.FC = () => {
  const [_, setCatName] = useRecoilState(CategoryNameForSelected);
  const [___, setCatID] = useRecoilState(CategoryNameForSelectedID);

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

  const hasCategoryData = CategoryProductsData && CategoryProductsData?.length > 0;
  const hasChildrenData =
    hasCategoryData &&
    CategoryProductsData?.map((item: Categories) => {
      return item?.children;
    });

  //open or close sub catalogs
  const [open, setOpen] = React.useState<{ [key: number]: boolean }>({});
  const handleOpen = (id: number) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [openChildren, setOpenChildren] = React.useState<{ [key: number]: boolean }>({});
  const handleOpenChildren = (id: number) => {
    setOpenChildren((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  //GET PRODUCTS FOR CATEGORY_ID
  const [__, setLoading] = useRecoilState(LoadingState);

  const [____, setSelectedProd] = useRecoilState(CategoriesForFilterIsSelectedCategoryProductState);

  // const getProductsToCatID = async (catid: number) => {
  //   try {
  //     const response = await axios.get(`https://admin.furqanmebel.az/api/all_products?category_id=${catid}`, {
  //       headers: {
  //         "Accept-Language": activelanguage,
  //       },
  //     });
  //     if (response.data) {
  //       setSelectedProd(response.data?.products);
  //     } else {
  //       console.log(response.status);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://admin.furqanmebel.az/api/all_products", {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      if (response.data) {
        setSelectedProd(response.data?.products);
        setCatName("");
        setCatID(null);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return (
    <section className="categories-for-filter">
      <div className="top-title">
        <span>Kateqoriyalar</span>
        <BiCategoryAlt className="category-icon" />
      </div>

      <div className="categories-main-items">
        <section className="all-products" onClick={getAllProducts}>
          <span>Bütün məhsullar</span>
        </section>

        <div className="other-categories">
          {hasCategoryData &&
            CategoryProductsData?.map((categories: Categories) => (
              <div className="category" key={categories?.id}>
                <div
                  className="headlink"
                  onClick={() => {
                    handleOpen(categories?.id);
                  }}>
                  <span>{categories?.title}</span>
                  <FaAngleDown className={`dropdownicon ${open[categories?.id] ? "active" : ""}`} />
                </div>
                {open[categories?.id] && (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/catalog/${categories?.slug}`}
                    className="get-all"
                    onClick={() => {
                      // getProductsToCatID(categories?.id);
                      // setCatName(() => ({
                      //   [categories?.id]: categories?.title,
                      // }));
                      setCatID(categories?.id);
                    }}>
                    Bu kateqoriyadakı bütün məhsullar
                  </Link>
                )}

                {open[categories?.id] && (
                  <React.Fragment>
                    {hasCategoryData &&
                      hasChildrenData &&
                      categories?.children?.map((children: Children) => (
                        <div className="children" key={children?.id}>
                          <div
                            className="headlink"
                            onClick={() => {
                              handleOpenChildren(children?.id);
                            }}>
                            <span>{children?.title}</span>
                            <FaAngleDown className={`dropdownicon ${openChildren[children?.id] ? "active" : ""}`} />
                          </div>
                          {openChildren[children?.id] && (
                            <React.Fragment>
                              <Link
                                style={{ textDecoration: "none" }}
                                to={`/catalog/${children?.slug}`}
                                className="get-all"
                                onClick={() => {
                                  // getProductsToCatID(categories?.id);
                                  // setCatName(() => ({
                                  //   [categories?.id]: categories?.title,
                                  // }));
                                  setCatID(children?.id);
                                }}>
                                Bu kateqoriyadakı bütün məhsullar
                              </Link>
                              {children && children?.children?.length > 0
                                ? children?.children?.map((innerchild: InnerChilds) => (
                                    <Link to={`/catalog/${innerchild?.slug}`}
                                      onClick={() => {
                                        // getProductsToCatID(innerchild?.id);
                                        // setCatName(() => ({
                                        //   [innerchild?.id]: innerchild?.title,
                                        // }));
                                        setCatID(innerchild?.id);
                                      }}
                                      key={innerchild?.id}
                                      className="inner-child-link">
                                      {innerchild?.title}
                                    </Link>
                                  ))
                                : ""}
                            </React.Fragment>
                          )}
                        </div>
                      ))}
                  </React.Fragment>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesForFilter;
