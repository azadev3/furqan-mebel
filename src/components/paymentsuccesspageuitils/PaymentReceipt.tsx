import React from "react";

type ReceiptDetailsType = {
  id: number;
  orderid: string;
  transactiondate: string;
  paymentmethod: string;
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
};

type ItemReceipt = {
  id: number;
  productimg: string;
  productname: string;
  productdescription: string;
  productprice: string;
  details?: ReceiptDetailsType;
};

const PaymentReceipt: React.FC = () => {
  const ItemReceipts: ItemReceipt[] = [
    {
      id: 1,
      productdescription: "Lorem ipsum dolor sit amet consectetur.",
      productimg: "../promg.svg",
      productname: "Margaret Qonaq Dəsti",
      productprice: "129.0000",
      details: {
        id: 1,
        orderid: "#1234567",
        paymentmethod: "Mastercard ending with 123",
        shipping: "129.0000",
        tax: "129.0000",
        subtotal: "129.0000",
        total: "129.0000",
        transactiondate: "Tuesday, 13 June 2024",
      },
    },
  ];

  return (
    <div className="receipt">
      {ItemReceipts.map((item: ItemReceipt) => (
        <div className="receipt-item" key={item.id}>
          <div className="top-product-item">
            <div className="leftpro">
              <div className="productimg">
                <img
                  src={item.productimg ? item.productimg : ""}
                  alt={`${item.id}-product`}
                  title={item?.productname}
                />
              </div>
              <div className="titlespro">
                <span>{item?.productname}</span>
                <p>{item?.productdescription}</p>
              </div>
            </div>
            <div className="rightpro">
              <span>{item?.productprice}</span>
            </div>
          </div>

          {item.details && (
            <div className="receipt-item-details">
              <article className="item-detail-top">
                <article className="detail">
                  <span>Sifariş ID</span>
                  <span>{item?.details?.orderid}</span>
                </article>
                <article className="detail">
                  <span>Transaction Date</span>
                  <span>{item?.details?.transactiondate}</span>
                </article>
                <article className="detail">
                  <span>Payment Method</span>
                  <span>{item?.details?.paymentmethod}</span>
                </article>
              </article>

              <article className="item-detail-top">
                <article className="detail">
                  <span>Subtotal</span>
                  <span>{item?.details?.subtotal}</span>
                </article>
                <article className="detail">
                  <span>Tax</span>
                  <span>{item?.details?.tax}</span>
                </article>
                <article className="detail">
                  <span>Shipping</span>
                  <span>{item?.details?.shipping}</span>
                </article>
              </article>

              <article className="total-count">
                <span>Total</span>
                <span>{item?.details?.total}</span>
              </article>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentReceipt;
