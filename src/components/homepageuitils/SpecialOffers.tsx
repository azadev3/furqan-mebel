import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type LeftOfferType = {
  id: string;
  title: string;
  discount: string;
  text: string;
  image: string;
};
type RightOfferType = {
  id: string;
  title: string;
  maxcashback: string;
  code: string;
};

const SpecialOffers: React.FC = () => {
  //define offers
  const LeftOffers: LeftOfferType[] = [
    {
      id: uuidv4(),
      title: "Best Online Deals, Free Stuff",
      discount: "15% OFF",
      text: "Sadəcə bu həftə...Qaçırmayın",
      image: "../imageforoffers.jpeg",
    },
  ];

  const RightOffers: RightOfferType[] = [
    {
      id: uuidv4(),
      title: "10% cash-back on personal care",
      maxcashback: "$12",
      code: "CADHL837",
    },
  ];

  return (
    <div className="special-offers-wrapper">
      <div className="special-offers">
        <h1>Xüsusi Təkliflər</h1>

        <div className="gridoffer">
          <div className="left">
            {LeftOffers.map((leftitem: LeftOfferType) => (
              <React.Fragment key={leftitem.id}>
                <img src={leftitem.image} alt={`${leftitem.id}-image`} title={leftitem.title} />
                <div className="text-for-left">
                  <div className="discount">
                    <span>xüsusi təklif</span>
                    <span className="discount-count">{leftitem.discount}</span>
                  </div>
                  <h1>{leftitem.title}</h1>
                  <p>{leftitem.text}</p>
                  <Link to="" className="formore">
                    <span>Daha çox</span>
                    <img src="../rightwhite.svg" alt="right" title="Daha çox" />
                  </Link>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="right">
            {RightOffers.map((item: RightOfferType) => (
              <React.Fragment key={item.id}>
                <span>Müntəzəm təklif</span>
                <h1>{item.title}</h1>
                <div className="cash-and-code">
                  <span>Max cashback: {item.maxcashback}</span>
                  <span>Code: {item.code}</span>
                </div>
                <Link to="" className="formore">
                  <span>Daha çox</span>
                  <img src="../rightorange.svg" alt="right" title="Daha çox" />
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
