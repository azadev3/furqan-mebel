import { toast } from "react-toastify";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";

export const addBasketFunctionStorage = (product: CatProductType) => {
  try {
    const savedBasket = localStorage.getItem("basket");
    const existingBasket = savedBasket ? JSON.parse(savedBasket) : [];

    if (!Array.isArray(existingBasket)) {
      throw new Error("Basket data is not an array");
    }

    const isProductInBasket = existingBasket.some((item: CatProductType) => item.id === product.id);

    let updatedBasket;

    if (isProductInBasket) {
      updatedBasket = existingBasket.map((item: CatProductType) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      toast.info("Məhsulun miqdarı artırıldı.", {
        position: "top-center"
      });
    } else {
      updatedBasket = [...existingBasket, { ...product, quantity: 1 }];
      toast.success("Məhsul səbətə əlavə olundu!", {
        position: "top-center"
      });
    }

    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  } catch (error) {
    console.error("Basket Storage Error:", error);
  }
};

export const sendBasketsToDB = async (basketitems: CatProductType[], token: string, lang: string) => {
  try {
    const response = await axios.post(`${Baseurl}/addAll`, basketitems, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });

    if (response.data) {
      console.log(response.data, "going");
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log(error)
  }
};

export const addBasketFunction = async (itemid: any, items: CatProductType[], lang: string, token: string) => {
  try {
       const response = await axios.post(`${Baseurl}/cart/add/${itemid}`, items, {
            headers: {
                 "Authorization": `Bearer ${token}`,
                 "Accept-Language": lang,
            }
       });

       if(response.data) {
            console.log(response.data, 'getdi');
       } else { 
            console.log(response.status);
       }
  } catch (error) {
       console.log(error);
  }
}