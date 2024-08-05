import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import CardRepition from "../components/deliverypageuitils/CardRepition";
import FormAndTotalPrice from "../components/deliverypageuitils/FormAndTotalPrice";

const DeliveryPage: React.FC = () => {
  return (
    <div className="delivery-page-wrapper">
      <div className="deliverypage">
        <NavigationShower prevpage="Ödəniş" />

        <div className="container-delivery">
          <CardRepition />
          <FormAndTotalPrice />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
