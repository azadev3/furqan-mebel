import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { ModulesProducts, ProductsInterface } from "../homepageuitils/PopularProducts";
import DOMPurify from "dompurify";
import Loader from "../../uitils/Loader";
import SliderSizes, { SliderValue } from "../../SliderSizes";
import { useTranslations } from "../../TranslateContext";
import { UserIsAuthState } from "../../recoil/Atoms";
import getCookie from "../../getCookie";
import { addBasketFunction, addBasketFunctionStorage } from "../../features/AddBasket/AddBasket";

const ProductSection: React.FC = () => {
  const { translations } = useTranslations();
  const { slugproduct } = useParams();

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: allProductsData } = useQuery({
    queryKey: ["allProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/all_products`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.products;
    },
    staleTime: 1000000,
  });

  const productInner =
    allProductsData && allProductsData.length > 0
      ? allProductsData.find((item: ProductsInterface) => {
          return item?.slug.toLowerCase() === slugproduct?.toLowerCase();
        })
      : "";

  const sliderValue = useRecoilValue(SliderValue);
  const [isAdded, setIsAdded] = React.useState<number | null>(null);

  const isAuth = useRecoilValue(UserIsAuthState);
  const token = getCookie("accessToken");

  return (
    <section className="product-section">
      <div className="quantity-and-dimensions">
        <h2 style={{fontWeight: "500"}}>{productInner?.title}</h2>

        <div className="sale">
          <strong className="price">{productInner?.price} AZN</strong>
          {productInner && productInner?.discounted_price ? (
            <span className="discountprice">{productInner?.discounted_price}</span>
          ) : (
            ""
          )}
        </div>
      </div>

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
        {isAdded ? "Məhsul səbəttədir" : "Səbətə əlavə et"}
      </button>

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
        <h3>{translations["deste_daxil_modullar"]}</h3>
        <div className="grid-modules">
          {allProductsData && allProductsData.length > 0 ? (
            allProductsData.map(
              (item: ProductsInterface) =>
                item.modules &&
                item.modules.map((modules: ModulesProducts, i: number) => (
                  <div className="item-module" key={i}>
                    <p>{modules?.title}</p>
                    <div className="prices">
                      <strong>{modules?.price} AZN</strong>
                    </div>
                  </div>
                ))
            )
          ) : (
            <Loader />
          )}
        </div>
      </article>
    </section>
  );
};

export default ProductSection;
