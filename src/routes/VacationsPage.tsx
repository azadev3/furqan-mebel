import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import Vacations from "../components/vacationpageuitils/Vacations";
import VacationContent from "../components/vacationpageuitils/VacationContent";
import { atom, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../api/Baseurl";
import axios from "axios";
import Loader from "../uitils/Loader";
import Error from "../uitils/Error";

export const selectedVacationState = atom<string>({
  key: "selectedVacationState",
  default: "",
});

export type VacationDetailsItemType = {
  id: number;
  description: string;
  slug: string;
};

export type VacationsType = {
  id: number;
  vac_name: string;
  vac_filial: string;
  vac_description: string;
  slug: string;
};

export const VacationsItem: VacationsType[] = [
  {
    id: 1,
    vac_name: "İnteryer dizayner",
    vac_filial: "Nərimanov filialı",
    slug: "interyer",
    vac_description: "Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
  },
  {
    id: 2,
    vac_name: "Qrafik dizayner",
    vac_filial: "Nərimanov filialı",
    slug: "qrafik",

    vac_description: "Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
  },
  {
    id: 3,
    vac_name: "Data Analitik",
    vac_filial: "Nərimanov filialı",
    slug: "data",

    vac_description: "Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
  },
  {
    id: 4,
    vac_name: "Full Stack Proqramçı",
    vac_filial: "Nərimanov filialı",
    slug: "fullstack",

    vac_description: "Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
  },
  {
    id: 5,
    vac_name: "Backend Proqramçı",
    vac_filial: "Nərimanov filialı",
    slug: "backend",

    vac_description: "Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
  },
];

export const VacationDescriptionItem: VacationDetailsItemType[] = [
  {
    id: 1,
    description:
      "INTERYER DIZAYNER Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
    slug: "interyer",
  },
  {
    id: 2,
    description:
      "QRAFIK DIZAYNER Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
    slug: "qrafik",
  },
  {
    id: 3,
    description:
      "DATA ANALITIK Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
    slug: "data",
  },
  {
    id: 4,
    description:
      "FullSTACK Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
    slug: "fullstack",
  },
  {
    id: 5,
    description:
      "BACKEND Lorem ipsum dolor sit amet consectetur. Nisi auctor ornare tellus mattis blandit bibendum quam.",
    slug: "backend",
  },
];

export interface VacationsTypes {
  id: number,
  title: string,
  branch: string,
  description: string,
  requirement: string,
  email: string,
  phone: string,
  slug: string,
}

const VacationsPage: React.FC = () => {

  // FETCH VACATIONS
  const activelanguage = useRecoilValue(SelectedLanguageState);
  const {
    data: VacationsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vacationsDataKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/vacancies`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.vacancies;
    },
    staleTime: 1000000,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="vacations-page-wrapper">
      <div className="vacations-page">
        <NavigationShower prevpage="Vakansiyalar" />
        <div className="container-vacations">
          <div className="left-vacations">
            <Vacations data={VacationsData}/>
          </div>
          <div className="right-vacation-content">
            <VacationContent data={VacationsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationsPage;
