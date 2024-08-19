import React from "react";
import PaginationLikedProducts from "../../uitils/PaginationLikedProducts";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";

type props = {
  products: CatProductType[],
}

const Favorites: React.FC<props> = ({products}) => {
 
  return (
    <div className="favorites">
      <PaginationLikedProducts data={products} itemsPerPage={8} />
    </div>
  );
};

export default Favorites;
