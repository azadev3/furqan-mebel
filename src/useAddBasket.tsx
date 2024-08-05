import { useRecoilState } from "recoil";
import { basketItemState } from "./recoil/Atoms";
import { toast } from "react-toastify";
import { ProductsInterface } from "./components/homepageuitils/PopularProducts";
import getCookie from "./getCookie";
import axios from "axios";
import { Baseurl } from "./api/Baseurl";
import React from "react";

// Custom hook to handle adding/removing favourites

export const useAddBasket = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [basketItems, setBasketItems] = useRecoilState(basketItemState);

  const addBasket = async (basketItems: ProductsInterface, e?: React.MouseEvent, id?: any) => {
    setLoading(true);
    e?.preventDefault();
    const token = getCookie("accessToken");
  
    try {
      if (token) {
        const response = await axios.post(`${Baseurl}/cart/add/${id}`, basketItems, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data) {
          console.log(response.data, "elave edldi");
          setBasketItems((prevItems: any) => {
            const updatedItems = { ...prevItems, [id]: basketItems };
            localStorage.setItem("baskets", JSON.stringify(updatedItems));
            toast.success(`${basketItems?.title}, Səbətə Əlavə Olundu!`, {
              position: "top-center",
            });
            return updatedItems;
          });
        } else {
          console.log(response.status);
        }
      } else {
        setBasketItems((prevItems: any) => {
          const updatedItems = { ...prevItems, [id]: basketItems };
          localStorage.setItem("baskets", JSON.stringify(updatedItems));
          toast.success(`${basketItems?.title}, Səbətə Əlavə Olundu!`, {
            position: "top-center",
          });
          return updatedItems;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  


const removeBasket = async (basketItem: ProductsInterface, id: number) => {
  
  setLoading(true);
  const token = getCookie("accessToken");
  
  try {
    if (token) {
      const response = await axios.post(`${Baseurl}/cart/remove/${id}`, basketItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data, "çıkarıldı");
        setBasketItems((prevItems: any) => {
          const updatedItems = { ...prevItems };
          delete updatedItems[id];
          localStorage.setItem("baskets", JSON.stringify(updatedItems));
          toast.warning(`${basketItem?.title}, Səbətdən Çıxarıldı!`, {
            position: "top-center",
          });
          return updatedItems;
        });
      } else {
        console.log(response.status);
      }
    } else {
      setBasketItems((prevItems: any) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[id];
        localStorage.setItem("baskets", JSON.stringify(updatedItems));
        toast.warning(`${basketItem?.title}, Səbətdən Çıxarıldı!`, {
          position: "top-center",
        });
        return updatedItems;
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  
  

  const addBasketForCounter = (product: ProductsInterface, quantity: number) => {
    setBasketItems((prevItems: any) => {
      const isBasket = prevItems[product.id] !== undefined;
      let updatedItems;

      if (isBasket) {
        // Update quantity if quantity is greater than 0
        const currentQuantity = prevItems[product.id].quantity || 1;
        const newQuantity = quantity > 0 ? currentQuantity + quantity : 0;

        if (newQuantity > 0) {
          updatedItems = { ...prevItems, [product.id]: { ...product, quantity: newQuantity } };
          toast.info(`${product.title}, Səbətdəki miqdarı artırıldı!`, {
            position: "top-center",
          });
        } else {
          // Remove product if new quantity is 0 or less
          updatedItems = { ...prevItems };
          delete updatedItems[product.id];
          toast.warning(`${product.title}, Səbətdən Çıxarıldı!`, {
            position: "top-center",
          });
        }
      } else {
        // Add new product with the given quantity
        updatedItems = { ...prevItems, [product.id]: { ...product, quantity } };
        toast.success(`${product.title}, Səbətə Əlavə Olundu!`, {
          position: "top-center",
        });
      }

      localStorage.setItem("baskets", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return { loading, addBasket, removeBasket, basketItems, addBasketForCounter };
};
