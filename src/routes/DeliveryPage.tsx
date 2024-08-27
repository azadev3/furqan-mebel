import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import CardRepition from "../components/deliverypageuitils/CardRepition";
import FormAndTotalPrice from "../components/deliverypageuitils/FormAndTotalPrice";
import { Helmet } from "react-helmet";

const DeliveryPage: React.FC = () => {
  return (
    <div className="delivery-page-wrapper">
          <Helmet>
        <title>Furqan Mebel | Ödəniş</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
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
