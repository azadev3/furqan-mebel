import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Topheader from "./components/header/Topheader";
import AboutPage from "./routes/AboutPage";
import "./styles/pages/pages.scss";
import BlogPage from "./routes/BlogPage";
import ContactPage from "./routes/ContactPage";
import VacationsPage from "./routes/VacationsPage";
import ProductsPage from "./routes/ProductsPage";
import BasketPage from "./routes/BasketPage";
import DeliveryPage from "./routes/DeliveryPage";
import PaymentDetails from "./routes/PaymentDetails";
import PaymentSuccessPage from "./routes/PaymentSuccessPage";
import FavouritesPage from "./routes/FavouritesPage";
import StorePage from "./routes/StorePage";
import CreditConditionsPage from "./routes/CreditConditionsPage";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ActiveLoginPageState,
  ActiveRegisterPageState,
  LoginMenuState,
  scrollHeaderState,
  showImgState,
  UserIsAuthState,
} from "./recoil/Atoms";
import Dashboard from "./routes/Dashboard";
import BlogInnerPage from "./routes/BlogInnerPage";
import ProductInner from "./routes/ProductInner";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseOutline } from "react-icons/io5";
import Register from "./components/loginregister/Register";
import { FaArrowLeft } from "react-icons/fa6";
import Login from "./components/loginregister/Login";
import getCookie from "./getCookie";
import { useAddFavourite } from "./useAddFavourite";
import { FavouriteItemType } from "./components/productpageuitils/filteruitils/productmainuitils/PaginationProducts";
import axios from "axios";
import { Baseurl } from "./api/Baseurl";

const App: React.FC = () => {


  const [isAuth, setAuth] = useRecoilState(UserIsAuthState);

  React.useEffect(() => {
    const userInfoString = getCookie("userInfo");
    const token = getCookie("accessToken");
    if (userInfoString && token) {
      setAuth(true);
    }
  }, []);

  //scroll header codes
  const [__, setScrolled] = useRecoilState(scrollHeaderState);

  React.useEffect(() => {
    const scrollSizer = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", scrollSizer);
    return () => window.removeEventListener("scroll", scrollSizer);
  }, []);

  // Login menu state
  const [loginMenu, setLoginMenu] = useRecoilState(LoginMenuState);
  // Set active REGISTER and LOGIN pages
  const [activeRegister, setActiveRegister] = useRecoilState(ActiveRegisterPageState);
  const [activeLogin, setActiveLogin] = useRecoilState(ActiveLoginPageState);

  // Ref for outside click detection
  const loginMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(e.target as Node)) {
        setLoginMenu(false);
        setActiveLogin(false);
        setActiveRegister(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, [setLoginMenu, setActiveLogin, setActiveRegister]);

  // SEND FAVOURITES ITEMS TO DATABASE IF USER AUTHENTIFICATED
  const { favouriteItems } = useAddFavourite();
  const sendFavouritesDatabase = async (favItems: FavouriteItemType[]) => {
    try {
      if (!favItems || favItems.length === 0) {
        console.error("No favourite items to send.");
        return;
      }

      const token = getCookie("accessToken");
      const sendFavID = favItems
        .map((item: FavouriteItemType) => item.id)
        .filter((id) => id !== null && id !== undefined);

      if (sendFavID.length === 0) {
        console.error("No valid IDs found in favourite items.");
        return;
      }

      const data = {
        product_ids: sendFavID,
      };

      const response = await axios.post(`${Baseurl}/favorites/addAll`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (isAuth && Object.values(favouriteItems).length > 0) {
      sendFavouritesDatabase(Object.values(favouriteItems));
    }
  }, [favouriteItems]);

  //show image modal (inner product)
  const [showedImg, setShowedImg] = useRecoilState(showImgState);

  const imgModalDivRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClickImgModal = (e: MouseEvent) => {
      if(imgModalDivRef && imgModalDivRef.current && imgModalDivRef.current.contains(e.target as Node)) {
        setShowedImg("");
      }
    }

    document.addEventListener("mousedown", outsideClickImgModal);
    return () => document.removeEventListener("mousedown", outsideClickImgModal);
  }, []); 

  return (
    <div className="app">
      {/* show img modal */}
      <div className={`image-modal-overlay ${showedImg ? "active" : ""}`} ref={imgModalDivRef}>
          <div className="image-modal">
            <img src={showedImg} alt="" />
          </div>
         </div>
     

      <div className={`overlay ${loginMenu ? "active" : ""}`}>
        <div className={`login-menu-wrapper ${loginMenu ? "active" : ""}`} ref={loginMenuRef}>
          <div className="login-menu">
            {/* NORMAL VARIANT */}
            <div className="normal-variant" style={{ display: activeRegister || activeLogin ? "none" : "" }}>
              <section className="head-area-modal">
                <IoCloseOutline
                  className="close-icon"
                  onClick={() => {
                    setLoginMenu(false);
                    setActiveRegister(false);
                    setActiveLogin(false);
                  }}
                />
              </section>
              <div className="login-and-register-buttons">
                <button className="login" onClick={() => setActiveLogin(true)}>
                  Daxil ol
                </button>
                <button className="register" onClick={() => setActiveRegister(true)}>
                  Qeydiyyat
                </button>
              </div>
            </div>

            {/* REGISTER VARIANT */}
            <div
              className={`register-variant ${activeRegister ? "active" : ""}`}
              style={{ display: activeLogin ? "none" : "" }}>
              <section className="head-area-modal">
                <FaArrowLeft className="back-icon" onClick={() => setActiveRegister(false)} />
                <h3>Qeydiyyat</h3>
                <IoCloseOutline
                  className="close-icon"
                  onClick={() => {
                    setLoginMenu(false);
                    setActiveRegister(false);
                    setActiveLogin(false);
                  }}
                />
              </section>
              <Register />
            </div>

            {/* LOGIN VARIANT */}
            <div
              className={`login-variant ${activeLogin ? "active" : ""}`}
              style={{ display: activeRegister ? "none" : "" }}>
              <section className="head-area-modal">
                <FaArrowLeft className="back-icon" onClick={() => setActiveLogin(false)} />
                <h3>Daxil ol</h3>
                <IoCloseOutline
                  className="close-icon"
                  onClick={() => {
                    setLoginMenu(false);
                    setActiveRegister(false);
                    setActiveLogin(false);
                  }}
                />
              </section>
              <Login />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer transition={Zoom} autoClose={1200} pauseOnHover={false} draggable={true} />
      <Topheader />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogInnerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vacations" element={<VacationsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slugproduct" element={<ProductInner />} />
        <Route path="/mybasket" element={<BasketPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/paymentdetails" element={<PaymentDetails />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/stores" element={<StorePage />} />
        <Route path="/credit" element={<CreditConditionsPage />} />
        <Route path="/profile/*" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
