import React from "react";
import { PiList } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { useTranslations } from "../../TranslateContext";
import { catalogState } from "../../recoil/Atoms";

const Catalogs: React.FC = () => {
  const [catalogMenu, setCatalogMenu] = useRecoilState(catalogState);

  const handleCatalogMenu = () => {
    setCatalogMenu((prevMenu) => !prevMenu);
  };

  const { translations } = useTranslations();

  return (
    <div className="catalog-menu">
      <button className="button-catalog-menu"  onClick={handleCatalogMenu}>
        <span>{translations["nav_catalog"]}</span>
        <PiList className={`list-icon-catalog ${catalogMenu ? "active" : ""}`} />
      </button>
    </div>
  );
};

export default Catalogs;
