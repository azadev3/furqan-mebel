import React from "react";
import { selectedVacationState, VacationsTypes } from "../../routes/VacationsPage";
import { useRecoilState } from "recoil";
import DOMPurify from "dompurify";

type Props = {
  data: VacationsTypes[];
};

const Vacations: React.FC<Props> = (data) => {
  const [selectedVacation, setSelectedVacation] = useRecoilState(selectedVacationState);

  const handleSelectVacation = (slug: string) => {
    setSelectedVacation(slug);
  };

  //selectedVacation default initial value
  const firstData = data?.data?.find((item: VacationsTypes, i: number) => {
    return i === 0 ? item?.slug : "";
  });

  React.useEffect(() => {
    if (selectedVacation === "" && data && data.data && firstData) {
      setSelectedVacation(firstData?.slug);
    }
  }, []);

  return (
    <div className="vacations">
      {data && data?.data && data?.data?.length > 0
        ? data?.data?.map((item: VacationsTypes) => (
            <div
              key={item.id}
              className={`vacation-item ${selectedVacation === item.slug ? "selectedvacation" : ""}`}
              onClick={() => handleSelectVacation(item?.slug)}>
              <div className="top-info">
                <span>{item?.title}</span>
                <p>
                  <img src="../lok.svg" alt="" />
                  {item?.branch}
                </p>
              </div>

              <div
                className="content-vacation-item"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
              />
            </div>
          ))
        : ""}
    </div>
  );
};

export default Vacations;
