import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { ProductsInterface } from "../homepageuitils/PopularProducts";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useAddFavourite } from "../../useAddFavourite";

const SimiliarProducts: React.FC = () => {

  const { addFavourite, favouriteItems } = useAddFavourite();

  const navigate = useNavigate();

  const goInnerProductPage = (slug: string) => {
    navigate(`/products/${slug.toLowerCase()}`);
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

  return (
    <div className="similiar-products">
      <h1>Bənzər məhsullar</h1>

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
            ? allProductsData.map((item: ProductsInterface) => (
                <SwiperSlide key={item.id} onClick={() => goInnerProductPage(item?.slug)}>
                  <img className="shop-bag" src="../shopbag.svg" alt="show" title="Səbət" />
                  <div
                    className="add-favourites"
                    onClick={(e) => {
                      addFavourite(
                        {
                          title: item?.title,
                          price: item?.price,
                          discounted_price: item?.discounted_price,
                          content: item?.content,
                          id: item?.id,
                          img: item?.img,
                          images: item?.images,
                          is_favorite: item?.is_favorite,
                          is_in_cart: item?.is_in_cart,
                          is_popular: item?.is_popular,
                          is_stock: item?.is_stock,
                          parent_category_id: item?.parent_category_id,
                          slug: item?.slug,
                          modules: item?.modules,
                          options: item?.options,
                          category_name: item?.category_name,
                        },
                        e,
                        item?.id
                      );
                    }}>
                    {favouriteItems[item?.id] ? (
                      <IoMdHeart className="fav-icon-fill" />
                    ) : (
                      <CiHeart className="fav-icon" />
                    )}
                  </div>

                  <div className="product-image">
                    <img src={item?.img} alt={`${item.id}-image`} title={item?.title} />
                  </div>
                  <div className="item-details">
                    <span className="category-name">{item?.category_name}</span>
                    <span className="product-name">{item?.title}</span>
                    <div className="prices">
                      <span>{item?.price} AZN</span>
                      {item.discounted_price ? (
                        <article className="discountprice">{item?.discounted_price} AZN</article>
                      ) : (
                        ""
                      )}
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
