import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import Loader from "../uitils/Loader";
import DOMPurify from "dompurify";
import { useTranslations } from "../TranslateContext";
interface Locations {
  id: number;
  branch_name: string;
  branch_address: string;
  map: string;
}

const StorePage: React.FC = () => {
  // fetch locations and here's map
  const activelanguage = useRecoilValue(SelectedLanguageState);
  const { data: contactItemsData } = useQuery({
    queryKey: ["contactitemsKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/branches`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.branches;
    },
    staleTime: 1000000,
  });

  //select location
  const [selectedLocation, setSelectedLocation] = React.useState<string | "">("");
  const handleSelectLocation = (branch_address: string) => {
    setSelectedLocation(branch_address);
  };

  const { translations } = useTranslations();

  return (
    <div className="store-page-wrapper">
      <div className="store-page">
        <NavigationShower prevpage={translations['magazalar']} />
        <div className="map-and-locations">
          {contactItemsData &&
            contactItemsData.length > 0 &&
            contactItemsData.map((item: Locations, i: number) => {
              if (selectedLocation === item?.branch_address) {
                return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.map) }} key={i} />;
              } else {
                return (
                  <iframe
                    key={i}
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30631.717530392623!2d49.916293841299456!3d40.38555492936063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2saz!4v1721127095294!5m2!1str!2saz"
                    width="600"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                );
              }
            })}
          <div className="locations">
            {contactItemsData && contactItemsData.length > 0 ? (
              contactItemsData.map((item: Locations, i: number) => (
                <span
                  onClick={() => handleSelectLocation(item?.branch_address)}
                  key={i}
                  className={`link-location ${selectedLocation === item?.branch_address ? "activelocation" : ""}`}>
                  <span>{item?.branch_name}</span>
                  <div className="logo-and-location">
                    <img src="../locationicon.svg" alt="location" title={item?.branch_address} />
                    <p>{item?.branch_address}</p>
                  </div>
                </span>
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

export default StorePage;
