import { toast } from "react-toastify";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";

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
      toast.info("Bu məhsul artıq səbətdədir.", {
        position: "top-center"
      });
    } else {
      updatedBasket = [...existingBasket, product];
      toast.success("Məhsul səbətə əlavə olundu!", {
        position: "top-center"
      });

      localStorage.setItem("basket", JSON.stringify(updatedBasket));
    }
  } catch (error) {
    console.error("Basket Storage Error:", error);
  }
};
