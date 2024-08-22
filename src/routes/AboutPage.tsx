import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import Loader from "../uitils/Loader";
import { useTranslations } from "../TranslateContext";

type AboutType = {
  id: number;
  content: string;
  img: string;
};

type ServiceType = {
  id: number;
  title: string;
  description: string;
  icon: string;
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

  const ServicesItems: ServiceType[] = [
    {
      id: 1,
      title: "2 il Qarantiya",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../certificate 1.svg",
    },

    {
      id: 2,
      title: "Sərfəli Qiymət",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../moneybag.svg",
    },

    {
      id: 3,
      title: "Pulsuz Çatdırılma",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../truck.svg",
    },

    {
      id: 4,
      title: "Lux Mebellər",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../arn.svg",
    },
  ];

  const { translations } = useTranslations();

  return (
    <div className="about-page-wrapper">
      <div className="about-page">
        <NavigationShower prevpage="Haqqımızda" />

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
            {ServicesItems.map((item: ServiceType, index: number) => (
              <div className="item-service" key={item.id}>
                <div className="icon">
                  <img
                    style={{ borderRadius: "100px" }}
                    width="633"
                    height="633"
                    src={item.icon ? item.icon : ""}
                    alt={`${index}-icon`}
                  />
                </div>

                <div className="titles-bottom">
                  <span>{item?.title}</span>
                  <p>{item?.description}</p>
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
