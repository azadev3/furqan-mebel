import React from "react";
import { useTranslations } from "../../TranslateContext";

const SettingsDeliveryadress: React.FC = () => {

  const { translations } = useTranslations();

  return (
    <div className="delivery-adress">
      <div className="head-title">
        <span>çatdırılma adresi</span>
      </div>

      <form className="form-area">
        <div className="name-surname">
          <div className="name">
            <label>{translations['ad_input']}</label>
            <input type="text" placeholder="Jhon" />
          </div>
          <div className="surname">
            <label>{translations['soyad_input']}</label>
            <input type="text" placeholder="Doe" />
          </div>
        </div>
        <div className="company">
          <label>Şirkət adı (optional)</label>
          <input type="text" placeholder="Şirkət adı" />
        </div>
        <div className="adress">
          <label>Adres</label>
          <input type="text" placeholder="Road No. 13/x, House no. 1320/C, Flat No. 5D" />
        </div>
        <div className="country">
          <label>Ölkə</label>
          <select name="" id="">
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Azerbaijan">Azerbaijan</option>
          </select>
        </div>
        <div className="city-postalcode">
          <div className="city">
            <label>{translations['seher_input']}</label>
            <select name="" id="">
              <option value="Bakı">Bakı</option>
              <option value="Bakı">Bakı</option>
              <option value="Bakı">Bakı</option>
              <option value="Bakı">Bakı</option>
              <option value="Bakı">Bakı</option>
            </select>
          </div>
          <div className="postalcode">
            <label>Postal kod</label>
            <input type="number" placeholder="1345" />
          </div>
        </div>

        <div className="email">
          <label>{translations['email_input']}</label>
          <input type="email" placeholder="nümunə@gmail.com" />
        </div>
        <div className="telnumber">
          <label>{translations['elaqe_nomresi']}</label>
          <input type="number" placeholder="+994 70 000 00 00" />
        </div>

        <button type="submit">
          Saxla
        </button>
      </form>
    </div>
  );
};

export default SettingsDeliveryadress;
