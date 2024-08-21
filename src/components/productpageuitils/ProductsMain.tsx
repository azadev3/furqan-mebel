import React from "react";
import { atom, useRecoilValue } from "recoil";
import { CategoriesForFilterIsSelectedCategoryProductState, CatProductType } from "./filteruitils/CategoriesForFilter";
import { LoadingState } from "../../recoil/Atoms";
import Loader from "../../uitils/Loader";
import ProductCard from "../../features/ProductCard";

export const PriceAscDataState = atom<CatProductType[]>({
  key: "PriceAscDataStateKey",
  default: [],
});

export const PriceMinMaxState = atom<CatProductType[]>({
  key: "PriceMinMaxStateKey",
  default: [],
});

export const OthersFilterData = atom<CatProductType[]>({
  key: "OthersFilterDataKey",
  default: [],
});

const ProductsMain: React.FC = () => {
  const isLoading = useRecoilValue(LoadingState);
  const selectedCategoryProducts = useRecoilValue(CategoriesForFilterIsSelectedCategoryProductState);

  const hasSelectedCatProd = selectedCategoryProducts && selectedCategoryProducts?.length > 0;

  //price sort asc
  const priceAscData = useRecoilValue(PriceAscDataState);

  //price min max data
  const priceMinMaxData = useRecoilValue(PriceMinMaxState);
  
  //others filter data
  const otherFilterData = useRecoilValue(OthersFilterData);

  return (
    <div className="products-main">
      {isLoading && <Loader />}
      <span className="title">Məhsullar</span>
      <div className="container-product-main">
        <React.Fragment>
          {hasSelectedCatProd ? (
            <ProductCard
              priceMinMaxData={priceMinMaxData}
              selectedCategoryProducts={selectedCategoryProducts}
              priceAscData={priceAscData}
              otherFilterData={otherFilterData}
            />
          ) : (
            "Məhsul yoxdur."
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

export default ProductsMain;
