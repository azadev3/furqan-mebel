import React, { useState, useEffect } from "react";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import getCookie from "../../getCookie";
import { UserIsAuthState } from "../../recoil/Atoms";
import Loader from "../../uitils/Loader";

export interface BasketDataInterface {
  id: number;
  quantity: number;
  product: CatProductType;
}

const Basket: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [basketItems, setBasketItems] = useState<CatProductType[]>([]);
  const [basketProducts, setBasketProducts] = useState<BasketDataInterface[]>([]);

  const activeLang = useRecoilValue(SelectedLanguageState);
  const token = getCookie("accessToken");
  const isAuth = useRecoilValue(UserIsAuthState);
  const navigate = useNavigate();

  const getBasketProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": activeLang,
        },
      });

      if (response.data) {
        setBasketProducts(response.data?.cart || []);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error fetching basket products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBasketInLocalStorage = (updatedBasket: CatProductType[]) => {
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    setBasketItems(updatedBasket);
  };

  //incerement product
  const incrementProduct = async (id: number) => {
    if (isAuth && token) {
      try {
        const response = await axios.post(`${Baseurl}/cart/add/${id}`, "", {
          headers: {
            "Accept-Language": activeLang,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.status === 200) {
          const updatedBasketProducts = basketProducts.map((item: BasketDataInterface) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            location.reload();
            return item;
          });

          setBasketProducts(updatedBasketProducts);
        } else {
          console.error("err:", response);
        }
      } catch (error) {
        console.error("err:", error);
      }
    } else {
      const updatedBasket = basketItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      updateBasketInLocalStorage(updatedBasket);
    }
  };

  // decrement product
  const decrementProduct = async (id: number) => {
    if (isAuth && token) {
      try {
        const response = await axios.post(`${Baseurl}/cart/remove/${id}`, "", {
          headers: {
            "Accept-Language": activeLang,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const updatedBasketProducts = basketProducts
            .map((item) => {
              if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              } else if (item.id === id && item.quantity === 1) {
                return null;
              }
              return item;
            })
            .filter((item) => item !== null);

            setBasketProducts(updatedBasketProducts as BasketDataInterface[]);
            location.reload();
        } else {
          console.error("Error while decrementing product:", response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      const updatedBasket = basketItems
        .map((item) => {
          if (item.id === id && item.quantity > 1) {
            return { ...item, quantity: (item.quantity || 1) - 1 };
          } else if (item.id === id && item.quantity === 1) {
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);

      updateBasketInLocalStorage(updatedBasket as CatProductType[]);
    }
  };

  //remove on db
  const removeProductBasket = async (productid: any) => {
    try {
      const response = await axios.post(`${Baseurl}/cart/remove/${productid}`, "", {
        headers: {
          "Accept-Language": activeLang,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = (id: number) => {
    if (isAuth && token) {
      removeProductBasket(id);
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      return () => clearTimeout(timeout);
    } else {
      const updatedBasket = basketItems.filter((item) => item.id !== id);
      updateBasketInLocalStorage(updatedBasket);
    }
  };

  useEffect(() => {
    if (isAuth && token) {
      getBasketProducts();
    } else {
      const savedBasket = localStorage.getItem("basket");
      if (savedBasket) {
        try {
          const parsedBasket = JSON.parse(savedBasket);
          if (Array.isArray(parsedBasket)) {
            setBasketItems(parsedBasket);
          }
        } catch (error) {
          console.error("Error parsing basket data:", error);
        }
      }
    }
  }, [isAuth, token, activeLang]);

  // Check if either basketItems or basketProducts has items
  const hasItems = (basketItems && basketItems.length > 0) || (basketProducts && basketProducts.length > 0);

  return (
    <div className="basket">
      {loading ? (
        <Loader />
      ) : (
            <>
              {basketProducts.length > 0
                ? basketProducts.map((item: BasketDataInterface) => (
                    <div className="basket-item-card" key={item.id}>
                      <CgClose className="remove-item" onClick={() => removeProduct(item.product.id)} />

                      <article className="left-information" onClick={() => navigate(`/product_single/${item.product.slug}`)}>
                        <div className="image-info">
                          <img src={item.product.img} alt={`${item.product.id}-img`} />
                        </div>
                        <div className="descriptions">
                          <h3>{item.product.title}</h3>
                          <p>{item?.product?.category_name}</p>
                        </div>
                      </article>

                      <article className="right">
                        <h4 className="price">{parseFloat(item.product.price) * (item.quantity || 1)} AZN</h4>
                        <div className="counters">
                          <button onClick={() => decrementProduct(item.product.id)}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button onClick={() => incrementProduct(item.product.id)}>+</button>
                        </div>
                      </article>
                    </div>
                  ))
                : basketItems ? (
                  basketItems.length > 0
                    ? basketItems.map((item: CatProductType) => (
                        <div className="basket-item-card" key={item.id}>
                          <CgClose className="remove-item" onClick={() => removeProduct(item?.id)} />
    
                          <article className="left-information" onClick={() => navigate(`/product_single/${item?.slug}`)}>
                            <div className="image-info">
                              <img src={item?.img} alt={`${item?.id}-img`} />
                            </div>
                            <div className="descriptions">
                              <h3>{item?.title}</h3>
                              <p>{item?.category_name}</p>
                            </div>
                          </article>
    
                          <article className="right">
                            <h4 className="price">{parseFloat(item?.price) * (item.quantity || 1)} AZN</h4>
                            <div className="counters">
                              <button onClick={() => decrementProduct(item?.id)}>-</button>
                              <span>{item.quantity || 1}</span>
                              <button onClick={() => incrementProduct(item?.id)}>+</button>
                            </div>
                          </article>
                        </div>
                      ))
                    : "Səbət boşdur."
                ) : ""}
            </>
      )}

      {hasItems && (
        <Link to="/delivery" className="continue">
          <button>
            <span>Davam et</span>
            <img src="../ln.svg" alt="" />
          </button>
        </Link>
      )}
      {!hasItems && ""}
    </div>
  );
};

export default Basket;
