import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { BlogsType } from "../components/homepageuitils/Blog";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useTranslations } from "../TranslateContext";

const Pagination = ({ data, itemsPerPage }: { data: BlogsType[]; itemsPerPage: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const { translations } = useTranslations();

  return (
    <div className="blogs">
  

      <div className="grid-blogs">
        {data && currentData && data?.length > 0 ? (
          currentData.map((item: BlogsType) => (
            <div key={item.id} className="item-blog">
              <div className="blogimage">
                <img src={item?.img} alt={`${item.id}-image`} title={item?.title} />
              </div>
              <div className="title-top">
                <strong>{translations["blog_ve_yenilikler_title"]}</strong>
                <span>{item?.created_at}</span>
              </div>
              <div className="bottom-title">
                <h1>{item?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: item?.content?.slice(0, 300) }} />
                <Link to={`/blog/${item?.slug}`} className="formore-button">
                  <span>{translations['daha_cox_title']}</span>
                  <img src="../linearrowgreen.svg" alt="arrowright" title="Go to blogs" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
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

export default Pagination;
