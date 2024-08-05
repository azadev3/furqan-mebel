import React from "react";
import "../styles/global.scss";
import { TbFaceIdError } from "react-icons/tb";

const Error: React.FC = () => {
  return (
    <div className="error-container">
      <div className="error">
        <TbFaceIdError className="error-face" />
        <h1>Gözlənilməz bir xəta oldu, zəhmət olmasa səhifəni yeniləyin, vəya biraz gözləyib təkrar cəhd edin.</h1>
      </div>
    </div>
  );
};

export default Error;
