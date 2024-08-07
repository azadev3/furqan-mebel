import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PiList } from "react-icons/pi";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { PiCaretRightBold } from "react-icons/pi";

type Children = {
  id: number;
  title: string;
  img: string | null;
  children?: Children[];
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

  return (
    <div className="catalog-menu">
      <button className="button-catalog-menu" ref={buttonRef} onClick={handleCatalogMenu}>
        <span>Kataloq</span>
        <PiList className={`list-icon-catalog ${catalogMenu ? "active" : ""}`} />
      </button>

      {/* catalog menu dropdown */}
      <div className={`catalog-toggle-menu ${catalogMenu ? "active" : ""}`} ref={catalogMenuDivRef}>
        {CategoriesForCatalog &&
          CategoriesForCatalog.length > 0 &&
          CategoriesForCatalog.map((item: Catalog) => <CatalogItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

interface CatalogItemProps {
  item: Catalog | Children;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ item }) => {
  const [subCategoryVisible, setSubCategoryVisible] = React.useState<boolean>(false);

  const hasChildren = item.children && item.children.length > 0;
  const hasImages =
    hasChildren && item && item.children && item.children?.length > 0 && item.children.some((child) => child.img);

  return (
    <div
      className="catalog-item"
      onMouseEnter={() => setSubCategoryVisible(true)}
      onMouseLeave={() => setSubCategoryVisible(false)}>
      <div className="sub-category-link">
        <span>{item.title}</span>
        {hasChildren && <PiCaretRightBold className="caret" />}
      </div>
      {hasChildren && subCategoryVisible && (
        <div className="sub-category-menu">
          <div className="links">
            {item &&
              item.children &&
              item.children?.length > 0 &&
              item.children.map((child) => <CatalogItem key={child.id} item={child} />)}
          </div>
          <div className="sub-category-img">
            {/* <span>Məhsullar</span> */}
            <div className="img-wrap">
              {hasImages ? (
                item &&
                item.children &&
                item.children?.length > 0 &&
                item.children.map(
                  (child, i: number) => child.img && i === 0 && <img key={child.id} src={child.img} alt={child.title} />
                )
              ) : (
                <p style={{ textAlign: "center" }}>Hələ ki, əlavə edilmiş şəkil yoxdur.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogs;
