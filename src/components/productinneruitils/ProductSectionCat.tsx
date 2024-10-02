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

const ProductSectionCat: React.FC = () => {
  const { translations } = useTranslations();
  const { slugproductcategories } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: categoryProducts, refetch } = useQuery({
    queryKey: ["catProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/product_single/${slugproductcategories}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.product;
    },
    staleTime: 1000000,
  });

  React.useEffect(() => {
    refetch();
  }, [slugproductcategories]);
  const productInner =
    categoryProducts && categoryProducts.length > 0
      ? categoryProducts.find((item: CatProductType) => {
          return item?.slug === slugproductcategories;
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
          <strong className="price">{productInner?.price} AZN</strong>
          {productInner && productInner?.discounted_price ? (
            <span className="discountprice">{productInner?.discounted_price}</span>
          ) : (
            ""
          )}
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
          {isAdded === productInner?.id ? "Məhsul səbəttədir" : "Səbətə əlavə et"}
        </button>
      ) : (
        <p style={{ color: "red" }}>Stokda yoxdur</p>
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
                <p style={{ fontSize: "14px" }}>{(productInner?.price / sliderValue).toFixed(2)} azn</p>
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

export default ProductSectionCat;
