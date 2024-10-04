import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { useTranslations } from "../../TranslateContext";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";

const SimiliarProducts: React.FC = () => {
  const navigate = useNavigate();

  const goInnerProductPage = (slug: string) => {
    navigate(`/product_single/${slug.toLowerCase()}`);
  };

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

  const { translations } = useTranslations();

  return (
    <div className="similiar-products">
      <h2
        style={{
          color: "#000000",
          fontWeight: "400",
          fontSize: "60px",
        }}>
        {translations["benzer_mehsullar"]}
      </h2>

      <div className="carouselsimiliar-products">
        <Swiper
          className="mySwiper"
          spaceBetween={25}
          breakpoints={{
            268: {
              slidesPerView: 1.3,
            },
            468: {
              slidesPerView: 2.3,
            },
            568: {
              slidesPerView: 3.5,
            },
            768: {
              slidesPerView: 4.3,
            },
          }}>
          {allProductsData && allProductsData?.length > 0
            ? allProductsData.map((item: CatProductType) => (
                <SwiperSlide key={item.id} onClick={() => goInnerProductPage(item?.slug)}>
                  <img className="shop-bag" src="../shopbag.svg" alt="show" title="Səbət" />
                  <div className="product-image">
                    <img src={item?.img} alt={`${item.id}-image`} title={item?.title} />
                    {item.discounted_price && (
                      <div className="product-discounted-percentage-flag">
                        <span>{item?.discount_percent}%</span>
                      </div>
                    )}
                  </div>
                  <div className="item-details">
                    <span className="category-name">{item?.category_name}</span>
                    <h1 className="product-name">{item?.title}</h1>
                    <div className="prices">
                      <span className="price">
                        {item.discounted_price ? `${item.discounted_price} AZN` : `${item.price} AZN`}
                      </span>
                      {item.discounted_price && <span className="discountprice">{item.price} AZN</span>}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : ""}
        </Swiper>
      </div>
    </div>
  );
};

export default SimiliarProducts;
