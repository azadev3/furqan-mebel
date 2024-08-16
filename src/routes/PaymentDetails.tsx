import React, { useRef } from "react";
import NavigationShower from "../uitils/NavigationShower";
import CardRepition from "../components/deliverypageuitils/CardRepition";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "../TranslateContext";

type CardSelectType = {
  id: number;
  title: string;
  description: string;
};

type PaymentMonthsType = {
  id: number;
  month: string;
  discount: string;
};

const PaymentDetails: React.FC = () => {
  const Cards: CardSelectType[] = [
    {
      id: 1,
      title: "Birkart",
      description: "Insert your account email of paypal. We will Process your payment",
    },
    {
      id: 2,
      title: "Daxili Kredit",
      description: "Insert your account email of paypal. We will Process your payment",
    },
    {
      id: 3,
      title: "Nağd",
      description: "Insert your account email of paypal. We will Process your payment",
    },
  ];

  const PaymentMethods: PaymentMonthsType[] = [
    {
      id: 1,
      discount: "0%",
      month: "6 ay",
    },
    {
      id: 2,
      discount: "0%",
      month: "9 ay",
    },

    {
      id: 3,
      discount: "0%",
      month: "12 ay",
    },
    {
      id: 4,
      discount: "0%",
      month: "18 ay",
    },
    {
      id: 5,
      discount: "0%",
      month: "24 ay",
    },
  ];

  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  const handleSelectCard = (id: number | null) => {
    setSelectedCard(id);
  };

  const formikRef = useRef<FormikHelpers<any> | null>(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/paymentsuccess");
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  //select months payment
  const radioRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  //active months
  const [activeMonth, setActiveMonth] = React.useState<number | null>(null);

  const selectPaymentMonths = (id: number) => {
    if (radioRefs.current[id]) {
      radioRefs.current[id].checked = true;
      setActiveMonth(id);
    }
  };

  React.useEffect(() => {
    console.log(radioRefs);
    console.log(activeMonth, "f");
  }, [activeMonth, radioRefs]);

  const { translations } = useTranslations();

  return (
    <div className="payment-detail-page-wrapper">
      <div className="payment-detail-page">
        <NavigationShower prevpage="Ödəniş" />
        <CardRepition />

        <div className="container-selecting-cards">
          <div className="express-checkout">
            <span>Express checkout</span>
          </div>

          <div className="gpay-and-apay">
            <button className="gpay">
              <img src="../gpy.svg" alt="google-play" title="Google Pay" />
            </button>
            <button className="apay">
              <img src="../apay.svg" alt="apple-pay" title="Apple Pay" />
            </button>
          </div>

          <div className="or-line">
            <span>Və ya</span>
          </div>

          <div className="creditcard-or-creditcard">
            {Cards.map((item: CardSelectType) => (
              <div
                key={item.id}
                className={`card-item ${selectedCard === item.id ? "active-card" : ""}`}
                onClick={() => handleSelectCard(item.id)}>
                <input type="radio" checked={selectedCard === item.id} readOnly />
                <div className="description">
                  <span>{item?.title}</span>
                  <p>{item?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="months-selections">
            <h4>Ödəmək istədiyiniz ayı seçin:</h4>
            <div className="months">
              <div className="select-months">
                {PaymentMethods.map((item: PaymentMonthsType) => (
                  <div className="sixmonth">
                    <span className="discount">{item?.discount}</span>
                    <div
                      className={`month ${activeMonth === item?.id ? "month-selected" : ""}`}
                      onClick={() => selectPaymentMonths(item?.id)}>
                      <input type="radio" ref={(el) => (radioRefs.current[item?.id] = el)} />
                      <span>{item?.month}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="monthly-pay">
                <p className="title-pay">{translations['ayliq_odenis']}</p>
                <span className="count-price">15.83000 AZN</span>
              </div>
            </div>

            
          <div className="finish-payment">
            <button className="btn" type="button" onClick={handleSubmit}>
            {translations['sifarisi_tesdiqle']}
            </button>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
