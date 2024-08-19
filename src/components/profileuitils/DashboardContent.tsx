import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import OrderTable from "./OrderTable";
import getCookie from "../../getCookie";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";

type StatisticsType = {
  id: number;
  title: string;
  count: string;
  icon: string;
};
export interface UserInfo {
  id: any;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string | null,
}

export interface updateDataUser {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  email_verified_at: string;
  is_agree: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface ProfileUser {
  id: number,
  name: string,
  surname: string,
  email: string,
  phone: string,
  user_info: any,
  all_orders: number | string,
  prepared_orders: number | string,
  completed_orders: number | string,
}

const DashboardContent: React.FC = () => {

  const token = getCookie("accessToken");

  //get profile 
  const [profileData, setProfileData] = React.useState<ProfileUser>();
  const getProfile = async () => {
    try {
      const response = await axios.get(`${Baseurl}/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if(response.data) {
        console.log(response.data);
        setProfileData(response.data?.user)
      } else {
        console.log(response.status);
      }
    } catch (error) { 
      console.log(error);
    }
  } 

  //statistics data
  const Statistics: StatisticsType[] = [
    {
      id: 1,
      title: "Bütün sifarişlər",
      count: `${profileData && profileData?.all_orders ? profileData?.all_orders : "0"}`,
      icon: "../Rocket.svg",
    },
    {
      id: 2,
      title: "Hazırlanan sifarişlər",
      count: `${profileData && profileData?.completed_orders ? profileData?.completed_orders : "0"}`,
      icon: "../Receipt.svg",
    },
    {
      id: 3,
      title: "Tamamlanmış sifarişlər",
      count: `${profileData && profileData?.prepared_orders ? profileData?.prepared_orders : "0"}`,
      icon: "../Package.svg",
    },
  ];

  const getUserInfo = getCookie("userInfo");
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  React.useEffect(() => {
    if (getUserInfo) {
      const parsedInfo = JSON.parse(decodeURIComponent(getUserInfo));
      setUserInfo(parsedInfo);
    }
  }, []);

  //edit profile informations
  const [editIsClick, setEditIsClick] = React.useState<boolean>(false);
  const [isInput, setIsInput] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  // input values
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const handleEditProfileInformations = () => {
    setEditIsClick(true);
  };

  React.useEffect(() => {
    if (name || surname || email || phone) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [name, surname, email, phone]);

  //update profile
  const getUpdateProfile = async () => {
    setLoading(true);
    try {
      const token = getCookie("accessToken");

      const values = {
        name: name || userInfo?.name,
        surname: surname || userInfo?.surname,
        email: email || userInfo?.email,
        phone: phone || userInfo?.phone,
      };

      const response = await axios.post(`${Baseurl}/update`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Məlumatlarınız müvəffəqiyyətlə dəyişdirildi.", {
          position: "top-center",
        });
        const userUpdateData: updateDataUser = response.data?.data;

        const JsonConverter = JSON.stringify(userUpdateData);

        document.cookie = `userInfo=${encodeURIComponent(JsonConverter)}; Secure; SameSite=None`;

        const timeout = setTimeout(() => {
          window.location.reload();
        }, 800);
        return () => clearTimeout(timeout);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          toast.error("Bir xəta oldu. Yenidən yoxlayın və ya daha sonra cəhd edin.", {
            position: "top-center",
          });
        } else {
          toast.error("Bir xəta oldu. Yenidən yoxlayın və ya daha sonra cəhd edin.", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Bir xəta oldu. Yenidən yoxlayın və ya daha sonra cəhd edin.", {
          position: "top-center",
        });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="dashboard-route-content">
      <div className="top-username-and-text">
        <h3>Salam, {userInfo?.name}</h3>
        <p>
          Hesabınızın idarə panelindən, siz asanlıqla <Link to="">Son Sifarişlərinizi</Link> yoxlaya və baxa,{" "}
          <Link to="">Göndərmə</Link> və <Link to="">Faktura Ünvanlarınızı</Link> idarə edə və{" "}
          <Link to="">Parolunuzu və Hesab məlumatlarınızı</Link> redaktə edə bilərsiniz.
        </p>
      </div>

      <div className="account-informations">
        <div className="information-box">
          <h4 className="information-title">Hesab məlumatları</h4>

          <div className="profile-content">
            <div className="top-profile-info">
              <div className="profile">
                <div className="left-user">
                  <img
                    style={{ objectFit: userInfo ? "scale-down" : "cover" }}
                    src={userInfo ? "../profileicon.svg" : "../us.svg"}
                    alt="user"
                    title={`${userInfo?.name} ${userInfo?.surname}`}
                  />
                </div>
                <div className="text">
                  {editIsClick ? (
                    <>
                      <strong>Ad:</strong>
                      <input
                        type="text"
                        name="username"
                        placeholder={`${userInfo?.name}`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      />
                      <strong>Soyad:</strong>
                      <input
                        type="text"
                        name="username"
                        placeholder={`${userInfo?.surname}`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                      />
                    </>
                  ) : (
                    <span className="username">{`${userInfo?.name} ${userInfo?.surname}`}</span>
                  )}
                  <p className="desc">{`ID: ${userInfo?.id} ${userInfo?.name}`}</p>
                </div>
              </div>

              <div className="email-and-tel">
                {editIsClick ? (
                  <React.Fragment>
                    <div className={`email ${editIsClick ? "converted-inputs" : ""}`}>
                      <strong>Email:</strong>
                      <input
                        type="email"
                        placeholder={userInfo?.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className={`tel ${editIsClick ? "converted-inputs" : ""}`}>
                      <strong>Əlaqə nömrəsi:</strong>
                      <input
                        type="text"
                        placeholder={userInfo?.phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="email">
                      <strong>Email:</strong>
                      <p>{userInfo?.email}</p>
                    </div>
                    <div className="tel">
                      <strong>Əlaqə nömrəsi:</strong>
                      <p>{userInfo?.phone}</p>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>

            {editIsClick ? (
              <div className="after-buttons">
                <button className={`edit-profile-informations-button-isactive ${loading ? "deactived" : ""}`} onClick={() => setEditIsClick(false)}>
                  <span>Ləğv et</span>
                  <IoClose className="close-icon" />
                </button>
                <button
                  disabled={loading ? true : false}
                  className={`edit-profile-informations-button ${isInput ? "active" : loading ? "deactived" : ""}`}
                  onClick={getUpdateProfile}>
                  {loading ? "Əməliyyat gedir..." : "Dəyişikliyi təsdiqlə"}
                </button>
              </div>
            ) : (
              <button className="edit-profile-informations-button" onClick={handleEditProfileInformations}>
                Düzəliş et
              </button>
            )}
          </div>
        </div>

        <div className="statistics">
          {Statistics.map((item: StatisticsType) => (
            <div key={item.id} className="statistics-item">
              <div className="icon">
                <img src={item?.icon} alt={`${item?.id}-icon`} title={item?.count} />
              </div>
              <div className="texts">
                <strong>{item?.count}</strong>
                <span>{item?.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderTable />
    </div>
  );
};

export default DashboardContent;
