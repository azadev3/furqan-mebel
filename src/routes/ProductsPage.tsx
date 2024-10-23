import React, { ChangeEvent, useEffect, useState } from "react";
import NavigationShower from "../uitils/NavigationShower";
import { Helmet } from "react-helmet";
import { useSeo } from "../useSeo";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CategoriesForFilterIsSelectedCategoryProductState,
  CategoryNameForSelected,
  CategoryNameForSelectedID,
} from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import { checkboxCheckedState, LoadingState, rangeMinMaxInputState } from "../recoil/Atoms";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import axios from "axios";
import { useTranslations } from "../TranslateContext";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../api/Baseurl";
import __________ from "lodash";
import Loader from "../uitils/Loader";
import ProductCard from "../features/ProductCard";
import { Pagination, Stack } from "@mui/material";

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

const ProductsPage: React.FC = () => {
  const seoData = useSeo("products_page");
  const catName = useRecoilValue(CategoryNameForSelected);
  const catID = useRecoilValue(CategoryNameForSelectedID);

  const [isLoading, _] = useRecoilState(LoadingState);
  const [selectedCategoryProducts, setSelectedProd] = useRecoilState(CategoriesForFilterIsSelectedCategoryProductState);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const activelanguage = useRecoilValue(SelectedLanguageState);

  const productsPerPage = 15;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const getProducts = async (
    page: number | null,
    ascend?: string | null,
    material?: any,
    min_price?: any,
    max_price?: any
  ) => {
    try {
      const response = await axios.get(
        `https://admin.furqanmebel.az/api/all_products?page=${page}&limit=${productsPerPage}&sort=${ascend || ""}&${
          material || ""
        }&min_price=${min_price || ""}&max_price=${max_price || ""}`,
        {
          headers: {
            "Accept-Language": activelanguage,
          },
        }
      );
      if (response.data) {
        setSelectedProd(response.data.products);
        setTotalProducts(response.data?.pagination?.total || 0);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! SORT FILTERING
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

  //checkboxes
  const [checkboxChecked, setChecked] = useRecoilState(checkboxCheckedState);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // filtering checkbox
  const handleCheckboxClick = async (id: any) => {
    if (checkboxChecked === id) {
      setChecked(null);
      getProducts(
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
      getProducts(currentPage, "price_asc", params, minPrice, maxPrice);
    } else if (id === 2) {
      // bahadan ucuza
      getProducts(currentPage, "price_desc", params, minPrice, maxPrice);
    } else if (id === 3) {
      // yeni mehsullar
      getProducts(currentPage, "new_products", params, minPrice, maxPrice);
    } else if (id === 4) {
      // endirimli mehsullar
      getProducts(currentPage, "discounted_products", params, minPrice, maxPrice);
    }
  };

  //! MATERIAL FILTERING
  // get filters
  const { data: filterData } = useQuery<FilterData[]>({
    queryKey: ["filterDataKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/filters`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.filters;
    },
  });

  //select filtering for according MATERIALS
  const [selectedMaterial, setSelectedMaterial] = React.useState<{ [key: number]: boolean }>({});

  const handleSelectMaterials = async (id: number) => {
    setSelectedMaterial((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedOptionIds = Object.keys(selectedMaterial)
    .filter((key) => selectedMaterial[parseInt(key)])
    .map((key) => parseInt(key));

  const params = selectedOptionIds.length ? selectedOptionIds.map((id) => `option_id[]=${id}`).join("&") : "";

  React.useEffect(() => {
    const selectedOptionIds = Object.keys(selectedMaterial)
      .filter((key) => selectedMaterial[parseInt(key)])
      .map((key) => parseInt(key));

    const params = selectedOptionIds.length ? selectedOptionIds.map((id) => `option_id[]=${id}`).join("&") : "";
    getProducts(
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
      getProducts(
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
    getProducts(
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
    getProducts(
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

    await getProducts(page, sortOrder, params, minPrice, maxPrice);
  };

  //refresh filters
  const refreshFilters = () => {
    getProducts(currentPage);
    setChecked(null);
    setSelectedMaterial({});
    setMinPrice("");
    setMaxPrice("");
    setInputValue("");
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-page-wrapper">
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
      <div className="products-page">
        <NavigationShower prevpage={translations['kataloq_key']} />

        <div className="container-products">
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
                <span>{translations["qiymet_araligi_filter"]}</span>

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

                {filterData && filterData.length > 0
                  ? filterData.map((item: FilterData) => (
                      <div className="material" key={item.title}>
                        <span>{item.title}</span>
                        <div className="materials">
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

          <div className="products-main">
            <span className="title">Məhsullar</span>
            <div className="container-product-main">
              {isLoading ? (
                <Loader />
              ) : selectedCategoryProducts.length === 0 ? (
                <div className="no-content-msg">
                  <p></p>
                </div>
              ) : (
                <div className="products">
                  <ProductCard product={selectedCategoryProducts} />
                </div>
              )}

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
    </div>
  );
};

export default ProductsPage;
