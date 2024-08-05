import React from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
};

interface ActiveProductsType {
  id: number;
  price: string;
  garant: string;
  deliveryPrice: string;
  product: Product;
}

const OrderShowingProducts: React.FC = () => {
  const ActiveProduct: ActiveProductsType[] = [
    {
      id: 1,
      deliveryPrice: "10 AZN",
      garant: "1x",
      price: "12.000 AZN",
      product: {
        id: 1,
        title: "Margaret Qonaq Otağı Dəsti",
        description: "Bakı, Lorem ipsum dolor sit amet consectetur. Viverra diam nisi morbi ullamcorper mattis",
        image: "../margaret.svg",
      },
    },
    {
      id: 2,
      deliveryPrice: "10 AZN",
      garant: "1x",
      price: "12.000 AZN",
      product: {
        id: 1,
        title: "Margaret Qonaq Otağı Dəsti",
        description: "Bakı, Lorem ipsum dolor sit amet consectetur. Viverra diam nisi morbi ullamcorper mattis",
        image: "../margaret.svg",
      },
    },
  ];

  return (
    <div className="list-products-order">
      <div className="head-information-area">
        <span className="product-count">Məhsul (02)</span>
      </div>
      <div className="product-table-area">
        <table>
          <thead>
            <tr>
              <th>Məhsul</th>
              <th>Qiymət</th>
              <th>Qarantiya</th>
              <th>Çatdırılma</th>
            </tr>
          </thead>
          <tbody>
            {ActiveProduct.map((item: ActiveProductsType) => (
              <tr key={item?.id}>
                <td>
                  <div className="product">
                    <div className="imageproduct">
                      <img src={item?.product?.image} alt="" />
                    </div>
                    <div className="texts">
                      <span>{item?.product?.title}</span>
                      <p>{item?.product?.description}</p>
                    </div>
                  </div>
                </td>
                <td>{item?.price}</td>
                <td>{item?.garant}</td>
                <td>{item?.deliveryPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderShowingProducts;
