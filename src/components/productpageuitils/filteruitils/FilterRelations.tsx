import React, { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { rangeMinMaxInputState } from "../../../recoil/Atoms";
import { useTranslations } from "../../../TranslateContext";

type ColorsType = {
  id: number;
  colorname: string;
  colorcode: string;
  boxshadow?: string;
};

type MaterialType = {
  id: number;
  material: string;
};

type StylesType = {
  id: number;
  style: string;
};

type RangeInputType = {
  id: number;
  type: string;
  placeholder: string;
};

const FilterRelations: React.FC = () => {
  const Colors: ColorsType[] = [
    {
      id: 1,
      colorname: "red",
      colorcode: "#ED0000",
    },
    {
      id: 2,
      colorname: "blue",
      colorcode: "#064CFF",
    },
    {
      id: 3,
      colorname: "green",
      colorcode: "#B0ED00",
    },
    {
      id: 4,
      colorname: "white",
      colorcode: "#FFFFFF",
      boxshadow: "0px 0px 11px 0px #6969691F",
    },
    {
      id: 5,
      colorname: "black",
      colorcode: "#000000",
    },
    {
      id: 6,
      colorname: "slowgreen",
      colorcode: "#FAFF1B",
    },

    {
      id: 7,
      colorname: "orange",
      colorcode: "#FF961B",
    },
  ];

  const Materials: MaterialType[] = [
    {
      id: 1,
      material: "Taxta",
    },
    {
      id: 2,
      material: "Şüşə",
    },
    {
      id: 3,
      material: "Plastik",
    },
  ];

  const Styles: StylesType[] = [
    {
      id: 1,
      style: "Minimalist",
    },
    {
      id: 2,
      style: "Avanqard",
    },
    {
      id: 3,
      style: "Minimalist",
    },
    {
      id: 4,
      style: "Minimalist",
    },
  ];

  const RangeInputs: RangeInputType[] = [
    {
      id: 1,
      placeholder: "Min|",
      type: "number",
    },
    {
      id: 2,
      placeholder: "Max|",
      type: "number",
    },
  ];

  //select filtering for according colors
  const [selectedColor, setSelectedColor] = React.useState<number | null>(null);

  const handleSelectColor = (id: number | null) => {
    setSelectedColor(id);
  };

  //select filtering for according materials
  const [selectedMaterial, setSelectedMaterial] = React.useState<number | null>(null);

  const handleSelectMaterials = (id: number | null) => {
    setSelectedMaterial(id);
  };

  //select filtering for according styles
  const [selectedStyle, setSelectedStyle] = React.useState<number | null>(null);

  const handleSelectStyle = (id: number | null) => {
    setSelectedStyle(id);
  };

  const [inputValue, setInputValue] = useRecoilState(rangeMinMaxInputState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.value;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const { translations } = useTranslations();

  return (
    <div className="filter-relations">
      <div className="title-top">
        <img src="../filtericon.svg" alt="" />
        <span>{translations['filter']}</span>
      </div>

      <div className="price-placement">
        <span>{translations['qiymet_araligi_filter']}</span>

        <div className="min-max">
          {RangeInputs.map((inputs: RangeInputType) => (
            <React.Fragment key={inputs?.id}>
              <input
                type={inputs?.type}
                placeholder={inputs?.placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, inputs?.id)}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="range">
          <strong className="price0">{inputValue[1]}</strong>
          <img className="range1" src="../rangegreen.svg" alt="" />
          <input type="range" />
          <img className="range2" src="../rangegreen.svg" alt="" />
          <strong className="price10">{inputValue[2]}</strong>
        </div>

        <div className="filter-for-colors">
          <span>Rəng</span>
          <div className="colors">
            {Colors.map((color: ColorsType) => (
              <span
                className={selectedColor === color.id ? "selected-color" : ""}
                onClick={() => handleSelectColor(color.id)}
                key={color.id}
                style={{ backgroundColor: color?.colorcode, boxShadow: color.id === 4 ? color.boxshadow : "" }}></span>
            ))}
          </div>
        </div>

        <div className="material">
          <span>{translations['material_filter']}</span>

          <div className="materials">
            {Materials.map((item: MaterialType) => (
              <span
                onClick={() => handleSelectMaterials(item.id)}
                key={item.id}
                className={`material-item ${selectedMaterial === item.id ? "selectedmaterial" : ""}`}>
                {item.material}
              </span>
            ))}
          </div>
        </div>

        <div className="for-styles-filtering">
          <span>{translations['terz_filter']}</span>
          <div className="styles-content">
            {Styles.map((item: StylesType) => (
              <span
                onClick={() => handleSelectStyle(item.id)}
                className={`item-style ${selectedStyle === item.id ? "selectedstyle" : ""}`}
                key={item.id}>
                {item.style}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterRelations;
