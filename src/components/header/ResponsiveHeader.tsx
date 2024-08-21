import React, { SetStateAction, useEffect, useRef } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Logo, NavbarItemType } from "./Header";
import { FaRegUser } from "react-icons/fa6";
import {
  LoginMenuState,
  profileDropdownState,
  selectedCategoryStateProductPage,
  userAddBasket,
  userAddedFavourite,
  UserIsAuthState,
} from "../../recoil/Atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "./SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import ProfileDropdown from "./ProfileDropdown";
import getCookie from "../../getCookie";
import { CategoriesInterface } from "../homepageuitils/PopularProducts";
import { useTranslations } from "../../TranslateContext";
import { BasketDataInterface } from "../basketpageuitils/Basket";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";
import useScroll from "../../useScroll";
import Catalogs from "./Catalogs";

type Props = {
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
};

const ResponsiveHeader: React.FC<Props> = ({ setSearchModal }) => {
  const { translations } = useTranslations();

  //FETCH LOGO
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const { data: LogoData } = useQuery({
    queryKey: ["logoKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/logo`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.logo;
    },
    staleTime: 1000000,
  });

  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);

  const handleToggleClick = () => {
    setToggleMenu((prevMenu) => !prevMenu);
  };
  // mehsullar dropdown menu
  const [dropdown, setDropdown] = React.useState<number | null>(null);

  const handleDropdown = (id: number | null) => {
    setDropdown((prevDropdown) => (prevDropdown === id ? null : id));
    if (id === 3) {
      setToggleMenu(true);
    } else {
      setToggleMenu(false);
    }
  };

  const linkRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const submenuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const toggleMenuRef = useRef<HTMLDivElement | null>(null);

  // Outside clicked, close dropdown
  useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      let clickedInside = false;
      linkRefs.current.forEach((ref, _) => {
        if (ref?.contains(e.target as Node)) {
          clickedInside = true;
        }
      });
      submenuRefs.current.forEach((ref, _) => {
        if (ref?.contains(e.target as Node)) {
          clickedInside = true;
        }
      });

      if (!clickedInside) {
        setDropdown(null);
      }
    };

    const outsideClickedToggleMenu = (e: MouseEvent) => {
      if (toggleMenuRef.current && !toggleMenuRef.current.contains(e.target as Node)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    document.addEventListener("mousedown", outsideClickedToggleMenu);
    return () => {
      document.removeEventListener("mousedown", outsideClicked);
      document.removeEventListener("mousedown", outsideClickedToggleMenu);
    };
  }, [dropdown]);

  // Define navbar items
  const NavbarItems: NavbarItemType[] = [
    { id: 1, title: `${translations["nav_anasehife"]}`, to: "/" },
    { id: 2, title: `${translations["nav_haqqimizda"]}`, to: "/about" },
    { id: 4, title: `${translations["nav_blog"]}`, to: "/blog" },
    { id: 5, title: `${translations["nav_kredit"]}`, to: "/credit" },
    { id: 6, title: `${translations["nav_contact"]}`, to: "/contact" },
  ];

  //search modal
  const handleSearchModal = () => {
    setSearchModal(true);
  };

  //is auth user
  const isAuth = useRecoilValue(UserIsAuthState);

  //change colors based on position
  const location = useLocation();
  const isBasketPage = location.pathname === "/mybasket";
  const isFavouritePage = location.pathname === "/favourites";
  const isProfile = useMatch("/profile/*");
  //if home location add class the header-wrapper
  const isHomePage = location.pathname === "/";

  const isAddedBasket = useRecoilValue(userAddBasket);
  const isAddedFav = useRecoilValue(userAddedFavourite);

  const dynamicLocation = useMatch("/profile/*");
  const [_, setLoginMenu] = useRecoilState(LoginMenuState);

  //profile dropdown
  const [profileDropdown, setProfileDropdown] = useRecoilState(profileDropdownState);

  const handleDropdownProfile = () => {
    setProfileDropdown((prevDropdown) => !prevDropdown);
  };
  //get prop on the ProfileDropdown.tsx
  const userRef = React.useRef<HTMLAnchorElement | null>(null);
  const profileDropdownModalRef = React.useRef<HTMLDivElement | null>(null);

  const isScrolled = useScroll();

  //basket items
  const [isBasketData, setIsBasketData] = React.useState<boolean>(false);
  const [basketDataLS, setBasketDataLS] = React.useState<CatProductType[]>([]);
  React.useEffect(() => {
    const basketData = localStorage.getItem("basket");
    const isBasket = basketData ? JSON.parse(basketData) : [];
    if (Object.keys(isBasket)?.length > 0) {
      setIsBasketData(true);
      setBasketDataLS(isBasket);
    } else {
      setIsBasketData(false);
    }
  }, [isBasketData]);

  const navigate = useNavigate();
  const [__, setCategoryTitle] = useRecoilState(selectedCategoryStateProductPage);
  const handleSelectedCategory = (categoryId: number | null) => {
    navigate("/products");
    setCategoryTitle(categoryId);
  };

  const [basketProducts, setBasketProducts] = React.useState<BasketDataInterface[]>([]);
  const token = getCookie("accessToken");
  const getBasketProducts = async () => {
    try {
      const response = await axios.get(`${Baseurl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": activeLanguage,
        },
      });

      if (response.data) {
        setBasketProducts(response.data?.cart || []);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error fetching basket products:", error);
    }
  };
  React.useEffect(() => {
    if (isAuth && token && basketProducts) {
      getBasketProducts();
    }
  }, [isAuth, token]);

  return (
    <header className="responsive-header">
      {/* profile dropdown */}
      <div
        className={`profile-dropdown-backdrop ${profileDropdown ? "active-dropdown" : ""}`}
        ref={profileDropdownModalRef}>
        <ProfileDropdown userRef={userRef} profileDropdownModalRef={profileDropdownModalRef} />
      </div>
      <div ref={toggleMenuRef} className={`toggle-menu ${toggleMenu ? "toggle" : ""}`}>
        <div className="head-toggle">
          <Link to="/" className="left-logo-mobile">
            {LogoData && LogoData?.length > 0 ? (
              LogoData.map((item: Logo) => (
                <img loading="lazy" src={item?.logo} alt="logo" title="Furqan Mebel" key={item?.id} />
              ))
            ) : (
              <img src="../logo.svg" alt="logo" title="Furoan" />
            )}
          </Link>
          <span>Menyu</span>
        </div>

        <nav className="navbar">
          {NavbarItems.map((item: NavbarItemType) => (
            <React.Fragment key={item.id}>
              <div className="item-link" ref={(ref) => linkRefs.current.set(item.id, ref)}>
                {item?.id !== 3 ? (
                  <Link to={item.to} onClick={() => handleDropdown(item.id)}>
                    {item.title} {item.icon}
                  </Link>
                ) : (
                  <span className="special" onClick={() => handleDropdown(item.id)}>
                    {item.title} {item.icon}
                  </span>
                )}
              </div>

              <div
                ref={(ref) => submenuRefs.current.set(item.id, ref)}
                className={`submenu ${dropdown === item.id ? "active" : ""}`}>
                {item.subitem?.map((subitem: CategoriesInterface) => (
                  <span
                    className="sublink"
                    key={subitem.id}
                    onClick={() => {
                      setDropdown(null), setToggleMenu(false), handleSelectedCategory(subitem?.id);
                    }}>
                    {subitem.title}
                  </span>
                ))}
              </div>
            </React.Fragment>
          ))}
        </nav>

        <div className="userprofile">
          <img src="../profimg.svg" alt="profile" title="profile" />
        </div>
      </div>
      <Link to="/" className="left-logo-mobile">
        {LogoData && LogoData?.length > 0 ? (
          LogoData.map((item: Logo) => (
            <img loading="lazy" src={item?.logo} alt="logo" title="Furqan Mebel" key={item?.id} />
          ))
        ) : (
          <img src="../logo.svg" alt="logo" title="Furoan" />
        )}
      </Link>

      <div className="rightmobile-header">
      <Catalogs />

        <img
          src={isHomePage && !isScrolled ? "../sw.svg" : isScrolled ? "../search-normal.svg" : "../search-normal.svg"}
          alt="search"
          title="Axtar"
          onClick={handleSearchModal}
        />

        <Link to="/mybasket" className="basket">
          <span className="notification">
            {isAuth && token ? basketProducts && basketProducts?.length : basketDataLS?.length}
          </span>
          <img
            src={
              isBasketPage || isAddedBasket
                ? "../basketgreen.svg"
                : isHomePage && !isScrolled
                ? "../basketwhite.png"
                : "../basketimg.svg"
            }
            alt="basket"
            title="Səbət"
          />
        </Link>
        <Link to="/favourites" className={`hearth ${isAddedFav ? "hearth-anim" : ""}`}>
          <img
            src={
              isFavouritePage || isAddedFav
                ? "../hearthfill.svg"
                : isHomePage && !isScrolled
                ? "../qlb.svg"
                : "../hearth.svg"
            }
            alt="hearth"
            title="Favorilər"
          />
        </Link>

        {isAuth ? (
          <Link
            ref={userRef}
            to={dynamicLocation ? dynamicLocation : "/profile/dashboard"}
            className="profile"
            onClick={handleDropdownProfile}>
            <FaRegUser
              className="user"
              color={isProfile ? "#43B749" : isScrolled ? "#000" : isHomePage ? "#fff" : ""}
            />
          </Link>
        ) : (
          <div onClick={() => setLoginMenu(true)} style={{ cursor: "pointer" }} className="login" title="Daxil ol">
            <img src={isHomePage && !isScrolled ? "../profilewhite.png" : "../Person.svg"} alt="person" />
            <span>Daxil ol</span>
          </div>
        )}

        {toggleMenu ? (
          <IoClose
            className="close"
            style={{ color: isHomePage && !isScrolled ? "#fff" : "" }}
            onClick={handleToggleClick}
          />
        ) : (
          <img
            src={isHomePage && !isScrolled ? "../menuwhite.svg" : "../menu.svg"}
            alt="menu"
            onClick={handleToggleClick}
          />
        )}
      </div>
    </header>
  );
};

export default ResponsiveHeader;
