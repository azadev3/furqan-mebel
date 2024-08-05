import React from "react";
import { Link } from "react-router-dom";

export type OrderType = {
  id: number;
  orderID: string;
  status: string;
  date: string;
  all: string;
};
//order data
export const Orders: OrderType[] = [
  {
    id: 1,
    orderID: "#964593761",
    status: "hazırlanır",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
  {
    id: 2,
    orderID: "#9634459761",
    status: "tamamlandı",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
  {
    id: 3,
    orderID: "#964111159761",
    status: "hazırlanır",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
  {
    id: 4,
    orderID: "#222296459761",
    status: "hazırlanır",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
  {
    id: 5,
    orderID: "#9123213126459761",
    status: "hazırlanır",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
  {
    id: 6,
    orderID: "#9666765878459761",
    status: "ləğv edildi",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
  {
    id: 7,
    orderID: "#96459776861",
    status: "hazırlanır",
    date: "Dec 30, 2019 05:18",
    all: "29.0000 AZN (5 Products)",
  },
];

const OrderTable: React.FC = () => {
  //control for statuses colors
  const ControlStatus = (item: string) => {
    switch (item) {
      case "hazırlanır":
        return "packaging";
      case "tamamlandı":
        return "finished";
      case "ləğv edildi":
        return "rejected";
      default:
        break;
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
            <th>ümumi</th>
            <th>
              <Link to="">
                <span>Hamısı</span>
                <img src="../rig.svg" alt="" />
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((item: OrderType) => (
            <tr key={item?.id}>
              <td>{item?.orderID}</td>
              <td className={ControlStatus(item?.status)}>{item?.status}</td>
              <td>{item?.date}</td>
              <td>{item?.all}</td>
              <td>
                <Link to={`/profile/orderhistory/${item?.orderID.split("#").join("")}`}>
                  <span>Detallar</span>
                  <img src="../rig.svg" alt="" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
