import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineArrowDownCircle } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import Loader from "../../uitils/Loader";
import Error from "../../uitils/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "../../TranslateContext";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

type HeroDataType = {
  id: string;
  title: string;
  content: string;
  video: string;
  image: string;
  is_image: boolean;
};

const Hero: React.FC = () => {
  const { translations } = useTranslations();
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const {
    data: HeroData,
    isLoading,
    isError,
  } = useQuery<HeroDataType[]>({
    queryKey: ["heroDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/hero`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.hero;
    },
    staleTime: 10000000,
  });

  const swiperRef = React.useRef<any>();

  const handlePrev = () => {
    swiperRef?.current && swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current && swiperRef.current.slideNext();
  };

  return (
    <div className="hero-wrapper">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <React.Fragment>
          {HeroData && HeroData.length > 0 ? (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              speed={3000}
              autoplay={{
                delay: 4000,
              }}
              pagination={{ dynamicBullets: true, clickable: true }}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper">
              {HeroData.map((item: HeroDataType) => (
                <SwiperSlide key={item.id}>
                  <div className="hero">
                    <div className="filter"></div>
                    {item?.is_image ? (
                      <img src={item?.image} alt={`${item?.id}-image`} title={item?.title} />
                    ) : (
                      <video loop muted autoPlay controls={false} src={item?.video}></video>
                    )}

                    <div className="content-texts">
                      <h1 className="text-main">{item?.title}</h1>
                      <p>{item?.content}</p>
                      <Link to="/products" className="button-explain">
                        <span>{translations["mehsullari_kesf_et"]}</span>
                        <FaArrowRightLong className="righticon" />
                      </Link>
                    </div>
                    <HiOutlineArrowDownCircle
                      className="arrow-down-circle"
                      onClick={() => window.scroll({ top: window.scrollY + 800, behavior: "smooth" })}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            ""
          )}
          <div className="buttons">
            <button onClick={handlePrev}>
              <GrFormPrevious className="icon" />
            </button>
            <button onClick={handleNext}>
              <GrFormNext className="icon" />
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Hero;
