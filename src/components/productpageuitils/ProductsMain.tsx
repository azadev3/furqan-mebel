import React, { ChangeEvent, useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { CategoriesForFilterIsSelectedCategoryProductState, CatProductType } from "./filteruitils/CategoriesForFilter";
import { checkboxCheckedState, LoadingState, rangeMinMaxInputState } from "../../recoil/Atoms";
import Loader from "../../uitils/Loader";
import ProductCard from "../../features/ProductCard";
import axios from "axios";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { Pagination, Stack } from "@mui/material";
import __________ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import { useTranslations } from "../../TranslateContext";

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

export const PriceAscDataState = atom<CatProductType[]>({
  key: "PriceAscDataState",
  default: [],
});

export const PriceMinMaxState = atom<CatProductType[]>({
  key: "PriceMinMaxState",
  default: [],
});

export const OthersFilterData = atom<CatProductType[]>({
  key: "OthersFilterData",
  default: [],
});

const ProductsMain: React.FC = () => {
  const [isLoading, _] = useRecoilState(LoadingState);
  const [selectedCategoryProducts, setSelectedProd] = useRecoilState(CategoriesForFilterIsSelectedCategoryProductState);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const activelanguage = useRecoilValue(SelectedLanguageState);

  const productsPerPage = 15;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getProducts = async (
    page: number | null,
    ascend?: string | null,
    material?: any,
    min_price?: any,
    max_price?: any
  ) => {
    try {
      const response = await axios.get(
        `https://admin.furqanmebel.az/api/all_products?page=${page}&limit=${productsPerPage}&sort=${
          ascend ? ascend : ""
        }&${material ? material : ""}&min_price=${min_price ? min_price : ""}&max_price=${max_price ? max_price : ""}`,
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

  // filtering checkbox
  const handleCheckboxClick = async (id: any) => {
    if (checkboxChecked === id) {
      setChecked(null);
      getProducts(currentPage, null);
      return;
    }

    setChecked(id);
    // ucuzdan bahaya
    if (id === 1) {
      getProducts(currentPage, "price_asc");
    } else if (id === 2) {
      // bahadan ucuza
      getProducts(currentPage, "price_desc");
    } else if (id === 3) {
      // yeni mehsullar
      getProducts(currentPage, "new_products");
    } else if (id === 4) {
      // endirimli mehsullar
      getProducts(currentPage, "discounted_products");
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

  React.useEffect(() => {
    const selectedOptionIds = Object.keys(selectedMaterial)
      .filter((key) => selectedMaterial[parseInt(key)])
      .map((key) => parseInt(key));

    const params = selectedOptionIds.length ? selectedOptionIds.map((id) => `option_id[]=${id}`).join("&") : "";
    getProducts(currentPage, null, params);
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
  const [_______, setInputValue] = useRecoilState(rangeMinMaxInputState);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // Debounce
  const debouncedFetchProducts = React.useCallback(
    __________.debounce(async (min: any, max: any) => {
      getProducts(currentPage, null, null, min, max);
    }, 500),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
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
    getProducts(currentPage, "", "", "", "");
  }, [currentPage, activelanguage]);
  return (
    <div className="products-main">
      <span className="title">Məhsullar</span>
      <div className="container-product-main">

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
          </div>


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
            onChange={() => handlePageChange(currentPage + 1)}
            count={totalPages}
            color="secondary"
          />
        </Stack>

      </div>
    </div>
  );
};

export default ProductsMain;
