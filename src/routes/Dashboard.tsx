import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import DashboardContent from "../components/profileuitils/DashboardContent";
import OrderHistory from "../components/profileuitils/OrderHistory";
import OrderDetails from "../components/profileuitils/OrderDetails";
import FavouritesComponent from "../components/profileuitils/FavouritesComponent";
import { IoClose } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { dashboarLinksActiveState, UserIsAuthState } from "../recoil/Atoms";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import getCookie from "../getCookie";
import { toast } from "react-toastify";
import { useTranslations } from "../TranslateContext";

export type DashboardLinksType = {
  id: number;
  title: string;
  to?: string;
  activeIcon?: string;
  deactiveIcon?: string;
};

//dashboard links

const Dashboard: React.FC = () => {

  const { translations } = useTranslations();

  const DashboardLinkItems: DashboardLinksType[] = [
    {
      id: 1,
      title: `${translations["dashboard"]}`,
      activeIcon: "../whitedashboardicon.svg",
      deactiveIcon: "../dashboardicon.svg",
      to: "/profile/dashboard",
    },
    {
      id: 2,
      title: `${translations["sifaris_tarixcesi"]}`,
      activeIcon: "../Storefront.svg",
      deactiveIcon: "../Storefrontb.svg",
      to: "/profile/orderhistory",
    },
    {
      id: 3,
      title: `${translations["sevimlilerim"]}`,
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
      title: `${translations["cixis"]}`,
      activeIcon: "../SignOut.svg",
      deactiveIcon: "../SignOut.svg",
      to: "",
    },
  ];

  const [_, setAuth] = useRecoilState(UserIsAuthState);

  //open dashboard mobile toggle menu
  const [toggleMenuDashboard, setToggleMenuDashboard] = React.useState<boolean>(false);
  const openDashboardMenu = () => {
    setToggleMenuDashboard(true);
  };

  //active - deactive dashboard links
  const [active, setActive] = useRecoilState(dashboarLinksActiveState);

  const handleNavigateToLink = (id: number | null) => {
    if (id === 5) {
      setActive(null);
    } else {
      setActive(id);
    }
    setToggleMenuDashboard(false);
  };

  //responsive dashboard-links
  const [mobile, setMobile] = React.useState<boolean>(false);

  const dashToggleRef = React.useRef<HTMLDivElement | null>(null);

  //mobile dashboard open and outside clicked events
  React.useEffect(() => {
    const resizeScreen = () => {
      if (window.innerWidth <= 968) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    resizeScreen();

    const outsideClickOnTheDashboardToggleMenu = (e: MouseEvent) => {
      if (dashToggleRef && dashToggleRef.current && !dashToggleRef.current.contains(e.target as Node)) {
        setToggleMenuDashboard(false);
      }
    };

    window.addEventListener("resize", resizeScreen);
    document.addEventListener("mousedown", outsideClickOnTheDashboardToggleMenu);
    return () => {
      window.removeEventListener("resize", resizeScreen);
      document.removeEventListener("mousedown", outsideClickOnTheDashboardToggleMenu);
    };
  }, []);

  //refresh the all routes and navigate to dashboard if component did mount
  const match = useMatch("/profile/*");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (match) {
      navigate("/profile/dashboard");
    }
  }, []);

  //Logout user
  const [loading, setLoading] = React.useState<boolean>(false);
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
          if (key !== "favourites" && key !== "basket") {
            localStorage.removeItem(key);
          }
        });

        const timeout = setTimeout(() => {
          navigate("/");
          setAuth(false);
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
    <div className="dashboard-page-wrapper">
      <div className="dashboard-page">
        <NavigationShower prevpage={translations['profile_title']} />

        <div className="container-dashboard">
          {mobile ? (
            <div className="mobile-dashboard-links" onClick={openDashboardMenu}>
              <img src="../dashicon.svg" alt="dashboard-menu" />
              <span>Dashboard menu</span>
            </div>
          ) : (
            <div className="dashboard-links">
              {DashboardLinkItems.map((item: DashboardLinksType) =>
                item.id !== 5 ? (
                  <Link
                    key={item?.id}
                    onClick={() => handleNavigateToLink(item?.id)}
                    to={item.to ? item.to : ""}
                    className={`link-dash ${active === item?.id ? "active-link" : ""}`}>
                    <div className="icon">
                      <img
                        src={active === item?.id ? item?.activeIcon : item?.deactiveIcon}
                        alt={`${item.id}-icon`}
                        title={item?.title}
                      />
                    </div>
                    <span>{item?.title}</span>
                  </Link>
                ) : (
                  <span onClick={LogOutUser} title="Çıxış" key={item?.id} className="link-dash">
                    {loading ? (
                      "Çıxış edilir..."
                    ) : (
                      <React.Fragment>
                        <div className="icon">
                          <img
                            src={active === item?.id ? item?.activeIcon : item?.deactiveIcon}
                            alt={`${item.id}-icon`}
                            title={item?.title}
                          />
                        </div>
                        <span>{item?.title}</span>
                      </React.Fragment>
                    )}
                  </span>
                )
              )}
            </div>
          )}
          <div className="routed-contents">
            <Routes>
              <Route path="dashboard" element={<DashboardContent />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="orderhistory/:id" element={<OrderDetails />} />
              <Route path="favourites" element={<FavouritesComponent />} />
              {/* <Route path="settings" element={<Settings />} /> */}
            </Routes>
          </div>
        </div>
      </div>

      {/* dashboard toggle menu */}
      <div className={`dashboard-toggle-menu ${toggleMenuDashboard ? "active" : ""}`} ref={dashToggleRef}>
        <div className="close-area">
          <span>Dashboard</span>
          <IoClose className="closeicon" onClick={() => setToggleMenuDashboard(false)} />
        </div>

        <div className="dashboard-links">
          {DashboardLinkItems.map((item: DashboardLinksType) => (
            <Link
              key={item?.id}
              onClick={() => handleNavigateToLink(item?.id)}
              to={item.to ? item.to : ""}
              className={`link-dash ${active === item?.id ? "active-link" : ""}`}>
              <div className="icon">
                <img
                  src={active === item?.id ? item?.activeIcon : item?.deactiveIcon}
                  alt={`${item.id}-icon`}
                  title={item?.title}
                />
              </div>
              <span>{item?.title}</span>
            </Link>
          ))}
        </div>
        <div className="top-profile-info">
          <div className="profile">
            <div className="left-user">
              <img src="../us.svg" alt="user" title="Jhon Doe" />
            </div>
            <div className="text">
              <span className="username">John Doe</span>
              <p className="desc">Dhaka - 1207, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
