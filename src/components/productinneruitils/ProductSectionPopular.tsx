import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { ModulesProducts } from "../homepageuitils/PopularProducts";
import DOMPurify from "dompurify";
import SliderSizes, { SliderValue } from "../../SliderSizes";
import { useTranslations } from "../../TranslateContext";
import { IsAddedState, UserIsAuthState } from "../../recoil/Atoms";
import getCookie from "../../getCookie";
import { addBasketFunction, addBasketFunctionStorage } from "../../features/AddBasket/AddBasket";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";

const ProductSectionPopular: React.FC = () => {
  const { translations } = useTranslations();
  const { slugproductpopular } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: popularProducts } = useQuery({
    queryKey: ["popularProductsKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/popular_products`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.popular_products;
    },
    staleTime: 1000000,
  });

  const productInner =
    popularProducts && popularProducts.length > 0
      ? popularProducts.find((item: CatProductType) => {
          return item?.slug === slugproductpopular?.toLowerCase();
        })
      : "";

  const sliderValue = useRecoilValue(SliderValue);
  const [isAdded, setIsAdded] = useRecoilState(IsAddedState);

  const isAuth = useRecoilValue(UserIsAuthState);
  const token = getCookie("accessToken");

  return (
    <section className="product-section">
      <div className="quantity-and-dimensions">
        <h1 style={{ fontWeight: "500" }}>{productInner?.title}</h1>

        <div className="sale">
          <span className="price">
            {productInner?.discounted_price ? `${productInner?.discounted_price} AZN` : `${productInner?.price} AZN`}
          </span>
          {productInner?.discounted_price && <span className="discountprice">{productInner?.price} AZN</span>}
        </div>
      </div>

      {productInner && productInner?.is_stock ? (
        <button
          className={isAdded === productInner?.id ? "remove-basket" : "add-basket"}
          onClick={() => {
            if (isAuth && token) {
              addBasketFunction(productInner?.id, productInner, activeLanguage, token);
              setIsAdded(productInner?.id);
            } else {
              addBasketFunctionStorage(productInner);
              setIsAdded(productInner?.id);
            }
          }}>
          {isAdded === productInner?.id ? translations["mehsul_sebette"] : translations["sebete_elave_et"]}
        </button>
      ) : (
        <p style={{ color: "red" }}>{translations["stokda_yoxdur_key"]}</p>
      )}

      <div className="details-section">
        <p>{(productInner && productInner?.category_name) || ""}</p>
        <div className="title-and-description">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productInner?.content) }} />
        </div>
      </div>

      <div className="credit-terms">
        <h4>{translations["kredit_sertleri"]}</h4>

        <div className="terms-wrapper">
          <div className="top-container">
            <div className="left-ranger">
              <SliderSizes />
            </div>
            <div className="payment-info">
              <div className="comission">
                <span>{translations["komissiya_haqqi"]}</span>
                <p>azn</p>
              </div>
              <div className="monthly-payment">
                <span>{translations["ayliq_odenis"]}</span>
                <p style={{ fontSize: "14px" }}>
                  {(() => {
                    let price = productInner?.price / sliderValue;
                    if (sliderValue === 3) {
                      price *= 1.085; // %8.5 added
                    } else if (sliderValue === 6) {
                      price *= 1.14; // %14 added
                    } else if (sliderValue === 9) {
                      price *= 1.195; // %19.5 added
                    } else if (sliderValue === 12) {
                      price *= 1.25; // %25 added
                    } else if (sliderValue === 15) {
                      price *= 1.3; // %30 added
                    } else if (sliderValue === 18) {
                      price *= 1.35; // %35 added
                    }
                    return `${price.toFixed(2)} azn`;
                  })()}
                </p>
              </div>
            </div>
          </div>
          <article className="title-bottom">
            <p>
              <span>*</span>Kampaniya şərtləri ilə bağlı aylıq ödəniş məbləği dəyişə bilər
            </p>
          </article>
        </div>
      </div>

      <article className="set-modules">
        {productInner &&
          Array(productInner)?.map((item: CatProductType) => {
            if (item && item?.modules && item?.modules?.length > 0) {
              return <h3 key={item?.id}>{translations["deste_daxil_modullar"]}</h3>;
            } else {
              return "";
            }
          })}
        <div className="grid-modules">
          {productInner &&
            Array(productInner)?.map((item: CatProductType) =>
              item?.modules && item?.modules?.length > 0
                ? item?.modules?.map((modules: ModulesProducts) => (
                    <div className="item-module" key={modules?.id}>
                      <p>{modules?.title}</p>
                      <div className="prices">
                        <strong>{modules?.price} AZN</strong>
                      </div>
                    </div>
                  ))
                : ""
            )}
        </div>
      </article>
    </section>
  );
};

export default ProductSectionPopular;
