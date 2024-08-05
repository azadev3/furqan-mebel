import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { basketItemState } from "../../recoil/Atoms";
import { useAddBasket } from "../../useAddBasket";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import getCookie from "../../getCookie";
import { ProductsInterface } from "../homepageuitils/PopularProducts";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import Loader from "../../uitils/Loader";

export type ProductType = {
  id: number;
  title: string | null;
  content: string | null;
  img: string;
  price: string;
  discounted_price: string | null;
  is_favorite: boolean;
  is_in_cart: boolean;
  is_stock: boolean;
  is_popular: boolean;
  is_new: boolean;
  slug: string | null;
  images: { id: number; img: string }[];
  modules: { id: number; title: string | null }[];
  options: { id: number; title: string | null; icon: string | null; filter: { title: string | null } }[];
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: ProductType;
  total_price: string; // Assuming it's a string, if not, adjust accordingly
};

export interface CartType {
  id: number;
  product_count: number;
  total_price: string;
  cart_items: CartItemType[];
}

const Basket: React.FC = () => {
  const basketItems = useRecoilValue(basketItemState);
  const basketItemsData = Object.values(basketItems);

  const { addBasketForCounter } = useAddBasket();
  const [isBasketProducts, setIsBasketProducts] = React.useState<CartType | null>(null);
  const selectedLanguage = useRecoilValue(SelectedLanguageState);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getAllBasketProduct = async () => {
    setLoading(true);
    try {
      const token = getCookie("accessToken");
      const response = await axios.get(`${Baseurl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": selectedLanguage,
        },
      });

      if (response.data) {
        setIsBasketProducts(response.data.cart);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllBasketProduct();
  }, []);

  const initialCount =
    basketItemsData && basketItemsData.length > 0
      ? basketItemsData.reduce((acc: { [key: number]: number }, item: ProductsInterface) => {
          acc[item.id] = 1;
          return acc;
        }, {})
      : {};

  const [count, setCount] = React.useState<{ [key: number]: number }>(initialCount);

  const incrementProduct = (id: number) => {
    setCount((prevcount) => {
      const newCount = (prevcount[id] || 1) + 1;
      const product = basketItemsData.find((item: ProductsInterface) => item.id === id);

      if (product) {
        addBasketForCounter(product, newCount);
      }

      return {
        ...prevcount,
        [id]: newCount,
      };
    });
  };

  const decrementProduct = (id: number) => {
    setCount((prevcount) => {
      const currentCount = prevcount[id] || 1;
      const newCount = currentCount - 1;

      const product = basketItemsData.find((item: ProductsInterface) => item.id === id);

      if (product) {
        addBasketForCounter(product, newCount > 0 ? newCount : 0);
      }

      return {
        ...prevcount,
        [id]: newCount < 1 ? 1 : newCount,
      };
    });
  };

  return (
    <div className="basket">
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {isBasketProducts && isBasketProducts.cart_items.length > 0 ? (
            <React.Fragment>
              <div className="isbasketted-products-container">
                {isBasketProducts.cart_items.map((item: CartItemType) => (
                  <div className="item-basket" key={item.id}>
                    <div className="leftbasketproduct">
                      <div className="image-product">
                        <img
                          src={item.product.img}
                          alt={`${item.product.id}-product`}
                          title={item.product.title || "product"}
                        />
                      </div>
                      <div className="titles">
                        <span>{item.product.title}</span>
                        <p>{item.product.content}</p>
                      </div>
                    </div>
                    <div className="rightbasketproduct">
                      <div className="price">
                        <span>{item.product.price} AZN</span>
                      </div>
                      <div className="counter">
                        <span className="decrement" onClick={() => decrementProduct(item.product.id)}>
                          -
                        </span>
                        <span>{count[item.product.id] || item.quantity}</span>
                        <span className="increment" onClick={() => incrementProduct(item.product.id)}>
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="total-price-counter">
               {isBasketProducts && isBasketProducts.cart_items.length > 0 ? (
                <>
                {isBasketProducts.cart_items.map((item: CartItemType) => (
                   <span>Total Price: {item.quantity} AZN</span>
                ))}
                </>
               ) :""}
              </div> */}

              <div className="continue-btn">
                <Link to="/delivery" className="btn">
                  <span>Davam et</span>
                  <img src="../rightwhitee.svg" alt="" />
                </Link>
              </div>
            </React.Fragment>
          ) : (
            <p
              style={{
                marginTop: "120px",
                marginBottom: "120px",
                width: "100%",
                textAlign: "center",
                color: "#303030",
              }}>
              Hələ ki heç bir məhsul səbətə əlavə olunmayıb.
            </p>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Basket;
