import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import EmptyFavorites from "../components/favoritespageuitils/EmptyFavorites";
import { useRecoilValue } from "recoil";
import { userAddedFavourite } from "../recoil/Atoms";
import Favorites from "../components/favoritespageuitils/Favorites";
// import Favorites from "../components/favoritespageuitils/Favorites";

const FavouritesPage: React.FC = () => {
  //show favourites products
  const isAdded = useRecoilValue(userAddedFavourite);
  




  return (
    <div className="favorit-page-wrapper">
      <div className="favorit-page">
        <NavigationShower prevpage="Sevimlilərim" />
        {isAdded ? <Favorites /> : <EmptyFavorites />}
      </div>
    </div>
  );
};

export default FavouritesPage;
