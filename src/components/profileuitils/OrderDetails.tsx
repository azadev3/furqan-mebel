import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import OrderShowingProducts from "./OrderShowingProducts";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { Orders } from "../paymentsuccesspageuitils/PaymentReceipt";
import getCookie from "../../getCookie";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { useQuery } from "@tanstack/react-query";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  //fetch orders
  const selectedLang = useRecoilValue(SelectedLanguageState);
  const { data: ordersData } = useQuery<Orders[]>({
    queryKey: ["ordersDataKey", selectedLang],
    queryFn: async () => {
      const token = getCookie("accessToken");
      const response = await axios.get(`${Baseurl}/orders`, {
        headers: {
          "Accept-Language": selectedLang,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data?.orders;
    },
  });

  const showDetails =
    ordersData &&
    ordersData?.length > 0 &&
    ordersData.find((item: Orders) => item?.id.toString().split("#").join("") === id);

  return (
    <div className="order-details">
      <div className="head-title">
        <Link to="/profile/orderhistory" className="title" title="Geri qayıt">
          <FaArrowLeft className="left-icon" />
          <span>sifariş detalları</span>
        </Link>
      </div>
      <div className="order-detail-top">
        <div className="card-one">
          <div className="order-id-and-detail">
            <article>
              <span className="dot"></span>
              <span>Sifariş verildi {showDetails ? showDetails?.order_date : ""} PM</span>
            </article>
          </div>
          <strong>{showDetails ? `${showDetails?.total_price} AZN` : ""}</strong>
        </div>
        {/* 
        <div className="delivering-time">
          <span>Təxmini çatdırılma tarixi</span>
          <strong>23 Yanvar, 2025</strong>
        </div> */}
        {/* <OrderDetailEtapComponent /> */}
      </div>
      {/* <OrderActivity /> */}
      <OrderShowingProducts />
    </div>
  );
};

export default OrderDetails;
