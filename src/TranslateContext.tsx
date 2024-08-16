import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./components/header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "./api/Baseurl";
import Loader from "./uitils/Loader";

type TranslateContextType = {
  translations: Record<string, string>;
};

type Props = {
  children: React.ReactNode;
};

const TranslateContext = createContext<TranslateContextType | undefined>(undefined);

export const TranslateContextProvider: React.FC<Props> = ({ children }) => {
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: words, isLoading, isError } = useQuery<Record<string, string>>({
    queryKey: ['wordsdata', selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/translates`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      if (typeof response.data === 'object' && response.data !== null) {
        return response.data;
      } else {
        console.error('Unexpected data format:', response.data);
        return {};
      }
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading translations</p>;

  const translations = words || {};

  return (
    <TranslateContext.Provider value={{ translations }}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(TranslateContext);
  if (context === undefined) {
    throw new Error("useTranslations must be used within a TranslateContextProvider");
  }
  return context;
};
