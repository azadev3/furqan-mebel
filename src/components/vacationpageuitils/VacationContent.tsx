import React from "react";
import { selectedVacationState, VacationsTypes } from "../../routes/VacationsPage";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { useTranslations } from "../../TranslateContext";

type props = {
  data: VacationsTypes[];
};

const VacationContent: React.FC<props> = (data) => {

  const { translations } = useTranslations();

  const selectedVacation = useRecoilValue(selectedVacationState);

  return (
    <div className="vacation-content">
      {data &&
        data.data.length > 0 &&
        data.data.map((item: VacationsTypes) => {
          if (selectedVacation === item.slug) {
            return (
              <div className="descriptions" key={item?.id}>
                <div className="desc" dangerouslySetInnerHTML={{ __html: item?.description }} />
                <div className="requirements" dangerouslySetInnerHTML={{ __html: item?.requirement }} />
                <div className="for-contact">
                  <span>{translations['muraciet_ucun']}</span>
                  <div className="contacts">
                    <Link to="" className="item">
                      <img src="../em.svg" alt="email" />
                      <div className="righttitles">
                        <span>{translations['email_input']}</span>
                        <p>{item?.email}</p>
                      </div>
                    </Link>
                    <Link to="" className="item">
                      <img src="../em.svg" alt="email" />
                      <div className="righttitles">
                        <span>{translations['elaqe_nomresi']}</span>
                        <p>{item?.phone}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default VacationContent;
