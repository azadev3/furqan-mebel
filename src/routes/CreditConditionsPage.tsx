import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../api/Baseurl";
import axios from "axios";
import Loader from "../uitils/Loader";
import Error from "../uitils/Error";
import { useTranslations } from "../TranslateContext";
import { Helmet } from "react-helmet";
import { useSeo } from "../useSeo";

interface CreditConditions {
  id: number;
  title: string;
  content: string;
}

const CreditConditionsPage: React.FC = () => {
  //fetch credits
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const {
    data: CreditConditionsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["creditConditionsDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/credits`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.credits;
    },
    staleTime: 1000000,
  });
  const { translations } = useTranslations();

  const seoData = useSeo("credit_page");

  return (
    <div className="credit-conditions-page-wrapper">
      <Helmet>
        <title>{seoData?.title || "Furqan Mebel | Kredit"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
      </Helmet>
      <div className="credit-conditions-page">
        <NavigationShower prevpage={translations["kredit_sertleri"]} />

        <div className="credit-condition-container">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Error />
          ) : (
            <React.Fragment>
              {CreditConditionsData &&
                CreditConditionsData.map((conditions: CreditConditions) => (
                  <div key={uuidv4()} className="condition-item">
                    <span>{conditions?.title}</span>
                    <span>{conditions?.content}</span>
                  </div>
                ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditConditionsPage;
