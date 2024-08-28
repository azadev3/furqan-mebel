import axios from "axios";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./components/header/SelectedLanguage";

export interface SeoData {
  id: number;
  seo_description: string;
  seo_keywords: string;
  seo_title: string;
  title: string;
  type: string;
}

export const useSeo = (pageType: string) => {
  const [seoData, setSeoData] = React.useState<SeoData | null>(null);

  const lang = useRecoilValue(SelectedLanguageState);

  const fetchSeoData = async () => {
    try {
      const response = await axios.get("https://admin.furqanmebel.az/api/seo", {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        const pageSeoData = response.data?.seo?.find((item: SeoData) => item.type === pageType);
        setSeoData(pageSeoData || null);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchSeoData();
  }, [lang, pageType]);

  return seoData;
};
