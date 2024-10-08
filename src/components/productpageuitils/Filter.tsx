import React from "react";
 import FilterRelations from "./filteruitils/FilterRelations";
import CategoriesForFilter from "./filteruitils/CategoriesForFilter";
import { useLocation } from "react-router-dom";

const Filter: React.FC = () => {
  const location = useLocation();

  const isProducts = location.pathname === "/products";

  return (
    <div className="filter">
      {!isProducts && <CategoriesForFilter />}
      <FilterRelations />
    </div>
  );
};

export default Filter;
