import React from "react";
import { CatProductType } from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import "../styles/productcard.scss";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "../TranslateContext";

type props = {
  favProduct: CatProductType[];
};

const FavProductCard: React.FC<props> = ({ favProduct }) => {

  const { translations } = useTranslations();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {favProduct && favProduct?.length > 0
        ? favProduct?.map((favproduct: CatProductType) => (
            <section className="fav-product-card" key={favproduct?.id}>
              <div className="product-image-wrapper">
                <div style={{ pointerEvents: "none" }} className="add-fav-icon">
                  <FaHeart className="iconadded" />
                </div>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/product_single/${favproduct?.slug}`);
                  }}
                  src={favproduct?.img}
                  alt={`${favproduct?.id}-image`}
                  title={favproduct?.title}
                />
                {favproduct?.is_new && (
                  <div className="new-product-flag">
                    <span>{translations['yeni_title']}</span>
                  </div>
                )}
                {favproduct?.discounted_price && (
                  <div className="product-discounted-percentage-flag">
                    <span>{favproduct?.discounted_price.split(".00").join("%")}</span>
                  </div>
                )}
              </div>
              <article
                className="product-description"
                onClick={() => {
                  navigate(`/product_single/${favproduct?.slug}`);
                }}>
                <div className="top">
                  <span className="category-name">{favproduct?.category_name}</span>
                  <h3 className="product-name">{favproduct?.title}</h3>
                </div>

                <div className="prices">
                  <span className="price">
                    {favproduct.discounted_price ? `${favproduct.discounted_price} AZN` : `${favproduct.price} AZN`}
                  </span>
                  {favproduct.discounted_price && <span className="discountprice">{favproduct.price} AZN</span>}
                </div>
              </article>
            </section>
          ))
        : "Məhsul yoxdur."}
    </React.Fragment>
  );
};

export default FavProductCard;
