import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FavouriteItemType } from "../components/productpageuitils/filteruitils/productmainuitils/PaginationProducts";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useAddFavourite } from "../useAddFavourite";

const PaginationLikedProducts = ({ data, itemsPerPage }: { data: FavouriteItemType[]; itemsPerPage: number }) => {

  const { addFavourite, favouriteItems } = useAddFavourite();

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="favorites">
      <div className="favorites-content">
        {Object.values(currentData).map((item: FavouriteItemType) => (
          <Link to={`/products/${item?.slug.toLowerCase()}`}
            style={{ cursor: "pointer", textDecoration: "none" }}
            className="liked-items"
            key={item.id}>
            <img className="shop-bag" src="../shopbag.svg" alt="show" title="Səbət" />

            <div
              className="add-favourites"
              onClick={(e) => {
                addFavourite(
                  {
                    title: item?.title,
                    price: item?.price,
                    discounted_price: item?.discounted_price,
                    content: item?.content,
                    id: item?.id,
                    img: item?.img,
                    images: item?.images,
                    is_favorite: item?.is_favorite,
                    is_in_cart: item?.is_in_cart,
                    is_popular: item?.is_popular,
                    is_stock: item?.is_stock,
                    parent_category_id: item?.parent_category_id,
                    slug: item?.slug,
                    modules: item?.modules,
                    options: item?.options,
                    category_name: item?.category_name,
                  },
                  e,
                  item?.id
                );
              }}>
              {favouriteItems[item?.id] ? <IoMdHeart className="fav-icon-fill" /> : <CiHeart className="fav-icon" />}
            </div>
            <div className="product-image">
              <img src={item?.img} alt={`${item.id}-image`} title={item?.title} />
            </div>
            <div className="item-details">
              <span className="category-name">{item?.category_name}</span>
              <span className="product-name">{item?.title}</span>
              <div className="prices">
                <span>{item?.price} AZN</span>
                {item.discounted_price ? <article className="discountprice">{item.discounted_price} AZN</article> : ""}
              </div>
            </div>
          </Link>
        ))}
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
