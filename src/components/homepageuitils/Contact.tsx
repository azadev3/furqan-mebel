import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslations } from "../../TranslateContext";

export type InformationItemType = {
  id: number;
  title: string;
  icon: string;
};

const Contact: React.FC = () => {
  const InformationItems: InformationItemType[] = [
    {
      id: 1,
      title: "Bakı şəhəri, Binəqədi şossesi , küçə 1/22",
      icon: "../location.svg",
    },
    {
      id: 2,
      title: "info@woodstore.az",
      icon: "../sms.svg",
    },
    {
      id: 3,
      title: "+994 50 576 80 80",
      icon: "../mynaui_telephone.svg",
    },
  ];

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
              {InformationItems.map((item: InformationItemType, i:number) => (
                <Link to={i === 1 ? `mailto:${item.title}` : i === 2 ? `tel:${item.title}` : ""} key={item.id}>
                  <img src={item.icon ? item.icon : ""} alt={`${item.id}-icon`} title={item.title} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
