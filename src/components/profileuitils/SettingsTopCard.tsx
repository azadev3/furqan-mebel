import React from "react";

const SettingsTopCard: React.FC = () => {
  return (
    <div className="settings-top-card">
      <div className="head-title">
        <span>tənzimləmələr</span>
      </div>
      <div className="content">
        <div className="left-profile">
          <img src="../Avatar.png" alt="" />
        </div>
        <form className="form-for-user">
          <div className="email-name-telephone">
            <div className="name">
              <label>Ad / Soyad</label>
              <input type="text" placeholder="Jhon Doe" />
            </div>
            <div className="email">
              <label>Email</label>
              <input type="email" placeholder="nümunə@gmail.com" />
            </div>
            <div className="telnumber">
              <label>Əlaqə nömrəsi</label>
              <input type="number" placeholder="+9994 70 000 00 00" />
            </div>
          </div>
          <div className="country-city-postalcode">
            <div className="inputs">
              <label>Ölkə</label>
              <select name="" id="">
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Azerbaijan">Azerbaijan</option>
              </select>
            </div>
            <div className="inputs">
              <label>Şəhər</label>
              <select name="" id="">
                <option value="Bakı">Bakı</option>
                <option value="Bakı">Bakı</option>
                <option value="Bakı">Bakı</option>
                <option value="Bakı">Bakı</option>
                <option value="Bakı">Bakı</option>
              </select>
            </div>
            <div className="inputs">
              <label>Postal kod</label>
              <input type="number" placeholder="1234" />
            </div>
          </div>
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsTopCard;
