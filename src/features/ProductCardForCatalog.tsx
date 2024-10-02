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
import Loader from "../uitils/Loader";

type Props = {
  selectedCategoryProducts: CatProductType[];
  priceAscData: CatProductType[];
  priceMinMaxData: CatProductType[];
  otherFilterData: CatProductType[];
};

const ProductCardForCatalog: React.FC<Props> = ({ selectedCategoryProducts }) => {
  const isAuth = useRecoilValue(UserIsAuthState);
  const token = getCookie("accessToken");
  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const [added, setAdded] = React.useState<{ [key: number]: boolean }>({});

  // GIVE FAV ITEMS ON LS WHEN THE COMPONENT RENDERS
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

  const handleFavouriteClick = (data: CatProductType) => {
    setAdded((prev) => ({
      ...prev,
      [data.id]: !prev[data.id],
    }));

    if (isAuth && token) {
      addFavouriteFunction(data.id, selectedCategoryProducts, selectedLanguage, token);
    } else {
      addFavouriteFunctionStorage(data);
    }
  };

  const renderProducts = (data: CatProductType[]) => {
    return data?.length > 0 ? (
      data.map((data: CatProductType) => (
        <section className="product-card" key={data.id}>
          <div className="product-image-wrapper">
            <div className="add-fav-icon" onClick={() => handleFavouriteClick(data)}>
              {added[data.id] ? <FaHeart className="iconadded" /> : <CiHeart className="icon" />}
            </div>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/categories_product_single/${data?.slug}`);
              }}
              src={data.img}
              alt={`${data.id}-image`}
              title={data.title}
            />
            {data.is_new && (
              <div className="new-product-flag">
                <span>yeni</span>
              </div>
            )}
            {data.discounted_price && (
              <div className="product-discounted-percentage-flag">
                <span>{data?.discount_percent}%</span>
              </div>
            )}
          </div>
          <article
            className="product-description"
            onClick={() => navigate(`/categories_product_single/${data?.slug}`)}>
            <div className="top">
              <span className="category-name">{data.category_name}</span>
              <h3 className="product-name">{data.title}</h3>
              {data.is_stock ? (
                <strong className="isStock">Stokda var</strong>
              ) : (
                <strong className="noStock">Stokda yoxdur</strong>
              )}
            </div>
            <div className="prices">
              <span className="price">
                {data.discounted_price ? `${data.discounted_price} AZN` : `${data.price} AZN`}
              </span>
              {data.discounted_price && <span className="discountprice">{data.price} AZN</span>}
            </div>
          </article>
        </section>
      ))
    ) : (
      <Loader />
    );
  };

  return <>{renderProducts(selectedCategoryProducts)}</>;
};

export default ProductCardForCatalog;