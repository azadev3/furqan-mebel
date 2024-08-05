import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Orders, OrderType } from "./OrderTable";
import OrderDetailEtapComponent from "./OrderDetailEtapComponent";
import OrderShowingProducts from "./OrderShowingProducts";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const showDetails = Orders.find((item: OrderType) => item.orderID.split("#").join("") === id);

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
            <span>{showDetails?.orderID}</span>
            <article>
              <span>2 Məhsul</span>
              <span className="dot"></span>
              <span>Sifariş verildi 17 Yanvar, 2025 7:32 PM</span>
            </article>
          </div>
          <strong>$1199.00</strong>
        </div>

        <div className="delivering-time">
          <span>Təxmini çatdırılma tarixi</span>
          <strong>23 Yanvar, 2025</strong>
        </div>
        <OrderDetailEtapComponent />
      </div>
      {/* <OrderActivity /> */}
      <OrderShowingProducts />
    </div>
  );
};

export default OrderDetails;
