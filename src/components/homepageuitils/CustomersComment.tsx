import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { useTranslations } from "../../TranslateContext";

interface Testimonials {
  id: number;
  title: string;
  position: string;
  content: string;
  img: string;
  bg_img: string;
}

const CustomersComment: React.FC = () => {

  // fetch customers comments
  const activelanguage = useRecoilValue(SelectedLanguageState);

  const { data: TestimonialsData } = useQuery({
    queryKey: ["testimonialsDataKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/testimonials`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.testimonials;
    },
    staleTime: 1000000,
  });

  //use prev and next button on custom swiper
  const swiperRef = React.useRef<any>(null);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const { translations } = useTranslations(); 

  return (
    <div className="customer-comment-wrapper">
      <div className="customer-comment-wrapper">
        <div className="toptitle">
          <h1>{translations['musteri_reyleri']}</h1>
          <div className="buttons">
            <button className="swiper-button-wprev" onClick={handlePrevClick}>
              <FaArrowLeft className="left" />
            </button>
            <button className="swiper-button-wnext" onClick={handleNextClick}>
              <FaArrowRight className="right" style={{ color: "#43B749" }} />
            </button>
          </div>
        </div>

        <div className="carousel-area">
          <Swiper
            navigation={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              268: {
                slidesPerView: 1.2,
                spaceBetween: 12,
              },
              568: {
                slidesPerView: 2.2,
              },
              968: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={24}
            className="mySwiper">
            {TestimonialsData && TestimonialsData?.length > 0
              ? TestimonialsData.map((item: Testimonials) => (
                  <SwiperSlide key={item.id}>
                    <img src={item?.bg_img} alt="image" title={item?.title} />

                    <div className="content">
                      <div className="userprofile">
                        <img src={item?.img} alt={`${item.id}-profile`} title={item?.title} />
                      </div>
                      <strong>{item?.title}</strong>
                      <span>{item?.position}</span>
                      <p>{item?.content.slice(0, 100)}</p>
                    </div>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CustomersComment;
