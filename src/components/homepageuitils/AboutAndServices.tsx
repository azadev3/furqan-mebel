import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useRecoilValue } from "recoil";
import Loader from "../../uitils/Loader";

interface Abouts {
  id: number;
  content: string;
  img: string;
}

interface Services {
  id: number;
  title: string;
  content: string;
  img: string;
}

const AboutAndServices: React.FC = () => {
  //Fetch About data
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const { data: AboutMainData } = useQuery({
    queryKey: ["aboutMainDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/main_about`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.main_about;
    },
    staleTime: 1000000,
  });

  //Fetch services data
  const { data: ServicesData } = useQuery({
    queryKey: ["servicesDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/services`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data.services;
    },
  });

  return (
    <div className="about-and-services-wrapper">
      <div className="about-and-services">
        <h1>Xidmətlərimiz & Haqqımızda</h1>

        <div className="grid-aboutservices">
          <div className="about-services">
            {ServicesData && ServicesData?.length > 0
              ? ServicesData.map((item: Services, index: number) => (
                  <Link to="/about" style={{ textDecoration: "none" }} key={item.id} className="about-service-item">
                    {index === 0 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/f040/4de0/332e2ef09e264a526edf21e5bf2b826f?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=lX0O4L-LQQR7~KXQG8vxIeRVl4aCtAemX6xu0ztfJz24wX55ojO9Qx6vChNsp6ZuSxC1-47Yovzm~BKxMo1umPB5gwDuQmITUVwTWz~LXXqDRhoIC9DPZ5A0btl7UUC8xr27K9Eagr1J~NajebwitWUpqoIecBnNeCD386lp01ugVJwnge1emPSi2HZmx4cIU23KiHTj7S8~9Vh5HjohpmRswqwOOe~3Y4cbckO-ax7HmVTnX932tzQJicI0R4O24i89Gwg89p9R8Aoa-AQLGz~4~S~Sv7ciJ6JsuFyEL8aRN0vRaN3FnslFbeH4EabGDjy80f9TVmgxXAKeWF4CGw__"
                        width="633"
                        height="633"
                      />
                    )}
                    {index === 1 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/bb01/3b18/6302cbc49889c842e8795603fde5d064?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=OoMoJsO6kQFtxW62d4yuHlxanmh-ZgjRyF6NtCwsyTn2zQXx86fugBTuXp3d9dfWcfs~NXMdixkIulowdtUVbBcX01dEtfJdDPEhkt6U0WcGtDrQWkwUyQYITPH0cHP47GPAX~USCyUgu1DUyJ0Nh79USE889IrpdefO97peVmlg90hSGOt3POc46MG7Ye0VGSm2~Gyhk-fduMGSLdn1uIeCjZAILfbO1~uG-zwcvP~w81wjRxYkspzO5SPZKFPuVqpVkvPwHnA2SU8tnE-9W9S3sLfiWD45CyRzV6CAWSJLADTGFbphGHGDydOcoTEtQ3rYpXs2B3D~5WZM5oVuMQ__"
                        width="633"
                        height="633"
                      />
                    )}
                    {index === 2 && (
                      <img
                        src="https://s3-alpha-sig.figma.com/img/8a17/db3f/e79bde9090d7c9ede880705d1d96fa3a?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=jomuSvClArVdvqSlb9ZLmJ~lHsY~yjBOMRPbGQPkFt2nSlsjytkkW-tzCOX-T6o1XhS1ZgrGrJyNnxlySUn4T4Y7P6esV0Rq85U97IpHrtCovFBflg52qd8AZgc6taWBY5rb3AJHqYpUTSGNBm4qkGARuSmAUQ5LnRKB63y~-DCF1Fv3-fwsFxDaiw-oQtCKoNU3e00-SbwPi0pMMJK~S6uvG4lmUAx5HkFn5Ylb3uqTF3oGNSpG~~UEsLcDbW8-52-URtNIl~1LUcvN5L1nqJIyAR9DlKOvOBdgI-ji4U4YV3dJ7Br6XIqbmtgtsClMu8RhNmGMLTzF3D199PTe9Q__"
                        style={{ borderRadius: "100px" }}
                        width="633"
                        height="633"></img>
                    )}
                    {index === 3 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/1f46/a866/4c338f45748e1130a2c5dae8f93fbbfa?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=Urq7da85PLBduZu73oklXLgcxkZzDhWa3WULJSlTmGzDJkpbkaMQxMhdRHDaOvOm~xVIxltOHEkpXzcIdmlxAgCN78EQzNfdRG6TVOrYOjelELkqRxD~n0-qKtgmdaRrxXu3huqSP7v~cFJNLCXUFshqQ6wQJUkOMwU5hcnowPn8Aqj7NAs2TWVw0Xu97g111ZBUdMaPi7kM1yM9EMrp1vSvgffGMN02b61urGxZhdBfQ2KFa13Hmnmv~Iz0eqwG8kmfcQiJS6usgIF607a01CH5xbx-WpDiaKfIaMiHjZmP192hFJ0V6JtEmU0YGIpNZw5Y02uVEoCiGjwhm15TWA__"
                        width="633"
                        height="633"
                      />
                    )}
                    <div className="titles">
                      <h2>{item?.title}</h2>
                      <p>{item?.content}</p>
                    </div>
                    <div className="rightarrow">
                      <img src="../send.svg" alt="send" />
                    </div>
                  </Link>
                ))
              : ""}
          </div>

          <div className="right-area">
            {AboutMainData && AboutMainData?.length > 0 ? (
              AboutMainData.map((item: Abouts) => (
                <div key={item.id} className="right-area-item">
                  <div className="toping">
                    {item.img && <img src={item.img} alt="Right Area" />}
                    <p>{item.content}</p>
                  </div>
                  <div className="btn-area">
                    <Link to="">
                      <span>Daha çox</span>
                      <img src="../linearrowgreen.svg" alt="" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAndServices;
