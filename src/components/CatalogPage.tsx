import React, { ChangeEvent, useEffect } from "react";
import "../styles/catalogpage.scss";
import { Helmet } from "react-helmet";
import NavigationShower from "../uitils/NavigationShower";
import { useSeo } from "../useSeo";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CategoryNameForSelected,
  CategoryNameForSelectedID,
  CatProductType,
} from "./productpageuitils/filteruitils/CategoriesForFilter";
import axios from "axios";
import { SelectedLanguageState } from "./header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Categories } from "./header/CatalogToggleMenu";
import { Baseurl } from "../api/Baseurl";
import { useMatch, useParams } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { useTranslations } from "../TranslateContext";
import { checkboxCheckedState, rangeMinMaxInputState } from "../recoil/Atoms";
import __________ from "lodash";
import Loader from "../uitils/Loader";
import ProductCardForCatalog from "../features/ProductCardForCatalog";

type SortItemType = {
  id: number;
  title: string;
};

type Optionsfilter = {
  id: number;
  icon: string | null;
  title: string;
};

interface FilterData {
  id: number;
  title: string;
  options: Optionsfilter[];
}

type RangeInputType = {
  id: number;
  type: string;
  placeholder: string;
};

const CatalogPage: React.FC = () => {
  const { slugcategory } = useParams<{ slugcategory: string }>();

  const activelanguage = useRecoilValue(SelectedLanguageState);
  const seoData = useSeo("products_page");
  const [catName, _] = useRecoilState(CategoryNameForSelected);
  const [catID, setCatID] = useRecoilState(CategoryNameForSelectedID);
  const pageName = useMatch("/catalog/:slugcategory");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalProducts, setTotalProducts] = React.useState(0);

  const productsPerPage = 15;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const { data: CategoryProductsData, isLoading } = useQuery<Categories[]>({
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

  const activeLang = useRecoilValue(SelectedLanguageState);

  const { translations } = useTranslations();

  const SortItems: SortItemType[] = [
    {
      id: 1,
      title: translations["ucuzdan_bahaya_filter"],
    },
    {
      id: 2,
      title: translations["bahadan_ucuza_filter"],
    },
    {
      id: 3,
      title: translations["yeni_mehsullar_filter"],
    },
    {
      id: 4,
      title: translations["endirimli_mehsullar_filter"],
    },
  ];

  const [category, setCategory] = React.useState<boolean>(false);

  const openSortCategory = () => {
    setCategory((prevCategory) => !prevCategory);
  };

  const getProductsToCatID = async (
    catid: number,
    page: number | null,
    ascend?: string | null,
    material?: any,
    min_price?: any,
    max_price?: any
  ) => {
    try {
      const response = await axios.get(
        `https://admin.furqanmebel.az/api/all_products?category_id=${catid}&page=${page}&limit=${productsPerPage}&sort=${
          ascend || ""
        }&${material || ""}&min_price=${min_price || ""}&max_price=${max_price || ""}`,
        {
          headers: {
            "Accept-Language": activelanguage,
          },
        }
      );
      if (response.data) {
        setCategoryProducts(response.data?.products);
        setTotalProducts(response.data?.pagination?.total || 0);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! SORT FILTERING

  //select filtering for according MATERIALS
  const [selectedMaterial, setSelectedMaterial] = React.useState<{ [key: number]: boolean }>({});

  const selectedOptionIds = Object.keys(selectedMaterial)
    .filter((key) => selectedMaterial[parseInt(key)])
    .map((key) => parseInt(key));

  const params = selectedOptionIds.length ? selectedOptionIds.map((id) => `option_id[]=${id}`).join("&") : "";

  //checkboxes
  const [checkboxChecked, setChecked] = useRecoilState(checkboxCheckedState);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // filtering checkbox
  const handleCheckboxClick = async (id: any) => {
    if (checkboxChecked === id) {
      setChecked(null);
      getProductsToCatID(
        Number(catID),
        currentPage,
        checkboxChecked === 1
          ? "price_asc"
          : checkboxChecked === 2
          ? "price_desc"
          : checkboxChecked === 3
          ? "new_products"
          : checkboxChecked === 4
          ? "discounted_products"
          : "",
        params,
        minPrice,
        maxPrice
      );
      return;
    }

    setChecked(id);
    // ucuzdan bahaya
    if (id === 1) {
      getProductsToCatID(Number(catID), currentPage, "price_asc", params, minPrice, maxPrice);
    } else if (id === 2) {
      // bahadan ucuza
      getProductsToCatID(Number(catID), currentPage, "price_desc", params, minPrice, maxPrice);
    } else if (id === 3) {
      // yeni mehsullar
      getProductsToCatID(Number(catID), currentPage, "new_products", params, minPrice, maxPrice);
    } else if (id === 4) {
      // endirimli mehsullar
      getProductsToCatID(Number(catID), currentPage, "discounted_products", params, minPrice, maxPrice);
    }
  };

  //! MATERIAL FILTERING

  // get filters
  const { data: filterData } = useQuery<FilterData[]>({
    queryKey: ["filterDataKey", activeLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/filters`, {
        headers: {
          "Accept-Language": activeLang,
        },
      });
      return response.data?.filters;
    },
  });

  const handleSelectMaterials = async (id: number) => {
    setSelectedMaterial((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  React.useEffect(() => {
    const selectedOptionIds = Object.keys(selectedMaterial)
      .filter((key) => selectedMaterial[parseInt(key)])
      .map((key) => parseInt(key));

    const params = selectedOptionIds.length ? selectedOptionIds.map((id) => `option_id[]=${id}`).join("&") : "";
    getProductsToCatID(
      Number(catID),
      currentPage,
      checkboxChecked === 1
        ? "price_asc"
        : checkboxChecked === 2
        ? "price_desc"
        : checkboxChecked === 3
        ? "new_products"
        : checkboxChecked === 4
        ? "discounted_products"
        : "",
      params,
      minPrice,
      maxPrice
    );
  }, [selectedMaterial]);

  //! MIN - MAX PRICE FILTERING

  const RangeInputs: RangeInputType[] = [
    {
      id: 1,
      placeholder: "Min|",
      type: "number",
    },
    {
      id: 2,
      placeholder: "Max|",
      type: "number",
    },
  ];

  //Min max inputs
  const [inputValue, setInputValue] = useRecoilState(rangeMinMaxInputState);

  // Debounce
  const debouncedFetchProducts = React.useCallback(
    __________.debounce(async (min: any, max: any) => {
      getProductsToCatID(
        Number(catID),
        currentPage,
        checkboxChecked === 1
          ? "price_asc"
          : checkboxChecked === 2
          ? "price_desc"
          : checkboxChecked === 3
          ? "new_products"
          : checkboxChecked === 4
          ? "discounted_products"
          : "",
        params,
        min,
        max
      );
    }, 500),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    getProductsToCatID(
      Number(catID),
      currentPage,
      checkboxChecked === 1
        ? "price_asc"
        : checkboxChecked === 2
        ? "price_desc"
        : checkboxChecked === 3
        ? "new_products"
        : checkboxChecked === 4
        ? "discounted_products"
        : "",
      params,
      minPrice,
      maxPrice
    );

    const value = e.target.value;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === 1) {
      setMinPrice(value);
    } else if (id === 2) {
      setMaxPrice(value);
    }

    debouncedFetchProducts(id === 1 ? value : minPrice, id === 2 ? value : maxPrice);
  };

  useEffect(() => {
    getProductsToCatID(
      Number(catID),
      currentPage,
      checkboxChecked === 1
        ? "price_asc"
        : checkboxChecked === 2
        ? "price_desc"
        : checkboxChecked === 3
        ? "new_products"
        : checkboxChecked === 4
        ? "discounted_products"
        : "",
      params,
      minPrice,
      maxPrice
    );
  }, [currentPage, activelanguage]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);

    const sortOrder =
      checkboxChecked === 1
        ? "price_asc"
        : checkboxChecked === 2
        ? "price_desc"
        : checkboxChecked === 3
        ? "new_products"
        : checkboxChecked === 4
        ? "discounted_products"
        : "";

    await getProductsToCatID(Number(catID), page, sortOrder, params, minPrice, maxPrice);
  };

  //refresh filters
  const refreshFilters = () => {
    getProductsToCatID(Number(catID), currentPage);
    setChecked(null);
    setSelectedMaterial({});
    setMinPrice("");
    setMaxPrice("");
    setInputValue("");
    window.scrollTo(0, 0);
  };

  const [pageTitle, setPageTitle] = React.useState<string>("");

  React.useEffect(() => {
    if (!catID && CategoryProductsData) {
      let matchingCategory: Categories | any;

      matchingCategory = CategoryProductsData.find((c) => c?.slug === slugcategory);

      setPageTitle(matchingCategory?.meta_title);

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
        getProductsToCatID(
          matchingCategory.id,
          currentPage,
          checkboxChecked === 1
            ? "price_asc"
            : checkboxChecked === 2
            ? "price_desc"
            : checkboxChecked === 3
            ? "new_products"
            : checkboxChecked === 4
            ? "discounted_products"
            : "",
          params,
          minPrice,
          maxPrice
        );
      }
    } else if (catID) {
      getProductsToCatID(
        catID,
        currentPage,
        checkboxChecked === 1
          ? "price_asc"
          : checkboxChecked === 2
          ? "price_desc"
          : checkboxChecked === 3
          ? "new_products"
          : checkboxChecked === 4
          ? "discounted_products"
          : "",
        params,
        minPrice,
        maxPrice
      );
    }
  }, [catID, CategoryProductsData, slugcategory, currentPage]);

  const [catNameLocal, setCatNameLocal] = React.useState<string>("");
  React.useEffect(() => {
    const getCatname = localStorage.getItem("catname");
    if (getCatname) {
      setCatNameLocal(getCatname);
    }
  }, []);

  React.useEffect(() => {
    let matchingCategory: Categories | any;

    CategoryProductsData &&
      CategoryProductsData.forEach((category) => {
        if (category.slug === slugcategory) {
          matchingCategory = category;
        } else if (category.children) {
          category.children.forEach((child) => {
            if (child.slug === slugcategory) {
              matchingCategory = child;
            } else if (child.children) {
              child.children.forEach((subChild) => {
                if (subChild.slug === slugcategory) {
                  matchingCategory = subChild;
                }
              });
            }
          });
        }
      });

    if (matchingCategory) {
      setPageTitle(matchingCategory.meta_title);
    }
  }, [CategoryProductsData, slugcategory, currentPage, checkboxChecked, minPrice, maxPrice]);

  const [dropdownMinMax, setDropdownMinMax] = React.useState<boolean>(false);
  const openMinMaxDropdown = () => {
    setDropdownMinMax((prev) => !prev);
  };

  const [dropdownMaterial, setDropdownMaterial] = React.useState<{[key: number]: boolean}>({});
  const openDropdownMaterial = (id: number) => {
    setDropdownMaterial((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="catalog-page-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
      </Helmet>
      <div className="catalog-page">
        <NavigationShower prevpage={pageName ? pageName?.pathname.split("/catalog").join("") : translations['kataloq_key']} />

        <div className="container-catalogpage">
          <div className="filter">
            <div className="sort">
              <div className="sort-categ" onClick={openSortCategory}>
                <span>{translations["sort"]}</span>
                <img src="../down.svg" alt="" style={{ transform: category ? "rotate(180deg)" : "" }} />
              </div>
              <div className={`sort-category-submenu ${category ? "showed" : ""}`}>
                {SortItems.map((item: SortItemType) => (
                  <div
                    key={item.id}
                    className={`checkbox ${checkboxChecked === item?.id ? "checked-checkbox" : ""}`}
                    onClick={() => handleCheckboxClick(item.id)}>
                    <input type="checkbox" checked={checkboxChecked === item?.id} readOnly />
                    <span>{item?.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-relations">
              <div className="price-placement">
                {/* dropdown min max inputs */}
                <div className="dropdown-min-max-input">
                  <div className="dropdown-linked" onClick={openMinMaxDropdown}>
                    <span>{translations["qiymet_araligi_filter"]}</span>
                    <img src="../down.svg" alt="" style={{ transform: dropdownMinMax ? "rotate(180deg)" : "" }} />
                  </div>
                  <div className={`dropdown-minmax ${dropdownMinMax ? "actived" : ""}`}>
                    <div className="min-max">
                      {RangeInputs.map((inputs: RangeInputType) => (
                        <React.Fragment key={inputs?.id}>
                          <input
                            value={inputValue[inputs?.id]}
                            type={inputs?.type}
                            placeholder={inputs?.placeholder}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, inputs?.id)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {filterData && filterData.length > 0
                  ? filterData.map((item: FilterData, i: number) => (
                      <div className="material" key={item.title}>
                        <div className="dropdown-linked" onClick={() => openDropdownMaterial(i)}>
                          <span>{item.title}</span>
                          <img src="../down.svg" alt="" style={{ transform: dropdownMaterial[i] ? "rotate(180deg)" : "" }} />
                        </div>
                        <div className={`materials ${dropdownMaterial[i] ? "actived" : ""}`}>
                          {item.options.map((option: Optionsfilter) => (
                            <span
                              onClick={() => handleSelectMaterials(option.id)}
                              key={option.id}
                              className={`material-item ${selectedMaterial[option.id] ? "selectedmaterial" : ""}`}>
                              {option.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <button className="refresh-filter-btn" onClick={refreshFilters}>
              Filterləri sıfırla
            </button>
          </div>

          <div className="container-catalogpage-main">
            <h1>{catName[catID ? catID : 0] || catNameLocal || ""}</h1>
            <div className="product">
              {isLoading ? (
                <Loader />
              ) : categoryProducts.length === 0 ? (
                <div className="no-content-msg">
                  <p></p>
                </div>
              ) : (
                <ProductCardForCatalog product={categoryProducts} />
              )}
            </div>

            <Stack spacing={2}>
              <Pagination
                page={currentPage}
                onChange={(_, page) => handlePageChange(page)}
                count={totalPages}
                color="secondary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
