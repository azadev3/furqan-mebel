import React from "react";
import { Link } from "react-router-dom";
import SelectedLanguage from "./SelectedLanguage";
import { atom, useRecoilState } from "recoil";
import { useTranslations } from "../../TranslateContext";

export const CallYourModalState = atom<boolean>({
  key: "callYourModalStateKey",
  default: false,
});

const Topheader: React.FC = () => {
  const [_, setCallYourModal] = useRecoilState(CallYourModalState);

  const handleCallYourModal = () => {
    setCallYourModal(true);
  };

  const { translations } = useTranslations();

  return (
    <header className="top-header-wrapper">
      <header className="topheader">
        <div className="left-links">
          <div className="links">
            <Link to="/stores">{translations["magazalar"]}</Link>
            <Link to="/vacations">{translations["vakansiyalar"]}</Link>
          </div>

          <span className="time">
            {translations['work_hours']}
          </span>
        </div>

        <div className="right-links-language">
          <a
            href={`https://wa.me/${translations["whatsapp_number"].replace(/\s+/g, "")}`}
            className="whatsapp"
            target="_blank"
            rel="noopener noreferrer">
            <img src="../WhatsApp.svg" alt="whatsapp" title="WhatsApp" />
            <span>{translations["whatsapp_number"]}</span>
          </a>

          <div className="call-us" onClick={handleCallYourModal}>
            <img src="../call.svg" alt="call" title={translations['zeng_sifaris_et']} />
            <span>{translations['zeng_sifaris_et']}</span>
          </div>
          <SelectedLanguage />
        </div>
      </header>
    </header>
  );
};

export default Topheader;
