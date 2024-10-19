import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { CatProductType } from "../components/productpageuitils/filteruitils/CategoriesForFilter";
import FavProductCard from "../features/FavProductCard";

const PaginationLikedProducts = ({ data, itemsPerPage }: { data: CatProductType[]; itemsPerPage: number }) => {

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentData = data && data?.length > 0 ? data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : '';

  return (
    <div className="favorites">
      <div className="favorites-content">
          <FavProductCard favProduct={Object.values(currentData)}/>
      </div>

      <div className="pagination">
        <div className="pagination-content">
          <BsArrowLeftCircle className="prev" onClick={() => handleClick(Math.max(1, currentPage - 1))} />
          <div className="paginations">
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                className={index + 1 === currentPage ? "activepag" : ""}
                onClick={() => handleClick(index + 1)}>
                {index + 1}
              </span>
            ))}
          </div>
          <BsArrowRightCircle className="next" onClick={() => handleClick(Math.min(totalPages, currentPage + 1))} />
        </div>
      </div>
    </div>
  );
};

export default PaginationLikedProducts;
