import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkboxCheckedState } from "../../../recoil/Atoms";
import { useTranslations } from "../../../TranslateContext";
import axios from "axios";
import { Baseurl } from "../../../api/Baseurl";
import { SelectedLanguageState } from "../../header/SelectedLanguage";
import { PriceAscDataState } from "../ProductsMain";

type SortItemType = {
  id: number;
  title: string;
};

const Sort: React.FC = () => {
  const activeLang = useRecoilValue(SelectedLanguageState);

  const { translations } = useTranslations();

  const SortItems: SortItemType[] = [
    {
      id: 1,
      title: translations["ucuzdan_bahaya_filter"],
    },
    {
      id: 2,
      title: translations["bahadan_ucuza_filter"],
    },
    {
      id: 3,
      title: translations["yeni_mehsullar_filter"],
    },
    {
      id: 4,
      title: translations["endirimli_mehsullar_filter"],
    },
  ];

  const [category, setCategory] = React.useState<boolean>(false);

  const openSortCategory = () => {
    setCategory((prevCategory) => !prevCategory);
  };

  //checkboxes
  const [checkboxChecked, setChecked] = useRecoilState(checkboxCheckedState);
  const [_, setPriceAscData] = useRecoilState(PriceAscDataState);

  // filtering checkbox
  const handleCheckboxClick = async (id: any) => {
    if (checkboxChecked === id) {
      setChecked(null);
      return;
    }

    setChecked(id);
    // ucuzdan bahaya
    if (id === 1) {
      try {
        const response = await axios.get(`${Baseurl}/all_products?sort=price_asc`, {
          headers: {
            "Accept-Language": activeLang,
          },
        });
        if (response.data) {
          setPriceAscData(response.data?.products);
        }
      } catch (error) {
        console.error("İstek başarısız oldu:", error);
      }
    } else if (id === 2) {
      // bahadan ucuza
      try {
        const response = await axios.get(`${Baseurl}/all_products?sort=price_desc`, {
          headers: {
            "Accept-Language": activeLang,
          },
        });
        if (response.data) {
          setPriceAscData(response.data?.products);
        }
      } catch (error) {
        console.error("İstek başarısız oldu:", error);
      }
    } else if (id === 3) {
      // yeni mehsullar
      try {
        const response = await axios.get(`${Baseurl}/all_products?sort=new_products`, {
          headers: {
            "Accept-Language": activeLang,
          },
        });
        if (response.data) {
          setPriceAscData(response.data?.products);
        }
      } catch (error) {
        console.error("İstek başarısız oldu:", error);
      }
    } else if (id === 4) {
      // endirimli mehsullar
      try {
        const response = await axios.get(`${Baseurl}/all_products?sort=discounted_products`, {
          headers: {
            "Accept-Language": activeLang,
          },
        });
        if (response.data) {
          setPriceAscData(response.data?.products);
        }
      } catch (error) {
        console.error("İstek başarısız oldu:", error);
      }
    }
  };

  return (
    <div className="sort">
      <div className="sort-categ" onClick={openSortCategory}>
        <span>{translations["sort"]}</span>
        <img src="../down.svg" alt="" style={{ transform: category ? "rotate(180deg)" : "" }} />
      </div>
      <div className={`sort-category-submenu ${category ? "showed" : ""}`}>
        {SortItems.map((item: SortItemType) => (
          <div
            key={item.id}
            className={`checkbox ${checkboxChecked === item?.id ? "checked-checkbox" : ""}`}
            onClick={() => handleCheckboxClick(item.id)}>
            <input type="checkbox" checked={checkboxChecked === item?.id} readOnly />
            <span>{item?.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
