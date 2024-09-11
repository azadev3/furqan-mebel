import React, { ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { rangeMinMaxInputState } from "../../../recoil/Atoms";
import { useTranslations } from "../../../TranslateContext";
import axios from "axios";
import { Baseurl } from "../../../api/Baseurl";
import { SelectedLanguageState } from "../../header/SelectedLanguage";
import { OthersFilterData, PriceMinMaxState } from "../ProductsMain";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";

type Optionsfilter = {
  id: number;
  icon: string | null;
  title: string;
};

interface FilterData {
  id: number;
  title: string;
  options: Optionsfilter[];
}

type RangeInputType = {
  id: number;
  type: string;
  placeholder: string;
};

const FilterRelations: React.FC = () => {
  const activeLang = useRecoilValue(SelectedLanguageState);
  const { translations } = useTranslations();

  // get filters
  const { data: filterData } = useQuery<FilterData[]>({
    queryKey: ["filterDataKey", activeLang],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/filters`, {
        headers: {
          "Accept-Language": activeLang,
        },
      });
      return response.data?.filters;
    },
  });

  const [__, setPriceMinMax] = useRecoilState(PriceMinMaxState);

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

  //select filtering for according MATERIALS
  const [selectedMaterial, setSelectedMaterial] = React.useState<{ [key: number]: boolean }>({});
  const [___, setOthersFilterData] = useRecoilState(OthersFilterData);

  const handleSelectMaterials = async (id: number) => {
    setSelectedMaterial((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  React.useEffect(() => {
    const selectedOptionIds = Object.keys(selectedMaterial)
      .filter((key) => selectedMaterial[parseInt(key)])
      .map((key) => parseInt(key));

    const params = selectedOptionIds.length ? selectedOptionIds.map((id) => `option_id[]=${id}`).join("&") : "";

    axios
      .get(`${Baseurl}/all_products?${params}`, {
        headers: {
          "Accept-Language": activeLang,
        },
      })
      .then((response) => {
        setOthersFilterData(response.data?.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedMaterial]);

  //Min max inputs
  const [inputValue, setInputValue] = useRecoilState(rangeMinMaxInputState);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // Debounce
  const debouncedFetchProducts = React.useCallback(
    _.debounce(async (min: string, max: string) => {
      try {
        const response = await axios.get(`${Baseurl}/all_products?min_price=${min}&max_price=${max}`, {
          headers: {
            "Accept-Language": activeLang,
          },
        });
        if (response.data) {
          setPriceMinMax(response.data?.products);
        }
      } catch (error) {
        console.error("İstek başarısız oldu:", error);
      }
    }, 500),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.value;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === 1) {
      setMinPrice(value);
    } else if (id === 2) {
      setMaxPrice(value);
    }

    debouncedFetchProducts(id === 1 ? value : minPrice, id === 2 ? value : maxPrice);
  };

  const [category, setCategory] = React.useState<boolean>(false);

  const openSortCategory = () => {
    setCategory((prevCategory) => !prevCategory);
  };

  return (
    <React.Fragment>
      <div className="filter-relations">
        <div className="title-top">
          <img src="../filtericon.svg" alt="" />
          <span>{translations["filter"]}</span>
        </div>

        <div className="price-placement">
          <span>{translations["qiymet_araligi_filter"]}</span>

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

          {filterData && filterData.length > 0
            ? filterData.map((item: FilterData) => (
                <div className="material" key={item.title}>
                  <span>{item.title}</span>
                  <div className="materials">
                    {item.options.map((option: Optionsfilter) => (
                      <span
                        onClick={() => handleSelectMaterials(option.id)}
                        key={option.id}
                        className={`material-item ${selectedMaterial[option.id] ? "selectedmaterial" : ""}`}>
                        {option.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="filter-relations-mobile" style={{ display: "none" }}>
      <div className="sort">
      <div className="sort-categ" onClick={openSortCategory}>
      <span>{translations["filter"]}</span>
      <img src="../down.svg" alt="" style={{ transform: category ? "rotate(180deg)" : "" }} />
      </div>
      <div className={`sort-category-submenu ${category ? "showed" : ""}`}>
       
       
      <div className="price-placement">
          <span>{translations["qiymet_araligi_filter"]}</span>

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

          {filterData && filterData.length > 0
            ? filterData.map((item: FilterData) => (
                <div className="material" key={item.title}>
                  <span>{item.title}</span>
                  <div className="materials">
                    {item.options.map((option: Optionsfilter) => (
                      <span
                        onClick={() => handleSelectMaterials(option.id)}
                        key={option.id}
                        className={`material-item ${selectedMaterial[option.id] ? "selectedmaterial" : ""}`}>
                        {option.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            : ""}
        </div>
       
      </div>
    </div>
      </div>
    </React.Fragment>
  );
};

export default FilterRelations;
