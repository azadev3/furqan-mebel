import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslations } from "../../TranslateContext";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";

export type InformationItemType = {
  id: number;
  title: string;
  icon: string;
  value: string;
};

const Contact: React.FC = () => {

  
  // fetch socials
  const activelanguage = useRecoilValue(SelectedLanguageState);
  const { data: sss } = useQuery<InformationItemType[]>({
    queryKey: ["sss", activelanguage],
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

  // const InformationItems: InformationItemType[] = [
  //   {
  //     id: 1,
  //     title: "Bakı şəhəri, Binəqədi şossesi , küçə 1/22",
  //     icon: "../location.svg",
  //   },
  //   {
  //     id: 2,
  //     title: "info@woodstore.az",
  //     icon: "../sms.svg",
  //   },
  //   {
  //     id: 3,
  //     title: "+994 50 576 80 80",
  //     icon: "../mynaui_telephone.svg",
  //   },
  // ];

  const navigate = useNavigate();

  const { translations } = useTranslations();

  return (
    <div className="contact-wrapper">
      <div className="contact">
        <div className="left-contact">
          <img src="../contactimage.svg" alt="" />
        </div>

        <div className="right-contact">
          <div className="contact-withus">
            <h1>{translations['bizimle_elaqe']}</h1>
            <form className="form">
              <div className="email">
                <span>{translations['email']}</span>
                <input type="email" placeholder="jhondoe@gmail.com" />
              </div>
              <div className="message">
                <span>{translations['mesaj']}</span>
                <textarea placeholder={translations['message_textarea']}></textarea>
              </div>

              <button type="submit" onClick={() => navigate('/contact')}>{translations['gonder']}</button>
            </form>
          </div>

          <div className="information">
            <h1>{translations['elaqe_melumatlari']}</h1>
            <div className="information-items">
              {sss && sss?.length > 0 ? sss?.map((item: InformationItemType) => (
                <Link to={item?.value} key={item.id}>
                  <img src={item.icon ? item.icon : ""} alt={`${item.id}-icon`} title={item.title} />
                  <span>{item.title}</span>
                </Link>
              )) : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
