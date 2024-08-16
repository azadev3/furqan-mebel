import React from "react";
import { Link } from "react-router-dom";
import { BlogsType } from "../homepageuitils/Blog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useTranslations } from "../../TranslateContext";

const TopTwoCards: React.FC = () => {
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
      return response.data?.blogs;
    },
    staleTime: 1000000,
  });

  const { translations } = useTranslations();

  return (
    <div className="top-two-cards">
      <div className="left-card">
        {BlogData &&
          BlogData?.length > 0 &&
          BlogData.map((item: BlogsType, index: number) => {
            if (index === 0) {
              return (
                <Link to={`/blog/${item?.slug}`} key={item.id} className="cardone">
                  <div className="image-wrapper">
                    <img src={item?.img} alt={`${item.id}-image`} title={item?.title} />
                  </div>
                  <div className="descriptions">
                    <div className="top">
                      <span>{translations['blog_ve_yenilikler_title']}</span>
                      <span>{item?.created_at}</span>
                    </div>
                    <h1>{item?.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 300) }} />
                  </div>
                </Link>
              );
            }
          })}
      </div>

      <div className="right-card">
        {BlogData &&
          BlogData?.length > 0 &&
          BlogData.map((item: BlogsType, index: number) => {
            if (index === 1) {
              return (
                <Link to={`/blog/${item?.slug}`} key={item.id} className="cardone">
                  <div className="image-wrapper">
                    <img src={item?.img} alt={`${item.id}-image`} title={item?.title} />
                  </div>
                  <div className="descriptions">
                    <div className="top">
                      <span>{translations['blog_ve_yenilikler_title']}</span>
                      <span>{item?.created_at}</span>
                    </div>
                    <h1>{item?.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 300) }} />
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};

export default TopTwoCards;
