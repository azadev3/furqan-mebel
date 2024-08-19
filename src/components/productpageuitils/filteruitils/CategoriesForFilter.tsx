import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../header/SelectedLanguage";
import { Categories, Children, clickedCategoryForFilter, InnerChilds } from "../../header/CatalogToggleMenu";
import axios from "axios";
import { Baseurl } from "../../../api/Baseurl";
import { useQuery } from "@tanstack/react-query";
import { ImagesPopularProducts, ModulesProducts } from "../../homepageuitils/PopularProducts";
import { LoadingState } from "../../../recoil/Atoms";
import { FaAngleDown } from "react-icons/fa6";

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
}
export const CategoriesForFilterIsSelectedCategoryProductState = atom<CatProductType[]>({
  key: "CategoriesForFilterIsSelectedCategoryProductState",
  default: [],
});

const CategoriesForFilter: React.FC = () => {
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

  //give the clicked category id
  const clickedCategory = useRecoilValue(clickedCategoryForFilter);

  //show the clicked category items
  const categoryItems = CategoryProductsData
    ? CategoryProductsData.flatMap((item: Categories) =>
        item.children ? item.children.filter((child: Children) => child.id === clickedCategory) : []
      )
    : [];

  const [filterCat, setForFilterCat] = React.useState<boolean>(true);

  const openFilterCategory = () => {
    setForFilterCat((prevCategory) => !prevCategory);
  };

  const [selectedAllCategoryItem, setSelectedAllCategoryItem] = React.useState<string>("get_all_products");
  const [selectedFilterCategoryItem, setSelectedFilterCategoryItem] = React.useState<number | null>(null);
  const [_, setCategoryProducts] = useRecoilState(CategoriesForFilterIsSelectedCategoryProductState);
  const [__, setLoading] = useRecoilState(LoadingState);

  //get category product on the category_id
  const getCategoryProduct = async (category_id: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}/all_products?category_id=${category_id}`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      if (response.data) {
        setCategoryProducts(response.data?.products);
        setSelectedFilterCategoryItem(category_id);
        setSelectedAllCategoryItem("");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //get all products
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}/all_products`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      if (response.data) {
        setCategoryProducts(response.data?.products);
        setSelectedAllCategoryItem("get_all_products");
        setSelectedFilterCategoryItem(null);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getAllProducts();
  }, []);

  //if user clicked left filter categories open her catalog
  const [opened, setOpened] = React.useState<number | null>(null);
  const openCatalog = (id: number | null) => {
    setOpened((prev) => (prev ? null : id));
  };

  return (
    <section className="categories-for-filter">
      <div className="head" onClick={openFilterCategory}>
        <span>Kateqoriya:</span>
        {categoryItems && categoryItems?.map((item: Children) => <span key={item?.id} className="selection-cat">{item?.title}</span>)}
        <img src="../down.svg" alt="down" />
      </div>

      {filterCat && (
        <div className="filter-category-submenu">
          <span
            className={selectedAllCategoryItem === "get_all_products" ? "selected-item" : ""}
            onClick={getAllProducts}>
            Bütün məhsullar
          </span>
          {categoryItems && categoryItems?.length > 0
            ? categoryItems?.map((children: Children) =>
                children && children.children && children?.children?.length > 0
                  ? children?.children?.map((inner: InnerChilds) => (
                      <span
                        key={inner?.id}
                        className={selectedFilterCategoryItem === inner?.id ? "selected-item" : ""}
                        onClick={() => getCategoryProduct(inner?.id)}>
                        {inner?.title}
                      </span>
                    ))
                  : ""
              )
            : CategoryProductsData && CategoryProductsData?.length > 0
            ? CategoryProductsData?.map((item: Categories) => (
                <div
                  key={item?.id}
                  className="category-link"
                  onClick={() => {
                    openCatalog(item?.id);
                  }}>
                  <div className="headlink">
                  <span className={selectedFilterCategoryItem === item?.id ? "selected-item" : ""}>{item?.title}</span>
                  <FaAngleDown className="downicon" style={{ transform: opened === item?.id ? 'rotate(180deg)' : "" }}/>
                  </div>
                    <div className={`links-inner-category ${opened === item?.id ? "active" : ""}`}>
                      {item?.children && item?.children?.length > 0
                        ? item?.children?.map((children: Children) => (
                            <span 
                            onClick={() => {
                              getCategoryProduct(children?.id)
                            }}
                            key={children?.id} 
                            className="inner-links">
                              {children?.title}
                            </span>
                          ))
                        : ""}
                    </div>
                </div>
              ))
            : ""}
        </div>
      )}
    </section>
  );
};

export default CategoriesForFilter;
