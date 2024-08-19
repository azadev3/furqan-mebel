import { toast } from "react-toastify";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";

export const addFavouriteFunctionStorage = (product: CatProductType) => {
  let existingFavorites = JSON.parse(localStorage.getItem("favourites") || "[]");

  if (!Array.isArray(existingFavorites)) {
    existingFavorites = [];
  }

  const isProductInFavorites = existingFavorites.some(
    (fav: CatProductType) => fav.id === product.id
  );

  let updatedFavorites;

  if (isProductInFavorites) {
    updatedFavorites = existingFavorites.filter(
      (fav: CatProductType) => fav.id !== product.id
    );
    toast.success("Məhsul sevimlilərdən silindi!", {
      position: "top-center",
    });
  } else {
    updatedFavorites = [...existingFavorites, product];
    toast.success("Məhsul sevimlilərə əlavə olundu!", {
      position: "top-center",
    });
  }

  localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
};
