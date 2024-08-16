import React from "react";
import { Link } from "react-router-dom";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import getCookie from "../../getCookie";
import { Orders } from "../paymentsuccesspageuitils/PaymentReceipt";

export type OrderType = {
  id: number;
  orderID: string;
  status: string;
  date: string;
  all: string;
};

const OrderTable: React.FC = () => {

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

  //control for statuses colors
  const ControlStatus = (item: Orders) => {
    switch (item.status) {
      case "1":
        return "newpackage";
      case "2":
        return "readying";
      case "3":
        return "sended";
      case "4": 
        return "delivered";
      case "5":
        return "rejected";
      default:
        return "unknown-status";
      }
  };
  return (
    <div className="orders-and-details-table">
      <div className="head">
        <span>Son Sifarişlərim</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>sifariş id</th>
            <th>status</th>
            <th>tarix</th>
            <th>
              <Link to="">
                <span>Hamısı</span>
                <img src="../rig.svg" alt="" />
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersData && ordersData?.length > 0 ? ordersData.map((item: Orders, i: number) => (
            <tr key={i}>
              <td>{item?.id}</td>
              <td className={ControlStatus(item)}>{item.status === "1" ? "Yeni Sifariş" : item.status === "2" ? "Hazırlanır" : item.status === "3" ? "Göndərildi" : item.status === "4" ? "delivered" : item.status === "5" ? "rejected" : ""}</td>
              <td>{item?.order_date}</td>
              <td>
                <Link to={`/profile/orderhistory/${item?.id.toString().split("#").join("")}`}>
                  <span>Detallar</span>
                  <img src="../rig.svg" alt="" />
                </Link>
              </td>
            </tr>
          )) : ""}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
