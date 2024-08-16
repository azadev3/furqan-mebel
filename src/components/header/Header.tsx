import React, { useEffect, useRef } from "react";
import "../../styles/header.scss";
import { Link, NavLink, useLocation, useMatch, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ResponsiveHeader from "./ResponsiveHeader";
import SearchModal from "./SearchModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  basketItemState,
  favouriteItemsState,
  LoginMenuState,
  profileDropdownState,
  scrollHeaderState,
  selectedCategoryStateProductPage,
  userAddBasket,
  userAddedFavourite,
  UserIsAuthState,
} from "../../recoil/Atoms";
import { FaRegUser } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import { SelectedLanguageState } from "./SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { CartType } from "../basketpageuitils/Basket";
import getCookie from "../../getCookie";
import { CategoriesInterface } from "../homepageuitils/PopularProducts";
import Catalogs from "./Catalogs";
import { useTranslations } from "../../TranslateContext";

export interface Logo {
  id: number;
  logo: string;
}

// Define navbar subitem type and navbar item type
export type NavbarSubitemType = {
  id: number;
  title: string;
  icon?: string | JSX.Element;
  to?: string;
};

export interface NavbarItemType {
  id: number;
  title: string;
  icon?: string | JSX.Element;
  to: string;
  subitem?: NavbarSubitemType[];
}

