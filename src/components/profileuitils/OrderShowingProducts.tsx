import React from "react";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { OrderItems, Orders } from "../paymentsuccesspageuitils/PaymentReceipt";
import { useQuery } from "@tanstack/react-query";
import getCookie from "../../getCookie";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { useParams } from "react-router-dom";

const OrderShowingProducts: React.FC = () => {
  const { id } = useParams();

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

  const innerProduct =
  ordersData && ordersData.length > 0 ? ordersData?.find((item: Orders) => {
    return item.id.toString() === id?.toString().split("#").join("");
  })?.order_items : [];

  return (
    <div className="list-products-order">
      <div className="head-information-area">
        <span className="product-count">Məhsul ({innerProduct?.length})</span>
      </div>
      <div className="product-table-area">
        <table>
          <thead>
            <tr>
              <th>Məhsul</th>
              <th>Qiymət</th>
            </tr>
          </thead>
          <tbody>
            {innerProduct && innerProduct?.length > 0 ? innerProduct?.map((item: OrderItems) => (
              <tr key={item.product?.id}>
                <td>
                  <div className="product">
                    <div className="imageproduct">
                      <img src={item.product?.img} alt={item.product?.title} />
                    </div>
                    <div className="texts">
                      <span>{item?.product?.title}</span>
                      <p>{item?.product?.category_name}</p>
                    </div>
                  </div>
                </td>
                <td>{item && item?.product && item?.product?.price ? parseFloat(item?.product.price) * item?.quantity : ""} AZN</td>
              </tr>
            )) : ""} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderShowingProducts;
