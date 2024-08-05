import React, { SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../../../header/SelectedLanguage";
import { Baseurl } from "../../../../api/Baseurl";
import axios from "axios";
import { CategoriesInterface } from "../../../homepageuitils/PopularProducts";
import Loader from "../../../../uitils/Loader";
import Error from "../../../../uitils/Error";

type Props = {
  handleSelect: (id: number | null) => void;
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<SetStateAction<number | null>>;
};

const Categories: React.FC<Props> = ({ handleSelect, selectedCategory }) => {
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  // FETCH CATEGORIES
  const { data: CategoryProductsData, error, isLoading } = useQuery({
    queryKey: ["categoryProductsKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/categories`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.categories;
    },
    staleTime: 1000000,
  });

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="categories">
      <Swiper
        breakpoints={{
          268: {
            slidesPerView: 2.6,
            spaceBetween: 12,
          },
          568: {
            slidesPerView: 2.3,
          },
          968: {
            slidesPerView: 6.4,
          },
        }}
        spaceBetween={14}
        slidesPerView={6.6}
        className="mySwiper"
      >
        {CategoryProductsData && CategoryProductsData.length > 0 ? (
          CategoryProductsData.map((item: CategoriesInterface) => (
            <SwiperSlide
              className={selectedCategory === item.id ? "actived" : ""}
              key={item.id}
              onClick={() => handleSelect(item.id)}
            >
              <span>{item.title}</span>
            </SwiperSlide>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </Swiper>
    </div>
  );
};

export default Categories;
