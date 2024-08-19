import React from "react";
import { CatProductType } from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import "../styles/productcard.scss";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { addFavouriteFunctionStorage } from "./AddFavourite/AddFavouriteStorageFunction";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserIsAuthState } from "../recoil/Atoms";
import { addFavouriteFunction } from "./AddFavourite/AddFavouriteFunction";
import getCookie from "../getCookie";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";

type props = {
  selectedCategoryProducts: CatProductType[];
};

const ProductCard: React.FC<props> = ({ selectedCategoryProducts }) => {

  const isAuth = useRecoilValue(UserIsAuthState);
  const token = getCookie("accessToken");
  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const [added, setAdded] = React.useState<{ [key: number]: boolean }>({});

  // GIVE FAV ITEMS ON LS THE COMPONENT RENDERED
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem("favourites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (!Array.isArray(parsedFavorites)) {
          throw new Error("Parsed favorites is not an array");
        }

        const favoritesMap = parsedFavorites.reduce((acc: { [key: number]: boolean }, product: CatProductType) => {
          acc[product.id] = true;
          return acc;
        }, {});
        setAdded(favoritesMap);
      } catch (error) {
        console.error("LocalStorage Error:", error);
        setAdded({});
      }
    }
  }, []);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      {selectedCategoryProducts && selectedCategoryProducts?.length > 0
        ? selectedCategoryProducts?.map((product: CatProductType) => (
            <section
              className="product-card"
              key={product?.id}>
              <div className="product-image-wrapper">
                <div
                  className="add-fav-icon"
                  onClick={() => {
                    setAdded((prev) => ({
                      ...prev,
                      [product?.id]: !prev[product?.id],
                    }));
                    if(isAuth && token) {
                      addFavouriteFunction(product?.id, selectedCategoryProducts, selectedLanguage, token);
                    } else {
                      addFavouriteFunctionStorage(product);
                    }
                  }}>
                  {added[product?.id] ? <FaHeart className="iconadded" /> : <CiHeart className="icon" />}
                </div>
                <img src={product?.img} alt={`${product?.id}-image`} title={product?.title} />
                {product?.is_new && (
                  <div className="new-product-flag">
                    <span>yeni</span>
                  </div>
                )}
                {product?.discounted_price && (
                  <div className="product-discounted-percentage-flag">
                    <span>{product?.discounted_price.split(".00").join("%")}</span>
                  </div>
                )}
              </div>
              <article className="product-description"
              onClick={() => {
                navigate(`/products/${product?.slug}`);
              }}
              >
                <div className="top">
                  <span className="category-name">{product?.category_name}</span>
                  <h3 className="product-name">{product?.title}</h3>
                  {product?.is_stock ? (
                    <strong className="isStock">Stokda var</strong>
                  ) : (
                    <strong className="noStock">Stokda yoxdur</strong>
                  )}
                </div>

                <div className="prices">
                  <span className="price">{product?.price}</span>
                  <span className="discountprice">{product?.discounted_price}</span>
                </div>
              </article>
            </section>
          ))
        : "Məhsul yoxdur."}
    </React.Fragment>
  );
};

export default ProductCard;
