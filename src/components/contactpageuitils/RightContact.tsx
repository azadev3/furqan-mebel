import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import Loader from "../../uitils/Loader";

export type ContactItemsType = {
  id: number;
  title: string;
  value: string;
  icon: string;
  to: string;
};

const RightContact: React.FC = () => {
  //fetch contact items for contact page
  const activelanguage = useRecoilValue(SelectedLanguageState);
  const { data: contactItemsData } = useQuery({
    queryKey: ["contactitemsKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/contact_items`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.contact_items;
    },
    staleTime: 1000000,
  });

  return (
    <div className="right-contact">
      <div className="top">
        <img src="../contactimg.svg" alt="contactimg" title="Əlaqə saxla" />
      </div>
      <div className="bottom">
        {contactItemsData && contactItemsData.length > 0 ? (
          contactItemsData.map((item: ContactItemsType) => (
            <Link key={item.id} to={item.to ? item.to : ""} className="item-info">
              <div className="logo">
                <img style={{objectFit: "scale-down"}} src={item.icon ? item.icon : ""} alt={`${item.id}-icon`} />
              </div>
              <div className="titles-info">
                <span>{item?.title}</span>
                <p>{item?.value}</p>
              </div>
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default RightContact;
