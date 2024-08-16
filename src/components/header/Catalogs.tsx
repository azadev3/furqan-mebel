import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PiList } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { selectedCategoryStateProductPage } from "../../recoil/Atoms";
import { useTranslations } from "../../TranslateContext";

type Children = {
  id: number;
  title: string;
  img: string | null;
};

interface Catalog {
  id: number;
  title: string;
  img: string | null;
  children: Children[];
}

const Catalogs: React.FC = () => {
  // FETCH CATEGORIES
  const selectedLang = useRecoilValue(SelectedLanguageState);

  const { data: CategoriesForCatalog } = useQuery<Catalog[]>({
    queryKey: ["categoriesForCatalog", selectedLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/categories`, {
        headers: {
          "Accept-Language": selectedLang,
        },
      });
      if (response.data && response.data?.categories && response.data?.categories?.length > 0) {
        return response.data?.categories;
      }
    },
    staleTime: 600000,
  });

  const [catalogMenu, setCatalogMenu] = React.useState<boolean>(false);

  const handleCatalogMenu = () => {
    setCatalogMenu((prevMenu) => !prevMenu);
  };

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const catalogMenuDivRef = React.useRef<HTMLDivElement | null>(null);

  //outside close
  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        catalogMenuDivRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        !catalogMenuDivRef.current.contains(e.target as Node)
      ) {
        setCatalogMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  //hover if open submenus
  const [sub, setSub] = React.useState<number | null>(null);

  const handleOpenSubMenu = (id: number | null) => {
    setSub(id);
  };

  const navigate = useNavigate();
  const [_, setSelectedCategory] = useRecoilState(selectedCategoryStateProductPage);

  const { translations } = useTranslations();

  return (
    <div className="catalog-menu">
      <button className="button-catalog-menu" ref={buttonRef} onClick={handleCatalogMenu}>
        <span>{translations['nav_catalog']}</span>
        <PiList className={`list-icon-catalog ${catalogMenu ? "active" : ""}`} />
      </button>

      {/* catalog menu dropdown */}
      <div className={`catalog-toggle-menu ${catalogMenu ? "active" : ""}`} ref={catalogMenuDivRef}>
        {CategoriesForCatalog && CategoriesForCatalog?.length > 0
          ? CategoriesForCatalog?.map((item: Catalog) => (
              <div className="link-container" key={item?.id}>
                {/* main items */}
                <div
                  onClick={() => {
                    if (item && item?.children?.length <= 0) {
                      navigate("/products");
                      setCatalogMenu(false);
                      setSub(null);
                      setSelectedCategory(item?.id);
                    }
                  }}
                  style={{ cursor: item && item?.children?.length <= 0 ? "pointer" : "" }}
                  className="catalog-link"
                  onMouseEnter={() => handleOpenSubMenu(item?.id)}
                  onMouseLeave={() => setSub(null)}>
                  <span>{item?.title}</span>
                  {item && item?.children && item?.children?.length > 0 ? (
                    <FaAngleDown className={`down ${sub === item?.id ? "active" : ""}`} />
                  ) : (
                    ""
                  )}
                  {/* sub items */}
                  <div className={`sub-catalog ${sub === item?.id && item?.children?.length > 0 ? "active" : ""}`}>
                    <div className="left">
                      {item && item.children && item.children?.length > 0 && sub && sub === item?.id
                        ? item.children?.map((item: Children) => (
                            <Link
                              to="/products"
                              onClick={() => {
                                setCatalogMenu(false);
                                setSub(null);
                                //if category title includes on the mini category title
                                //select main category title on the category page
                                const ifIncludesItemTitleOnTheMainCategory =
                                  CategoriesForCatalog && CategoriesForCatalog.length > 0
                                    ? CategoriesForCatalog.find(
                                        (cat: Catalog) =>
                                          cat.children &&
                                          cat.children.length > 0 &&
                                          cat.children.some((child) => child.title === item.title)
                                      )
                                    : null;

                                if (ifIncludesItemTitleOnTheMainCategory) {
                                  setSelectedCategory(ifIncludesItemTitleOnTheMainCategory?.id);
                                }
                              }}
                              key={item?.id}
                              className="catalog-link-inner">
                              {item?.title}
                            </Link>
                          ))
                        : ""}
                    </div>

                    <div className="right">
                      {item && item.img ? (
                        <img src={item && item.img ? item.img : ""} alt={`${item?.id}-image`} title={item?.title} />
                      ) : (
                        <p>Hələ ki, heç bir məhsul şəkili əlavə edilməyib.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Catalogs;
