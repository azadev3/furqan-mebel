import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import Loader from "../uitils/Loader";
import { useTranslations } from "../TranslateContext";

export type OfficeImages = {
  id: number;
  image: string;
};

interface Locations {
  id: number;
  branch_name: string;
  branch_address: string;
  office_images: OfficeImages[];
}

const StorePage: React.FC = () => {
  const activelanguage = useRecoilValue(SelectedLanguageState);
  const { data: contactItemsData } = useQuery<Locations[]>({
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

  const [selectedLocation, setSelectedLocation] = React.useState<string>("");

  const handleSelectLocation = (branch_address: string) => {
    setSelectedLocation(branch_address);
  };

  const { translations } = useTranslations();


  // Seçilen konumun resimlerini filtreleme
  const selectedLocationImages = contactItemsData?.find(
    (item) => item.branch_address === selectedLocation
  )?.office_images;


  return (
    <div className="store-page-wrapper">
      <div className="store-page">
        <NavigationShower prevpage={translations["magazalar"]} />
        <div className="map-and-locations">
          <div className="locations">
            {contactItemsData && contactItemsData.length > 0 ? (
              contactItemsData.map((item: Locations, i: number) => (
                <span
                  onClick={() => handleSelectLocation(item.branch_address)}
                  key={i}
                  className={`link-location ${selectedLocation === item.branch_address ? "activelocation" : ""}`}
                >
                  <span>{item.branch_name}</span>
                  <div className="logo-and-location">
                    <img src="../locationicon.svg" alt="location" title={item.branch_address} />
                    <p>{item.branch_address}</p>
                  </div>
                </span>
              ))
            ) : (
              <Loader />
            )}
          </div>
          <div className="wrappered-img">
            {selectedLocationImages && selectedLocationImages.length > 0 ? (
              selectedLocationImages.map((imgs: OfficeImages) => (
                <img
                  key={imgs.id}
                  src={imgs.image}
                  alt={`location-${selectedLocation}`}
                  title={selectedLocation}
                  loading="lazy"
                />
              ))
            ) : (
              <p>Hələ ki, şəkil yoxdur.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
