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
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type HeroDataType = {
  id: string;
  title: string;
  content: string;
  video: string;
};

const Hero: React.FC = () => {
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const {
    data: HeroData,
    isLoading: LoadingHeroData,
    isError: ErrorHeroData,
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
    staleTime: 1000000,
  });

  if (LoadingHeroData) {
    return <Loader />;
  }

  if (ErrorHeroData) {
    return <Error />;
  }

  return (
    <div className="hero-wrapper">
      {HeroData && HeroData.length > 0 && (
        <Swiper
          pagination={{ dynamicBullets: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {HeroData.map((item: HeroDataType) => (
            <SwiperSlide key={item.id}>
              <div className="hero">
                <div className="filter"></div>
                <video loop muted autoPlay controls={false} src={item?.video}></video>

                <div className="content-texts">
                  <h1 className="text-main">{item?.title}</h1>
                  <p>{item?.content}</p>
                  <Link to="/products" className="button-explain">
                    <span>Məhsulları kəşf et</span>
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
      )}
    </div>
  );
};

export default Hero;
