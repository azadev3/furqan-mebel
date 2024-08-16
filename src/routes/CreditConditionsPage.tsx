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

  return (
    <div className="credit-conditions-page-wrapper">
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
