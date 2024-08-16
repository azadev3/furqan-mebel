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
  }

  const { translations } = useTranslations();

  return (
    <header className="top-header-wrapper">
      <header className="topheader">
        <div className="left-links">
          <div className="links">
            <Link to="/stores">{translations['magazalar']}</Link>
            <Link to="/vacations">{translations['vakansiyalar']}</Link>
          </div>

          <span className="time">
            <span>09:00</span>
            <span>-</span>
            <span>19:00</span>
          </span>
        </div>

        <div className="right-links-language">
          <Link to="" className="whatsapp">
            <img src="../WhatsApp.svg" alt="whatsapp" title="WhatsApp" />
            <span>+994 123 45 67</span>
          </Link>
          <Link to="" className="call-us" onClick={handleCallYourModal}>
            <img src="../call.svg" alt="call" title="Zəng sifariş et" />
            <span>Zəng sifariş et</span>
          </Link>
          <SelectedLanguage />
        </div>
      </header>
    </header>
  );
};

export default Topheader;