const Header: React.FC = () => {

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

  // mehsullar dropdown menu
  const [dropdown, setDropdown] = React.useState<number | null>(null);

  const handleDropdown = (id: number | null) => {
    setDropdown((prevDropdown) => (prevDropdown === id ? null : id));
  };

  const linkRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const submenuRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

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

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, [dropdown]);

  // Define navbar items
  const NavbarItems: NavbarItemType[] = [
    { id: 1, title: `${translations['nav_anasehife']}`, to: "/" },
    { id: 2, title: `${translations['nav_haqqimizda']}`, to: "/about" },
    // {
    //   id: 3,
    //   title: `${translations['nav_mehsullar']}`,
    //   icon: (
    //     <FaAngleDown
    //       className="down-icon"
    //       style={{ transform: dropdown === 3 ? "rotate(180deg)" : "", transition: "150ms ease-in-out" }}
    //     />
    //   ),
    //   subitem:
    //   CategoryProductsData && CategoryProductsData.length > 0
    //       ? CategoryProductsData.map((item: CategoriesInterface) => {
    //           return {
    //             id: item?.id,
    //             title: item?.title,
    //           };
    //         })
    //       : [],
    //   to: "",
    // },
    { id: 4, title: `${translations['nav_blog']}`, to: "/blog" },
    { id: 5, title: `${translations['nav_kredit']}`, to: "/credit" },
    { id: 6, title: `${translations['nav_contact']}`, to: "/contact" },
  ];

  //responsive header
  const [mobile, setMobile] = React.useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 968) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  //search modal
  const [searchModal, setSearchModal] = React.useState<boolean>(false);

  const handleSearchModal = () => {
    setSearchModal(true);
  };

  //change colors based on position
  const location = useLocation();
  const isBasketPage = location.pathname === "/mybasket";
  const isFavouritePage = location.pathname === "/favourites";
  const isProfile = useMatch("/profile/*");

  //if user authenticated
  const isAuth = useRecoilValue(UserIsAuthState);

  //profile dropdown
  const [profileDropdown, setProfileDropdown] = useRecoilState(profileDropdownState);

  const handleDropdownProfile = () => {
    setProfileDropdown((prevDropdown) => !prevDropdown);
  };

  //If the location is active in the profile menu,
  //then reset the location and keep it at a certain location
  const dynamicLocation = useMatch("/profile/*");

  //get prop on the ProfileDropdown.tsx
  const userRef = React.useRef<HTMLAnchorElement | null>(null);
  const profileDropdownModalRef = React.useRef<HTMLDivElement | null>(null);

  //if home location add class the header-wrapper
  const isHomePage = location.pathname === "/";

  const scrolled = useRecoilValue(scrollHeaderState);

  //if clicked Daxil ol open register or login modal fixed
  const [_, setLoginMenu] = useRecoilState(LoginMenuState);

  //FAVOURITES ITEM IS TRUE
  // Check if there are any favourites or basket in localStorage
  const [isAddedFav, setIsAddedFav] = useRecoilState(userAddedFavourite);
  const [isAddedBasket, setIsBasket] = useRecoilState(userAddBasket);

  const favouritesItems = useRecoilValue(favouriteItemsState);
  const basketItems = useRecoilValue(basketItemState);

  //favourite items
  React.useEffect(() => {
    const favouritesData = localStorage.getItem("favourites");
    const isFavourites = favouritesData ? JSON.parse(favouritesData) : [];

    if (Object.keys(isFavourites).length > 0) {
      setIsAddedFav(true);
    } else {
      setIsAddedFav(false);
    }
  }, [favouritesItems]);
  
  //basket items
  React.useEffect(() => {
    const basketData = localStorage.getItem("baskets");
    const isBasket = basketData ? JSON.parse(basketData) : [];
    if (Object.keys(isBasket).length > 0) {
      setIsBasket(true);
    } else {
      setIsBasket(false);
    }
  }, [basketItems]);

  const [isBasketProducts, setIsBasketProducts] = React.useState<CartType | null>(null);

  const selectedLanguage = useRecoilValue(SelectedLanguageState);

  const getAllBasketProduct = async () => {
    try {
      const token = getCookie("accessToken");
      const response = await axios.get(`${Baseurl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": selectedLanguage,
        },
      });

      if (response.data) {
        setIsBasketProducts(response.data.cart);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllBasketProduct();
  }, [basketItems]);

  // redirect subitem according to selected category 
  const navigate = useNavigate();
  const [__, setCategoryTitle] = useRecoilState(selectedCategoryStateProductPage);
  const handleSelectedCategory = (categoryId: number | null) => {
    navigate("/products");
    setCategoryTitle(categoryId);
  }


  return (
    <header
      className={`header-wrapper ${
        isHomePage
          ? scrolled
            ? "scroll-header-wrapper"
            : "header-wrapper-isHome"
          : scrolled
          ? "scroll-header-wrapper"
          : "header-wrapper"
      }`}>
      {searchModal && <SearchModal setSearchModal={setSearchModal} />}
      {mobile ? (
        <ResponsiveHeader setSearchModal={setSearchModal} />
      ) : (
        <div className="header">
          {/* profile dropdown */}
          <div
            className={`profile-dropdown-backdrop ${profileDropdown ? "active-dropdown" : ""}`}
            ref={profileDropdownModalRef}>
            <ProfileDropdown userRef={userRef} profileDropdownModalRef={profileDropdownModalRef} />
          </div>
          <div className="left-header">
            <Link to="/" className="left-logo">
              {LogoData && LogoData?.length > 0 ? (
                LogoData.map((item: Logo) => (
                  <img loading="lazy" src={item?.logo} alt="logo" title="Furqan Mebel" key={item?.id} />
                ))
              ) : (
                <img src="../logo.svg" alt="logo" title="Furoan" />
              )}
            </Link>
            <div className="search" onClick={handleSearchModal}>
              <input type="text" placeholder="Axtar" readOnly />
              <CiSearch className="searchicon" />
            </div>
            <Catalogs />
          
          </div>
          <div className="right-header">
            <nav className="navbar">
              {NavbarItems.map((item: NavbarItemType) => {
                const isSpecialItem = item.id === 3;

                return (
                  <React.Fragment key={item.id}>
                    <div className="item-link" ref={(ref) => linkRefs.current.set(item.id, ref)}>
                      {isSpecialItem ? (
                        <span className="linkitem" onClick={isSpecialItem ? () => handleDropdown(item.id) : undefined}>
                          {item.title} {item.icon}
                        </span>
                      ) : (
                        <NavLink
                          className="linkitem"
                          to={item.to || ""}
                          onClick={isSpecialItem ? () => handleDropdown(item.id) : undefined}>
                          {item.title} {item.icon}
                        </NavLink>
                      )}
                    </div>

                    <div
                      ref={(ref) => submenuRefs.current.set(item.id, ref)}
                      className={`submenu ${dropdown === item.id ? "active" : ""}`}>
                      {item.subitem?.map((subitem: CategoriesInterface, i: number) => (
                        <span className="sublink" key={i} 
                        onClick={() => {
                          setDropdown(null);
                          handleSelectedCategory(subitem?.id)
                        }}>
                          {subitem?.title}
                        </span>
                      ))}
                    </div>
                  </React.Fragment>
                );
              })}
            </nav>

            <div className="userprofile">
              <Link to="/mybasket" className="basket">
                <span
                  style={{
                    display:
                      isAuth && isBasketProducts && isBasketProducts?.cart_items.length <= 0
                        ? "none"
                        : !isAuth && Object.values(basketItems).length <= 0
                        ? "none"
                        : "",
                  }}
                  className="notification">
                  {isAuth ? (
                    isBasketProducts?.cart_items.length
                  ) : (
                    <React.Fragment>{Object.values(basketItems).length}</React.Fragment>
                  )}
                </span>
                <img
                  src={
                    isBasketPage || isAddedBasket
                      ? "../basketgreen.svg"
                      : isHomePage && !scrolled
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
                      : isHomePage && !scrolled
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
                  <FaRegUser className="user" color={isProfile ? "#43B749" : isHomePage && !scrolled ? "#fff" : ""} />
                </Link>
              ) : (
                <div
                  onClick={() => setLoginMenu(true)}
                  style={{ cursor: "pointer" }}
                  className="login"
                  title="Daxil ol">
                  <img src={isHomePage && !scrolled ? "../profilewhite.png" : "../Person.svg"} alt="person" />
                  <span>Daxil ol</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
