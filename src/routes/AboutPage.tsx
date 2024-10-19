import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import Loader from "../uitils/Loader";
import { useTranslations } from "../TranslateContext";
import { Services } from "../components/homepageuitils/AboutAndServices";
import { Helmet } from "react-helmet";
import { useSeo } from "../useSeo";

type AboutType = {
  id: number;
  content: string;
  img: string;
};

const AboutPage: React.FC = () => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: mainAbout, isLoading } = useQuery<AboutType[]>({
    queryKey: ["mainAboutKey", selectedLang],
    queryFn: async () => {
      const response = await axios(`${Baseurl}/main_about`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      return response.data?.main_about;
    },
  });

  //Fetch services data
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: ServicesData } = useQuery<Services[]>({
    queryKey: ["servicesDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/services`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data.services;
    },
  });
  const { translations } = useTranslations();

  const hasServicesData = ServicesData && ServicesData?.length > 0;

  const seoData = useSeo("about_page");

  return (
    <div className="about-page-wrapper">
      <Helmet>
        <title>{seoData?.title || "Furqan Mebel | Haqqımızda"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
      </Helmet>
      <div className="about-page">
        <NavigationShower prevpage={translations['nav_haqqimizda']} />

        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {mainAbout && mainAbout.length > 0
              ? mainAbout?.map((item: AboutType) => (
                  <div className="about-content" key={item?.id}>
                    <div className="backg-image">
                      <img src={item?.img} alt={`${item?.img}`} />
                      <h1>{translations["nav_haqqimizda"]}</h1>
                    </div>
                    <div className="paragraphs">
                      <p>{item?.content}</p>
                    </div>
                  </div>
                ))
              : ""}
          </React.Fragment>
        )}

        <div className="services-us">
          <h2>{translations["xidmetlerimiz"]}</h2>
          <div className="grid-services">
            {hasServicesData &&
              ServicesData?.map((item: Services, index: number) => (
                <div className="item-service" key={item.id}>
                  <div className="icon">
                    <img
                      style={{ borderRadius: "100px" }}
                      width="633"
                      height="633"
                      src={item.img ? item.img : ""}
                      alt={`${index}-icon`}
                    />
                  </div>

                  <div className="titles-bottom">
                    <span>{item?.title}</span>
                    <p>{item?.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
