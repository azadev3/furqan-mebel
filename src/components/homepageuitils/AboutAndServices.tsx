import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useRecoilValue } from "recoil";
import Loader from "../../uitils/Loader";
import { useTranslations } from "../../TranslateContext";

interface Abouts {
  id: number;
  content: string;
  img: string;
}

interface Services {
  id: number;
  title: string;
  content: string;
  img: string;
}

const AboutAndServices: React.FC = () => {
  //Fetch About data
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const { data: AboutMainData } = useQuery({
    queryKey: ["aboutMainDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/main_about`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.main_about;
    },
    staleTime: 1000000,
  });

  //Fetch services data
  const { data: ServicesData } = useQuery({
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

  return (
    <div className="about-and-services-wrapper">
      <div className="about-and-services">
        <h1>{translations["xidmetler_ve_haqqimizda"]}</h1>

        <div className="grid-aboutservices">
          <div className="about-services">
            {ServicesData && ServicesData?.length > 0
              ? ServicesData.map((item: Services, index: number) => (
                  <Link to="/about" style={{ textDecoration: "none" }} key={item.id} className="about-service-item">
                    <img
                      style={{ borderRadius: "100px" }}
                      src={item.img ? item.img : ""}
                      width="633"
                      height="633"
                      alt={`${index}-img`}
                    />
                    <div className="titles">
                      <h2>{item?.title}</h2>
                      <p>{item?.content}</p>
                    </div>
                    <div className="rightarrow">
                      <img src="../send.svg" alt="send" />
                    </div>
                  </Link>
                ))
              : ""}
          </div>

          <div className="right-area">
            {AboutMainData && AboutMainData?.length > 0 ? (
              AboutMainData.map((item: Abouts) => (
                <div key={item.id} className="right-area-item">
                  <div className="toping">
                    {item.img && <img src={item.img} alt="Right Area" />}
                    <p>{item.content}</p>
                  </div>
                  <div className="btn-area">
                    <Link to="">
                      <span>Daha çox</span>
                      <img src="../linearrowgreen.svg" alt="" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAndServices;
