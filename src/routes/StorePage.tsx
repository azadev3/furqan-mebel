import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import Loader from "../uitils/Loader";
import { useTranslations } from "../TranslateContext";
import { useSeo } from "../useSeo";
import { Helmet } from "react-helmet";

export type OfficeImages = {
  id: number;
  image: string;
};

interface Locations {
  id: number;
  branch_name: string;
  branch_address: string;
  office_images: OfficeImages[];
  phone: string;
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

  const selectedLocationImages = contactItemsData?.find(
    (item) => item.branch_address === selectedLocation
  )?.office_images;

  React.useEffect(() => {
    if (contactItemsData && contactItemsData.length > 0) {
      setSelectedLocation(contactItemsData[0].branch_address);
    }
  }, [contactItemsData]);
  const seoData = useSeo("stores_page");

  return (
    <div className="store-page-wrapper">
      <Helmet>
        <title>{seoData?.title || "Furqan Mebel"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
      </Helmet>
      <div className="store-page">
        <NavigationShower prevpage={translations["magazalar"]} />
        <div className="map-and-locations">
          <div className="locations">
            {contactItemsData && contactItemsData.length > 0 ? (
              contactItemsData.map((item: Locations, i: number) => (
                <span
                  onClick={() => handleSelectLocation(item.branch_address)}
                  key={i}
                  className={`link-location ${selectedLocation === item.branch_address ? "activelocation" : ""}`}>
                  <span>{item.branch_name}</span>
                  <div className="logo-and-location" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <img src="../locationicon.svg" alt="location" title={item.branch_address} />
                      <p>{item.branch_address}</p>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <img src="../mynaui_telephone.svg" alt="location" title={item.branch_address} />
                      <p>{item.phone}</p>
                    </div>
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
              <p>{translations['heleki_hecne_elave_olunmayib_paragraph']}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
