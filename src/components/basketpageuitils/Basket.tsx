import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { basketItemState, LoginMenuState, UserIsAuthState } from "../../recoil/Atoms";
import { useAddBasket } from "../../useAddBasket";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import getCookie from "../../getCookie";
import { ProductsInterface } from "../homepageuitils/PopularProducts";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import Loader from "../../uitils/Loader";
import { useTranslations } from "../../TranslateContext";

export const PriceCountState = atom<string>({
  key: "priceCountKey",
  default: "",
});

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
  const setBasketItems = useSetRecoilState(basketItemState);
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
      if (token) {
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
      } else {
        const localBasketItems = JSON.parse(localStorage.getItem("baskets") || "{}");
        setBasketItems(localBasketItems);
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
          acc[item.id] = item.quantity || 1;
          return acc;
        }, {})
      : {};

  const [count, setCount] = React.useState<{ [key: number]: number }>(initialCount);

  const incrementProduct = (id: number) => {
    setCount((prevCount) => {
      const newCount = (prevCount[id] || 1) + 1;
      const product = basketItemsData.find((item: ProductsInterface) => item.id === id);

      if (product) {
        addBasketForCounter(product, newCount);
      }

      return {
        ...prevCount,
        [id]: newCount,
      };
    });
  };

  const decrementProduct = (id: number) => {
    setCount((prevCount) => {
      const currentCount = prevCount[id] || 1;
      const newCount = currentCount - 1;

      const product = basketItemsData.find((item: ProductsInterface) => item.id === id);

      if (product) {
        addBasketForCounter(product, newCount > 0 ? newCount : 0);
      }

      return {
        ...prevCount,
        [id]: newCount < 1 ? 1 : newCount,
      };
    });
  };

  const calculateTotalPrice = (price: string, count: number) => {
    const priceFloat = parseFloat(price) || 0;
    return (priceFloat * count).toFixed(2);
  };

  const navigate = useNavigate();

  const { translations } = useTranslations();

  const isAuth = useRecoilValue(UserIsAuthState);

  const [_, setLoginMenu] = useRecoilState(LoginMenuState);

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
                    <div
                      style={{ cursor: "pointer" }}
                      className="leftbasketproduct"
                      onClick={() => navigate(`/products/${item?.product?.slug?.toLowerCase()}`)}>
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
                        <span>
                          {calculateTotalPrice(item.product.price, count[item.product.id] || item.quantity)} AZN
                        </span>
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
              <div className="continue-btn">
                <Link to="/delivery" className="btn">
                  <span>{translations["davam_et"]}</span>
                  <img src="../rightwhitee.svg" alt="" />
                </Link>
              </div>
            </React.Fragment>
          ) : basketItemsData && basketItemsData.length > 0 ? (
            <div className="local-basket-products-container">
              {basketItemsData.map((item: ProductsInterface) => (
                <div className="item-basket" key={item.id}>
                  <div
                    className="leftbasketproduct"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${item?.slug?.toLowerCase()}`)}>
                    <div className="image-product">
                      <img src={item?.img} alt={`${item?.id}-product`} title={item?.title || "product"} />
                    </div>
                    <div className="titles">
                      <span>{item?.title}</span>
                      <p>{item?.content}</p>
                    </div>
                  </div>
                  <div className="rightbasketproduct">
                    <div className="price">
                      <span>{calculateTotalPrice(item?.price || "0", count[item?.id] || 1)} AZN</span>
                    </div>
                    <div className="counter">
                      <span className="decrement" onClick={() => decrementProduct(item?.id)}>
                        -
                      </span>
                      <span>{count[item?.id] || 1}</span>
                      <span className="increment" onClick={() => incrementProduct(item?.id)}>
                        +
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="continue-btn">
                <div
                  className="btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (isAuth) {
                      navigate("/delivery");
                    } else {
                      setLoginMenu(true);
                    }
                  }}>
                  <span>{translations["davam_et"]}</span>
                  <img src="../rightwhitee.svg" alt="" />
                </div>
              </div>
            </div>
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
