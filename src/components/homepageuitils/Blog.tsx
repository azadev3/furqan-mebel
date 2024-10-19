import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import Error from "../../uitils/Error";
import { useTranslations } from "../../TranslateContext";

export type BlogItemType = {
  id: number | string;
  image: string;
  author: string;
  time: string;
  category: string;
  blogtitle: string;
  blogdescription: string;
  meta_title?: string | null,
  meta_description?: string | null,
  meta_keywords?: string | null,
  slug?: string;
};

export interface BlogsType {
  id: string;
  title: string;
  content: string;
  img: string;
  created_at: string;
  meta_title?: any,
  meta_description?: any,
  meta_keywords?: any,
  slug: string;
}

const Blog: React.FC = () => {

  const activeLanguage = useRecoilValue(SelectedLanguageState);

  //Fetch blogs
  const { data: BlogData } = useQuery({
    queryKey: ["blogDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/blogs`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      console.log(BlogData, "blogs");
      return response.data?.blogs;
    },
    staleTime: 1000000,
  });

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
    <div className="blog-section-wrapper">
      <div className="blog-section">
        <div className="toptitle-blogsection">
          <h1>{translations['nav_blog']}</h1>

          <div className="buttons">
            <button className="swiper-button-wprev" onClick={handlePrevClick}>
              <FaArrowLeft className="left" />
            </button>
            <button className="swiper-button-wnext" onClick={handleNextClick}>
              <FaArrowRight className="right" style={{ color: "#43B749" }} />
            </button>
          </div>
        </div>

        <div className="carousel-container">
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
                slidesPerView: 2.3,
              },
              968: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={24}
            className="mySwiper">
            {BlogData && BlogData.length > 0 ? (
              BlogData.map((item: BlogsType) => (
                <SwiperSlide key={item?.id}>
                  <div className="blogimage">
                    <img src={item?.img} alt={`${item?.id}-image`} title={item?.title} />
                  </div>
                  <div className="title-top">
                    <strong>{translations['blog_ve_yenilikler_title']}</strong>
                    <span>{item?.created_at}</span>
                  </div>
                  <div className="bottom-title">
                    <h1>{item?.title}</h1>
                    <div className="content" dangerouslySetInnerHTML={{ __html: item?.content?.slice(0, 300) }} />
                    <Link to={`/blog/${item?.slug?.toLowerCase()}`} className="formore-button">
                      <span>{translations['daha_cox_title']}</span>
                      <img src="../linearrowgreen.svg" alt="arrowright" title="Go to blogs" />
                    </Link>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <Error />
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Blog;
