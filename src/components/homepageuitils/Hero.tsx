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
import { useTranslations } from "../../TranslateContext";

type HeroDataType = {
  id: string;
  title: string;
  content: string;
  video: string;
  image: string,
  is_image: boolean,
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


  return (
    <div className="hero-wrapper">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <React.Fragment>
          {HeroData && HeroData.length > 0 ? (
            <Swiper pagination={{ dynamicBullets: true, clickable: true }} modules={[Pagination]} className="mySwiper">
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
        </React.Fragment>
      )}
    </div>
  );
};

export default Hero;
