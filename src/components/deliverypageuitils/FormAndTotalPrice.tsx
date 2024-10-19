import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import getCookie from "../../getCookie";
import { useTranslations } from "../../TranslateContext";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { userInfoState } from "../header/ProfileDropdown";

const FormAndTotalPrice: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    city: "",
    telephone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = getCookie("accessToken");
      const response = await axios.post(`${Baseurl}/orders`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        localStorage.removeItem("basket");
        navigate("/paymentsuccess");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.warning("Sifariş vermək üçün, səbətinizə məhsul əlavə edin.", {
            position: "top-center",
          });
        }
      }
    }
  };

  const { translations } = useTranslations();
  const getUserInfo = getCookie("userInfo");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  React.useEffect(() => {
    if (getUserInfo) {
      const parsedInfo = JSON.parse(decodeURIComponent(getUserInfo));
      setUserInfo(parsedInfo);
    }
  }, [getUserInfo]);

  const isNullAdress = userInfo && (userInfo === null); 

  return (
    <div className="form-and-total-price">
      <div className="top-form">
        <div className="form">
          <h1>Çatdırılma məlumatları</h1>
          <form onSubmit={handleSubmit}>
            <div className="name-surname">
              <div className="leftname">
                <label>{translations['ad_input']}</label>
                <input
                  required={ isNullAdress ? false : true }
                  type="text"
                  name="name"
                  placeholder="John"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="rightsurname">
                <label>{translations['soyad_input']}</label>
                <input
                  required={ isNullAdress ? false : true }
                  type="text"
                  name="surname"
                  placeholder="Doe"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="zipcode-city">
              <div className="leftname">
                <label>{translations['seher_input']}</label>
                <select required={ isNullAdress ? false : true } name="city" value={formData.city} onChange={handleChange}>
                  <option value="">Şəhər seçin</option>
                  <option value="Sumqayıt">Sumqayıt</option>
                  <option value="Lənkəran">Lənkəran</option>
                  <option value="Xaçmaz">Xaçmaz</option>
                  <option value="Şəki">Şəki</option>
                  <option value="Quba">Quba</option>
                  <option value="Qusar">Qusar</option>
                  <option value="Naxçıvan">Naxçıvan</option>
                </select>
              </div>
              <div className="tel">
                <label>{translations['elaqe_nomresi']}</label>
                <input
                  required={ isNullAdress ? false : true }
                  type="text"
                  name="telephone"
                  placeholder="+994 70 123 45 67"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button">
              <button type="submit">
                <span>{translations["davam_et"]}</span>
                <img src="../eee.svg" alt="continue" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAndTotalPrice;
