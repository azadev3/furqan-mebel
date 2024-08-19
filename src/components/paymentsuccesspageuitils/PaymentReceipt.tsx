import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import getCookie from "../../getCookie";
import Loader from "../../uitils/Loader";

export type Product = {
  id: number;
  title: string;
  content: string;
  category_name: string;
  parent_category_id: number;
  img: string;
  price: string;
};

export type OrderItems = {
  id: number;
  quantity: number;
  product: Product;
};

export interface Orders {
  id: number;
  status: string;
  items_count: number;
  total_price: string;
  order_date: string;
  order_items: OrderItems[];
}

const PaymentReceipt: React.FC = () => {
  //fetch orders
  const selectedLang = useRecoilValue(SelectedLanguageState);
  const { data: ordersData, isLoading } = useQuery<Orders[]>({
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

  return (
    <div className="receipt">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {ordersData && ordersData.length > 0 ? (
            ordersData.map((order: Orders) => (
              <div className="receipt-item" key={order.id}>
                {order && order?.order_items && order?.order_items?.length > 0 &&
                  order.order_items.map((orderItem: OrderItems) => (
                    <div className="top-product-item" key={orderItem.id}>
                      <div className="leftpro">
                        <div className="productimg">
                          <img
                            src={orderItem?.product?.img ? orderItem?.product?.img : ""}
                            alt={`${orderItem?.product?.id}-product`}
                            title={orderItem?.product?.category_name}
                          />
                        </div>
                        <div className="titlespro">
                          <span>{orderItem?.product?.category_name}</span>
                        </div>
                      </div>
                      <div className="rightpro">
                        <span>{orderItem?.product?.price} AZN</span>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default PaymentReceipt;
