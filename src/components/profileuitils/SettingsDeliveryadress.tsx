import React from "react";

const SettingsDeliveryadress: React.FC = () => {
  return (
    <div className="delivery-adress">
      <div className="head-title">
        <span>çatdırılma adresi</span>
      </div>

      <form className="form-area">
        <div className="name-surname">
          <div className="name">
            <label>Ad</label>
            <input type="text" placeholder="Jhon" />
          </div>
          <div className="surname">
            <label>Soyad</label>
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
            <label>Şəhər</label>
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
          <label>Email</label>
          <input type="email" placeholder="nümunə@gmail.com" />
        </div>
        <div className="telnumber">
          <label>Əlaqə nömrəsi</label>
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
