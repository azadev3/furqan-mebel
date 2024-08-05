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

// type SetModuleTypes = {
//   id: number;
//   price: string;
//   title: string;
//   discountPrice: string;
// };

const ProductSection: React.FC = () => {
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

  // const SetModuleItems: SetModuleTypes[] = [
  //   {
  //     id: 1,
  //     discountPrice: "20000000 AZN",
  //     price: "1240000 AZN",
  //     title: "Espero çarpayı bazasız",
  //   },
  //   {
  //     id: 2,
  //     discountPrice: "20000000 AZN",
  //     price: "1240000 AZN",
  //     title: "Espero çarpayı bazasız",
  //   },
  //   {
  //     id: 3,
  //     discountPrice: "20000000 AZN",
  //     price: "1240000 AZN",
  //     title: "Espero çarpayı bazasız",
  //   },
  //   {
  //     id: 4,
  //     discountPrice: "20000000 AZN",
  //     price: "1240000 AZN",
  //     title: "Espero çarpayı bazasız",
  //   },
  // ];

  // //counter for modules
  // const [count, setCount] = React.useState<{ [key: string]: number }>({ 0: 0 });
  // const modulesCounterIncrementFunction = (id: string) => {
  //   setCount((prevCount) => ({
  //     ...prevCount,
  //     [id]: (prevCount[id] ?? 0) + 1,
  //   }));
  // };
  // const modulesCounterDecrementFunction = (id: string) => {
  //   setCount((prevCount) => ({
  //     ...prevCount,
  //     [id]: Math.max((prevCount[id] ?? 0) - 1, 0),
  //   }));
  // };

  const countSaleCount = (price: string, discounted_price: string) => {
    const totalPrice = parseFloat(price);
    const discountPrice = parseFloat(discounted_price);

    if (!isNaN(totalPrice) && !isNaN(discountPrice)) {
      const discountCount = totalPrice - discountPrice;
      const discountPercentage = (discountCount / totalPrice) * 100;
      return discountPercentage;
    }
  };

  const sliderValue = useRecoilValue(SliderValue);
  return (
    <section className="product-section">
      <div className="details-section">
        <p>Masa və stullar</p>
        <div className="title-and-description">
          <h2>{productInner?.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productInner?.content) }} />
        </div>
      </div>

      <div className="quantity-and-dimensions">
        <div className="sale">
          <strong className="price">{productInner?.price} AZN</strong>
          {productInner.discounted_price ? <span className="discountprice">{productInner?.discounted_price}</span> : ""}
          {productInner.discounted_price ? (
            <span className="sale-count">
              {countSaleCount(`${productInner?.price}`, `${productInner?.discounted_price}`)} sale!
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="credit-terms">
        <h4>Kredit şərtləri</h4>

        <div className="terms-wrapper">
          <div className="top-container">
            <div className="left-ranger">
              <SliderSizes />
            </div>
            <div className="comission">
              <span>Komissiya haqqı</span>
              <p>azn</p>
            </div>
            <div className="monthly-payment">
              <span>Aylıq ödəniş</span>
              <p style={{ fontSize: "16px" }}>{(productInner?.price / sliderValue).toFixed(2)} azn</p>
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
        <h3>Dəstə daxil olan modullar</h3>
        <div className="grid-modules">
          {allProductsData && allProductsData.length > 0 ? (
            allProductsData.map(
              (item: ProductsInterface) =>
                item.modules &&
                item.modules.map((modules: ModulesProducts, i: number) => (
                  <div className="item-module" key={i}>
                    <p>{modules?.title}</p>
                    {/* <div className="counter-area">
                <button className="decrement" onClick={() => modulesCounterDecrementFunction(item?.id.toString())}>
                  -
                </button>
                <span className="count">{count[item?.id] || 1}</span>
                <button className="increment" onClick={() => modulesCounterIncrementFunction(item?.id.toString())}>
                  +
                </button>
              </div> */}

                    <div className="prices">
                      <strong>{item?.price} AZN</strong>
                      {/* <span>discountprice</span> */}
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
