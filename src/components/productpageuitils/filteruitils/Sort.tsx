import React from "react";
import { useRecoilState } from "recoil";
import { checkboxCheckedState } from "../../../recoil/Atoms";
import { useTranslations } from "../../../TranslateContext";

type SortItemType = {
  id: number;
  title: string;
};

const Sort: React.FC = () => {

  const { translations } = useTranslations();

  const SortItems: SortItemType[] = [
    {
      id: 1,
      title: translations['ucuzdan_bahaya_filter'],
    },
    {
      id: 2,
      title: translations['bahadan_ucuza_filter'],
    },
    {
      id: 3,
      title: translations['yeni_mehsullar_filter'],
    },
    {
      id: 4,
      title: translations['endirimli_mehsullar_filter'],
    },
  ];

  const [category, setCategory] = React.useState<boolean>(false);

  const openSortCategory = () => {
    setCategory((prevCategory) => !prevCategory);
  };

  //checkboxes
  const [checkboxChecked, setChecked] = useRecoilState(checkboxCheckedState);

  const handleCheckboxClick = (id: any) => {
    setChecked((prevChecked) => prevChecked ? null : id);
  };


  return (
    <div className="sort">
      <div className="sort-categ" onClick={openSortCategory}>
        <span>{translations['sort']}</span>
        <img src="../down.svg" alt="" style={{ transform: category ? "rotate(180deg)" : "" }} />
      </div>
      <div className={`sort-category-submenu ${category ? "showed" : ""}`}>
        {SortItems.map((item: SortItemType) => (
          <div
            key={item.id}
            className={`checkbox ${checkboxChecked === item?.id ? "checked-checkbox" : ""}`}
            onClick={() => handleCheckboxClick(item.id)}>
            <input type="checkbox" checked={checkboxChecked === item?.id} readOnly/>
            <span>{item?.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
