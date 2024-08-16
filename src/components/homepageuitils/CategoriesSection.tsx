import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { CategoriesInterface } from "./PopularProducts";
import { useNavigate } from "react-router-dom";
import { selectedCategoryStateProductPage } from "../../recoil/Atoms";
import { useTranslations } from "../../TranslateContext";


const CategoriesSection: React.FC = () => {

  // FETCH CATEGORIES
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: CategoryProductsData } = useQuery({
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

  const navigate = useNavigate();

  
  // redirect subitem according to selected category 
  const [__, setCategoryTitle] = useRecoilState(selectedCategoryStateProductPage);
  const handleSelectedCategory = (categoryId: number | null) => {
    navigate("/products");
    setCategoryTitle(categoryId);
  }

  const { translations } = useTranslations();

  return (
    <section className="categories-wrapper">
      <div className="categories">
        <h1>{translations['kategoriyalar']}</h1>

        <div className="grid-categories-section">
          <Swiper
            spaceBetween={24}
            breakpoints={{
              268: {
                slidesPerView: 1.5,
                spaceBetween: 12,
              },
              568: {
                slidesPerView: 4.3,
              },
              968: {
                slidesPerView: 6,
              },
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper">
            {CategoryProductsData && CategoryProductsData?.length > 0 ? CategoryProductsData.map((category: CategoriesInterface) => (
              <SwiperSlide style={{cursor: "pointer"}}
              onClick={() => handleSelectedCategory(category?.id)}
              className="grid-item" key={category.id}>
                <img src={category.img ? category.img : "../imageforoffers.jpeg"} alt={category.title} />
                <h2>{category.title}</h2>
              </SwiperSlide>
            )) : <p>Kateqoriya tapılmadı.</p>}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
