import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useRecoilValue } from "recoil";
import Loader from "../../uitils/Loader";
import { useTranslations } from "../../TranslateContext";

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

  const { translations } = useTranslations(); 

  return (
    <div className="about-and-services-wrapper">
      <div className="about-and-services">
        <h1>{translations['xidmetler_ve_haqqimizda']}</h1>

        <div className="grid-aboutservices">
          <div className="about-services">
            {ServicesData && ServicesData?.length > 0
              ? ServicesData.map((item: Services, index: number) => (
                  <Link to="/about" style={{ textDecoration: "none" }} key={item.id} className="about-service-item">
                    {index === 0 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/f040/4de0/332e2ef09e264a526edf21e5bf2b826f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YTtg00tNWraN72IWwi6g9zOcDt6KjGk-vF2u5DpfIlYdEXn9dfx1MxY~v0eNiJFosc8pGSBSnY8HWo9bEMxeq2kF743ygasmL~7R8ra-s-a20eK1vIkTmUPrbwivlclAXMVBfmV6mGW4k2I0UebV8aOTgJOcw8cCJOmjJc5pneQ-gcVoB9t6LTA0NmWTiRNetkRrtk~5wQnJ-NEQ6hdW~ILb8VcGP5eczdZZlNPNGmR-jwhFxLdGA-sSN8~tr1fqKIamukXVsaB8aaj9J2dwDMJ5kJOCMb5PEwVaZRRLnnhMWbYAnU0Lp9nJ5Qf222yxxO-3EPwIoMFQBYemcO3QEg__"
                        width="633"
                        height="633"
                      />
                    )}
                    {index === 1 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/bb01/3b18/6302cbc49889c842e8795603fde5d064?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nB9oKEDTQt5Ri1qsmHoJVgTlR~C9tCskeaG8p8ZylaPIRn7AcxVhbLQiBhvyD4HQsA8AP2jPFMk9ScIV0jcgI7mJL8CeBD5vUMjVAVuw-MsCpaiDxHmGjibG9MlnY~VzzG7hvFI1WjIeDr0fex0tmq~cVsXvGEWJEbEq-Wp7NcQd7kQSlNdonejhfDm2MbL7enlsln78uetxntycR9fnNUUAiiRnm6HKorFtbKSEu8ffhc-aLeZjiqsYMMlgTeNW6B7SYkngno7sIozorTE3XMZHs2w08TMMLxmgZkfxyeKiDL7vMwHrtAD6xZ1nOmM~Y9O1ITkTEZLptN2Q-2j4Ow__"
                        width="633"
                        height="633"
                      />
                    )}
                    {index === 2 && (
                      <img
                        src="https://s3-alpha-sig.figma.com/img/8a17/db3f/e79bde9090d7c9ede880705d1d96fa3a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m~YHyiMZ39XOdT~idgbshtiRSxwHuj8Ectsv3oUHv2TWJ4hRdsx7CyMC44Z6yetGkUkfPMC5fc0BdcC-z9OYCrG5VvEgCNbu7uRUSYvodue3yrLcL0mtpo4qwruAz1yX47t9uIuu1u4S9zYrT4CbZ5qqVE2U5OEOuxMoBAYnWRJNjghT~2zm4DYbopNF5eLEu5QGpfjMQGMxEbwAv~5r-aZUphf0Bx~0ecoyR4hdvcGBms3cGRnV7tOoeR1ZqVwm6JLSLb5iPpBXhbRNnLSXJH43eQvIznNMtIn3bkAYp~I5PyVOE8P3XNJQGxg4wtCDyBAy1zUzXLvdnS5QED3SsQ__"
                        style={{ borderRadius: "100px" }}
                        width="633"
                        height="633"></img>
                    )}
                    {index === 3 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/1f46/a866/4c338f45748e1130a2c5dae8f93fbbfa?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nkx1vh4z8OHK6FUqKpGERCuf0C~qmcS3Ys1I1lL48wK750vfMwmNIPuuYD9UryUIRAngAdy2SZ6baY2wk2E7CiNHKTAqgc9AozhTf3zZOWiRbcvNuf0oDTMweev3b5VSiq3BQhgt1ZAmOU9DCDs6Z5zvbV8Y3ajxzZ20TazUX-3i1ijFA5JJIqx7LZ02WmJYJ-pcYNkUxpVgZ71~oRwrqzGKtCkMGkCw1gZnlBaW3BKcPkMdzsrMeJQeBIL5TWoMgyx5omXJPZeFV4TbmY89rfYIHJVOd8cl3LFr8UzsgHoAtAZQTG0tZ9DazORchSKRvuIEV2fXjrrbwv6~HJQZDg__"
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
