import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import EmptyFavorites from "../components/favoritespageuitils/EmptyFavorites";
import Favorites from "../components/favoritespageuitils/Favorites";
import { CatProductType } from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import getCookie from "../getCookie";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { UserIsAuthState } from "../recoil/Atoms";
import { Helmet } from "react-helmet";
// import Favorites from "../components/favoritespageuitils/Favorites";

const FavouritesPage: React.FC = () => {
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
    <div className="favorit-page-wrapper">
          <Helmet>
        <title>Furqan Mebel | Favorilər</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <div className="favorit-page">
        <NavigationShower prevpage="Sevimlilərim" />
        {isAdded ? <Favorites products={favOnDb ? favOnDb : favProducts ? favProducts : []} /> : <EmptyFavorites />}
      </div>
    </div>
  );
};

export default FavouritesPage;
