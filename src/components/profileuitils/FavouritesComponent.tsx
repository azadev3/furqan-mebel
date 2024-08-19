import React from "react";
import PaginationLikedProducts from "../../uitils/PaginationLikedProducts";
import getCookie from "../../getCookie";
import { useRecoilValue } from "recoil";
import { UserIsAuthState } from "../../recoil/Atoms";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";

const FavouritesComponent: React.FC = () => {

  const [favOnDb, setFavOnDb] = React.useState<CatProductType[]>([]);

  const token = getCookie("accessToken");
  const isAuth = useRecoilValue(UserIsAuthState);
  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const [favProducts, setFavProducts] = React.useState<CatProductType[]>([]);
  const [isAdded, setIsAdded] = React.useState<boolean>(false);

  const getFavouritesOnDB = async () => {
    try {
      const response = await axios.get(`${Baseurl}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": selectedLanguage,
        },
      });

      if (response.data) {
        console.log(response.data?.favorites)
        setFavOnDb(response.data?.favorites);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //show favourites products
  React.useEffect(() => {
    if (isAuth) {
      setIsAdded(true);
      getFavouritesOnDB();
    } else {
      const getFavProducts = localStorage.getItem("favourites");
      if (getFavProducts) {
        const parsedFavProducts = JSON.parse(getFavProducts);
        setFavProducts(parsedFavProducts);
        setIsAdded(parsedFavProducts.length > 0);
      } else {
        setFavProducts([]);
        setIsAdded(false);
      }
    }
  }, []);
  
  return (
    <div className="fav-component-dashboard">
      {!isAdded ? (
        "Hələ ki Favori məhsulunuz yoxdur."
      ) : (
        <PaginationLikedProducts data={favOnDb ? favOnDb : favProducts ? favProducts : []} itemsPerPage={12} />
      )}
    </div>
  );
};

export default FavouritesComponent;
