import React from "react";
import { DashboardLinksType } from "../../routes/Dashboard";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { dashboarLinksActiveState, profileDropdownState, UserIsAuthState } from "../../recoil/Atoms";
import { atom, useRecoilState } from "recoil";
import getCookie from "../../getCookie";
import { UserInfo } from "../profileuitils/DashboardContent";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";
import { useTranslations } from "../../TranslateContext";

export const userInfoState = atom<UserInfo | null>({
  key: 'userinfostate',
  default: null,
});

type prop = {
  userRef: any;
  profileDropdownModalRef: any;
};

const ProfileDropdown: React.FC<prop> = (prop) => {

  const { translations } = useTranslations();

  const DashboardLinkItems: DashboardLinksType[] = [
    {
      id: 1,
      title: `${translations['dashboard']}`,
      activeIcon: "../whitedashboardicon.svg",
      deactiveIcon: "../dashboardicon.svg",
      to: "/profile/dashboard",
    },
    {
      id: 2,
      title: `${translations['sifaris_tarixcesi']}`,
      activeIcon: "../Storefront.svg",
      deactiveIcon: "../Storefrontb.svg",
      to: "/profile/orderhistory",
    },
    {
      id: 3,
      title: `${translations['sevimlilerim']}`,
      activeIcon: "../whitedashboardicon.svg",
      deactiveIcon: "../Heart.svg",
      to: "/profile/favourites",
    },
    // {
    //   id: 4,
    //   title: "Tənzimləmələr",
    //   activeIcon: "../Gearw.svg",
    //   deactiveIcon: "../Gear.svg",
    //   to: "/profile/settings",
    // },
    {
      id: 5,
      title: `${translations['cixis']}`,
      activeIcon: "../SignOut.svg",
      deactiveIcon: "../SignOut.svg",
      to: "",
    },
  ];

  //active - deactive dashboard links on profile dropdown menu
  const [active, setActive] = useRecoilState(dashboarLinksActiveState);

  //if location not the /profile page (dynamic) keep at the setActive(null)
  const dynamicLocationProfile = useMatch("/profile/*");

  const [profileDropdownMenu, setProfileDropdownMenu] = useRecoilState(profileDropdownState);

  const handleNavigateToLink = (id: number | null) => {
    if (id === 5 || !dynamicLocationProfile) {
      setActive(null);
    } else {
      setActive(id);
    }
    setProfileDropdownMenu(false);
  };

  //outside clicked, close the profileDropdownMenu
  React.useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        prop.profileDropdownModalRef.current &&
        prop.userRef.current &&
        !prop.profileDropdownModalRef.current.contains(event.target as Node) &&
        !prop.userRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getUserInfo = getCookie("userInfo");
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  React.useEffect(() => {
    if (getUserInfo) {
      const parsedInfo = JSON.parse(decodeURIComponent(getUserInfo));
      setUserInfo(parsedInfo);
    }
  }, []);

  const [__, setProfileDropdown] = useRecoilState(profileDropdownState);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [_, setAuth] = useRecoilState(UserIsAuthState);
  const navigate = useNavigate();
  const LogOutUser = async () => {
    setLoading(true);
    try {
      const token = getCookie("accessToken");
      const response = await axios.get(`${Baseurl}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Hesabdan çıxılır...", {
          position: "bottom-right",
        });
        document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None";
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None";
        
        Object.keys(localStorage).forEach((key) => {
          if(key !== "favourites" && key !== "basket") {
            localStorage.removeItem(key);
          }
        });

        const timeout = setTimeout(() => {
          navigate("/");
          setAuth(false);
          setProfileDropdown(false);
        }, 700);
        return () => clearTimeout(timeout);
      } else {
        response.status;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Bir xəta baş verdi", {
            position: "bottom-right",
          });
        } else {
          toast.error("Bir xəta baş verdi", {
            position: "bottom-right",
          });
        }
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div aria-modal="true" aria-hidden={!profileDropdownMenu} className="profileDropdownMenu">
      <div className="head-profile-dropdown">
        <div className="profile">
          <img src="../Person.svg" alt="person" />
        </div>
        <div className="texts">
          <span>{`${userInfo?.name} ${userInfo?.surname}`}</span>
          <p>{userInfo?.email}</p>
        </div>
      </div>
      <div className="content">
        <nav className="links">
          {DashboardLinkItems.map((item: DashboardLinksType) => {
            const logOutLink = item?.id === 5;
            if (logOutLink) {
              return (
                <li onClick={LogOutUser} key={item?.id} className="link-item-profilemenu">
                  <img src={item?.deactiveIcon} alt={`${item?.id}-icon`} title={item?.title} />
                  <span>{loading ? `${translations['logout_title']}` : item?.title}</span>
                </li>
              );
            } else {
              return (
                <Link
                  key={item?.id}
                  onClick={() => handleNavigateToLink(item?.id)}
                  to={item.to ? item.to : ""}
                  className={`link-item-profilemenu ${active === item?.id ? "active-link" : ""}`}>
                  <img
                    src={active === item?.id ? item?.activeIcon : item?.deactiveIcon}
                    alt={`${item?.id}-icon`}
                    title={item?.title}
                  />
                  <span>{item?.title}</span>
                </Link>
              );
            }
          })}
        </nav>
      </div>
    </div>
  );
};

export default ProfileDropdown;
