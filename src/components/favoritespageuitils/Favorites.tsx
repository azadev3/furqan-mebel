import React from "react";
import PaginationLikedProducts from "../../uitils/PaginationLikedProducts";

const Favorites: React.FC = () => {
  const favItems = localStorage.getItem("favourites");

  const dataFav = favItems ? JSON.parse(favItems) : [];

  return (
    <div className="favorites">
      <PaginationLikedProducts data={Array.isArray(dataFav) ? dataFav : Object.values(dataFav)} itemsPerPage={8} />
    </div>
  );
};

export default Favorites;
