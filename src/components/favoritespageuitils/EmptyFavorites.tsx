import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "../../TranslateContext";

const EmptyFavorites: React.FC = () => {

  const navigate = useNavigate();

  const { translations } = useTranslations();

  return (
    <div className="empty-favorites">
      <div className="container">
        <div className="empty-icon">
          <img src="../isempty.svg" alt="isempty" title="Hal hazırda sevimli məhsulunuz yoxdur..." />
        </div>

        <div className="descriptions">
          <span>Hal-hazırda sevimli məhsulunuz yoxdur</span>
          <p>Məhsullar hissəsində biraz gəzinərək özünüzə uyğun məhsulları tapa bilərsiniz</p>
          <div className="buttons">
            <button onClick={() => navigate("/products")}>Məhsullar səhifəsinə get</button>
            <button onClick={() => navigate("/")}>{translations['nav_anasehife']}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFavorites;
