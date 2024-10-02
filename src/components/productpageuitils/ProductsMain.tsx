import React, { useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { CategoriesForFilterIsSelectedCategoryProductState, CatProductType } from "./filteruitils/CategoriesForFilter";
import { LoadingState } from "../../recoil/Atoms";
import Loader from "../../uitils/Loader";
import ProductCard from "../../features/ProductCard";
import axios from "axios";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { Pagination, Stack } from "@mui/material";

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
  const [isLoading, setIsLoading] = useRecoilState(LoadingState);
  const [selectedCategoryProducts, setSelectedProd] = useRecoilState(CategoriesForFilterIsSelectedCategoryProductState);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const priceAscData = useRecoilValue(PriceAscDataState);
  const priceMinMaxData = useRecoilValue(PriceMinMaxState);
  const otherFilterData = useRecoilValue(OthersFilterData);
  const activelanguage = useRecoilValue(SelectedLanguageState);

  const productsPerPage = 15;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getAllProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://admin.furqanmebel.az/api/all_products?page=${page}&limit=${productsPerPage}`,
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
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage, activelanguage]);

  useEffect(() => {
    getAllProducts(currentPage);
  }, [priceAscData, priceMinMaxData, otherFilterData]);

  return (
    <div className="products-main">
      <span className="title">Məhsullar</span>
      <div className="container-product-main">
        {isLoading ? (
          <Loader />
        ) : selectedCategoryProducts.length === 0 ? (
          <div className="no-content-msg">
            <p>No products found</p>
          </div>
        ) : (
          <div className="products">
            <ProductCard
              priceMinMaxData={priceMinMaxData}
              selectedCategoryProducts={selectedCategoryProducts}
              priceAscData={priceAscData}
              otherFilterData={otherFilterData}
            />
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

        {/* <div className="pagination-controls">
          <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Əvvəlki
          </button>

          <span>{currentPage}</span>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Sonrakı
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductsMain;
