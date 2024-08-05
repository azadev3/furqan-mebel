import React from "react";
import { useRecoilState } from "recoil";
import { checkboxCheckedState } from "../../../recoil/Atoms";

type SortItemType = {
  id: number;
  title: string;
};

const Sort: React.FC = () => {
  const SortItems: SortItemType[] = [
    {
      id: 1,
      title: "Ucuzdan - Bahaya",
    },
    {
      id: 2,
      title: "Bahadan - Ucuza",
    },
    {
      id: 3,
      title: "Yeni Məhsullar",
    },
    {
      id: 4,
      title: "Endirimli Məhsullar",
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
        <span>Sort</span>
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
