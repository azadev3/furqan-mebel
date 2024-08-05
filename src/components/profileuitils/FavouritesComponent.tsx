import React from "react";
import PaginationLikedProducts from "../../uitils/PaginationLikedProducts";

const FavouritesComponent: React.FC = () => {
  const favItems = localStorage.getItem("favourites");

  const dataFav = favItems ? JSON.parse(favItems) : [];

  return (
    <div className="fav-component-dashboard">
      {Array.isArray(dataFav) && dataFav.length > 0 ? (
        <PaginationLikedProducts data={Array.isArray(dataFav) ? dataFav : Object.values(dataFav)} itemsPerPage={12} />
      ) : (
        "Hələ ki Favori məhsulunuz yoxdur."
      )}
    </div>
  );
};

export default FavouritesComponent;
