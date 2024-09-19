import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  CategoriesForFilterIsSelectedCategoryProductState,
  // CategoryNameForSelected,
  // CategoryNameForSelectedID,
  CatProductType,
} from "./filteruitils/CategoriesForFilter";
import { LoadingState } from "../../recoil/Atoms";
import Loader from "../../uitils/Loader";
import ProductCard from "../../features/ProductCard";
import axios from "axios";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import InfiniteScroll from "react-infinite-scroll-component";

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

  // const hasSelectedCatProd = selectedCategoryProducts && selectedCategoryProducts.length > 0;

  // price sort asc
  const priceAscData = useRecoilValue(PriceAscDataState);

  // price min max data
  const priceMinMaxData = useRecoilValue(PriceMinMaxState);

  // others filter data
  const otherFilterData = useRecoilValue(OthersFilterData);

  const activelanguage = useRecoilValue(SelectedLanguageState);

  const getAllProducts = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get("https://admin.furqanmebel.az/api/all_products", {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      if (response.data) {
        setSelectedProd(response.data?.products);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // const catName = useRecoilValue(CategoryNameForSelected);
  // const catID = useRecoilValue(CategoryNameForSelectedID);

  React.useEffect(() => {
    getAllProducts();
  }, []); // Depend on activelanguage

  // Initial states
  const [displayedProducts, setDisplayedProducts] = React.useState<any[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const productsPerPage = 10;

  React.useEffect(() => {
    if (selectedCategoryProducts.length) {
      setDisplayedProducts(selectedCategoryProducts.slice(0, productsPerPage));
    }
  }, [selectedCategoryProducts]);

  const loadMoreProducts = () => {
    if (displayedProducts.length >= selectedCategoryProducts.length) {
      setHasMore(false);
      return;
    }
    const nextProducts = selectedCategoryProducts.slice(
      displayedProducts.length,
      displayedProducts.length + productsPerPage
    );
    setDisplayedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
  };

  return (
    <div className="products-main">
      <span className="title">Məhsullar</span>
      <div className="container-product-main">
        {selectedCategoryProducts.length === 0 ? (
          <div className="no-content-msg">
            <p>Məhsul yoxdur.</p>
          </div>
        ) : isLoading ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={displayedProducts.length}
            next={loadMoreProducts}
            hasMore={hasMore}
            loader={<p>Loading...</p>} endMessage>
            <ProductCard
              priceMinMaxData={priceMinMaxData}
              selectedCategoryProducts={displayedProducts}
              priceAscData={priceAscData}
              otherFilterData={otherFilterData}
            />
          </InfiniteScroll>
        )}
        {hasMore && <p style={{ margin: "1rem 0.5rem" }}>Bir neçə saniyə gözləyin...</p>}
      </div>
    </div>
  );
};

export default ProductsMain;
