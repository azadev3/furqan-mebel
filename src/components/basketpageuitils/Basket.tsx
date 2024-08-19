import React, { useState, useEffect } from "react";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const Basket: React.FC = () => {
  const [basketItems, setBasketItems] = useState<CatProductType[]>([]);

  const [count, setCount] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      try {
        const parsedBasket = JSON.parse(savedBasket);
        if (Array.isArray(parsedBasket)) {
          setBasketItems(parsedBasket);

          const initialCounts = parsedBasket.reduce((acc: { [key: number]: number }, item: CatProductType) => {
            acc[item.id] = 1;
            return acc;
          }, {});
          setCount(initialCounts);
        }
      } catch (error) {
        console.error("Error parsing basket data:", error);
      }
    }
  }, []);

  const incrementProduct = (id: number) => {
    setCount((prevCount) => ({
      ...prevCount,
      [id]: (prevCount[id] || 0) + 1,
    }));
  };

  const decrementProduct = (id: number) => {
    setCount((prevCount) => {
      const newCount = (prevCount[id] || 0) - 1;
      return {
        ...prevCount,
        [id]: newCount < 1 ? 1 : newCount,
      };
    });
  };

  const navigate = useNavigate();

  return (
    <div className="basket">
      {basketItems && basketItems?.length > 0
        ? basketItems?.map((item: CatProductType) => (
            <div className="basket-item-card">
              <CgClose
                className="remove-item"
                onClick={() => {
                  const savedBasket = localStorage.getItem("basket");
                  if (savedBasket) {
                    const parsedBasket = JSON.parse(savedBasket);

                    const updatedBasket = parsedBasket.filter(
                      (basketItem: CatProductType) => basketItem.id !== item.id
                    );

                    localStorage.setItem("basket", JSON.stringify(updatedBasket));

                    setBasketItems(updatedBasket);
                  }
                }}
              />

              <article
                className="left-information"
                onClick={() => {
                  navigate(`/products/${item?.slug}`);
                }}>
                <div className="image-info">
                  <img src={item?.img} alt={`${item?.id}-img`} />
                </div>
                <div className="descriptions">
                  <h3>{item?.title}</h3>
                  <p>{item?.content}</p>
                </div>
              </article>

              <article className="right">
                <h4 className="price">{parseFloat(item.price) * (count[item.id] || 1)} AZN</h4>
                <div className="counters">
                  <button onClick={() => decrementProduct(item?.id)}>-</button>
                  <span>{count[item?.id] || 1}</span>
                  <button onClick={() => incrementProduct(item?.id)}>+</button>
                </div>
              </article>
            </div>
          ))
        : "Səbət boşdur."}

      {/* <div className="bottom">
        <h5>Total 129.000 AZN</h5>
      </div> */}

      {basketItems && basketItems?.length !== 0 && (
        <Link to="/delivery" className="continue">
          <button>
            <span>Davam et</span>
            <img src="../ln.svg" alt="" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Basket;
