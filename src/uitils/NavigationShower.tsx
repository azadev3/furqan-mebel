import React from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";

type props = {
  prevpage: string;
};

const NavigationShower: React.FC<props> = (props) => {
  const location = useLocation();

  const isDeliveryPage = location.pathname === "/delivery" || location.pathname === "/paymentdetails";

  const isBlogInnerPage = useMatch("/blog/:slug");

  const isProductInnerPage = useMatch("/products/:slugproduct");

  const navigate = useNavigate();

  return (
    <div className="navigation-shower">
      <span className="prevpage" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Ana Səhifə
      </span>
      {isDeliveryPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/mybasket" className="prevpage" style={{ textDecoration: "none" }}>
            Səbət
          </Link>
        </>
      ) : isBlogInnerPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/blog" className="prevpage" style={{ textDecoration: "none" }}>
            Blog
          </Link>
        </>
      ) : isProductInnerPage ? (
        <>
          <span className="slash">/</span>
          <Link to="/products" className="prevpage" style={{ textDecoration: "none" }}>
          Məhsullar
          </Link>
        </>
      ) : null}
      <span className="slash">/</span>

      <span className="nowpage">{props.prevpage}</span>
    </div>
  );
};

export default NavigationShower;
