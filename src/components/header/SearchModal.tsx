import React, { SetStateAction } from "react";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { MdGpsNotFixed } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { ProductsInterface } from "../homepageuitils/PopularProducts";
import Loader from "../../uitils/Loader";
import Error from "../../uitils/Error";

type Props = {
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
};

const SearchModal: React.FC<Props> = ({ setSearchModal }) => {
  //if user searched, highlight the searched text if equal result text
  const HighlightedText = ({ text, highlight }: { text: any; highlight: any }) => {
    if (!highlight.trim()) {
      return <>{text}</>
    }

    const parts = text?.split(new RegExp(`(${highlight})`, "i"));
    return parts && parts?.map((part: any, index: any) =>
      part?.toLowerCase() === highlight?.toLowerCase() ? <mark key={index}>{part}</mark> : part
    );
  };

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const {
    data: allProductsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/all_products`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.products;
    },
    staleTime: 1000000,
  });

  //searched items
  const [searchedItems, setSearchedItems] = React.useState<string>("");

  const filterItems =
    allProductsData && allProductsData.length > 0
      ? allProductsData.filter((item: ProductsInterface) => {
          const itemNameLower = item?.title.toLowerCase();
          const searchedItemsLower = searchedItems?.toLowerCase();
          return itemNameLower?.includes(searchedItemsLower);
        })
      : [];

  //outside clicked
  const searchModalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClickSearchModal = (e: MouseEvent) => {
      const isOutside = searchModalRef && searchModalRef.current && !searchModalRef.current.contains(e.target as Node);

      if (isOutside) {
        setSearchModal(false);
      }
    };

    document.addEventListener("mousedown", outsideClickSearchModal);
    return () => document.removeEventListener("mousedown", outsideClickSearchModal);
  }, []);

  return (
    <div className="search-modal">
      <div className="modal" ref={searchModalRef}>
        <div className="topfx">
          <div className="topmodal">
            <h1>Axtarış et</h1>
            <CgClose className="close" onClick={() => setSearchModal(false)} />
          </div>
          <div className="input-area">
            <input
              value={searchedItems}
              type="text"
              placeholder="Məhsul axtar..."
              onChange={(e) => setSearchedItems(e.target.value)}
            />
            <BiSearch className="searchicon" />
          </div>
        </div>

        <div className="content-searched">
          {isLoading && <Loader />}
          {isError && <Error />}
          {searchedItems && filterItems.length > 0 && (
            <span className="result-chain">
              <strong>{filterItems.length}</strong> Məhsul tapıldı
            </span>
          )}
          {searchedItems ? (
            filterItems.length > 0 ? (
              filterItems.map((results: ProductsInterface) => (
                <Link
                  to={`/product_single/${results?.slug?.toLowerCase()}`}
                  className="search-result-item"
                  key={results.id}
                  onClick={() => setSearchModal(false)}>
                  <div className="left-image">
                    <img src={results.img} alt={`${results?.id}-img`} title={results?.title} />
                  </div>
                  <div className="right">
                    <div className="left-informationitem">
                      <span>
                        <HighlightedText text={results?.title} highlight={searchedItems} />
                      </span>
                      <p>
                        <HighlightedText text={results?.category_name} highlight={searchedItems} />
                      </p>
                    </div>
                    <div className="right-prices">
                      <span className="price">{results?.price} ₼</span>
                      {results.discounted_price ? <span className="discount">{results?.discounted_price} ₼</span> : ""}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="resultno">
                <span>
                  <MdGpsNotFixed className="gps" />
                  <span>axtardığınız tapılmadı</span>
                </span>
              </div>
            )
          ) : (
            <div className="resultno">
              <span>
                <CiSearch className="gps" />
                Bir şey axtar
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
