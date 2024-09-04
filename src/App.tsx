import React, { ChangeEvent } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Topheader, { CallYourModalState } from "./components/header/Topheader";
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
  catalogState,
  LoginMenuState,
  scrollHeaderState,
  showImgState,
  UserIsAuthState,
} from "./recoil/Atoms";
import Dashboard from "./routes/Dashboard";
import BlogInnerPage from "./routes/BlogInnerPage";
import ProductInner from "./routes/ProductInner";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseOutline } from "react-icons/io5";
import Register from "./components/loginregister/Register";
import { FaArrowLeft } from "react-icons/fa6";
import Login from "./components/loginregister/Login";
import getCookie from "./getCookie";
import { FavouriteItemType } from "./components/productpageuitils/filteruitils/productmainuitils/PaginationProducts";
import axios from "axios";
import { Baseurl } from "./api/Baseurl";
import Thanks from "./Thanks";
import { useTranslations } from "./TranslateContext";
import CatalogToggleMenu from "./components/header/CatalogToggleMenu";
import { CatProductType } from "./components/productpageuitils/filteruitils/CategoriesForFilter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CgClose } from "react-icons/cg";
import CatalogPage from "./components/CatalogPage";

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
  const [_, setScrolled] = useRecoilState(scrollHeaderState);

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

  // SEND FAVOURITE ITEMS TO DATABASE IF USER AUTHENTICATED
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
        localStorage.removeItem("favourites");
      } else {
        console.error("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error sending favourites to database:", error);
    }
  };
  React.useEffect(() => {
    const favouriteItems = localStorage.getItem("favourites");

    if (favouriteItems) {
      try {
        const parsedFavItems: FavouriteItemType[] = JSON.parse(favouriteItems);

        if (isAuth && Array.isArray(parsedFavItems) && parsedFavItems.length > 0) {
          sendFavouritesDatabase(parsedFavItems);
        }
      } catch (error) {
        console.error("Error parsing favourite items:", error);
      }
    }
  }, [isAuth]);

  // SEND BASKET ITEMS TO DATABASE IF USER AUTHENTICATED
  const sendBasketItemsToDB = async (items: CatProductType[]) => {
    try {
      if (!items || items.length === 0) {
        console.error("No basket items to send.");
        return;
      }

      const token = getCookie("accessToken");

      const sendBasketItemID = items
        .map((item: CatProductType) => item.id)
        .filter((id) => id !== null && id !== undefined);

      const sendQuantities = items
        .map((item: CatProductType) => item.quantity || 1)
        .filter((quantity) => quantity !== null && quantity !== undefined);

      if (sendBasketItemID.length === 0) {
        console.error("No valid IDs found in basket items.");
        return;
      }

      const data = {
        product_ids: sendBasketItemID,
        quantities: sendQuantities,
      };

      const response = await axios.post(`${Baseurl}/addAll`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data);
        localStorage.removeItem("basket");
      } else {
        console.error("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error sending basket to database:", error);
    }
  };

  React.useEffect(() => {
    const basketItems = localStorage.getItem("basket");

    if (basketItems) {
      try {
        const parsedBasketItems: CatProductType[] = JSON.parse(basketItems);

        if (isAuth && Array.isArray(parsedBasketItems) && parsedBasketItems.length > 0) {
          sendBasketItemsToDB(parsedBasketItems);
        }
      } catch (error) {
        console.error("Error parsing basket items:", error);
      }
    }
  }, [isAuth]);

  //show image modal (inner product)
  const [showedImg, setShowedImg] = useRecoilState(showImgState);

  //call your modal
  const [callYourModal, setCallYourModal] = useRecoilState(CallYourModalState);
  const callYourModalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClickedCallYourModal = (e: MouseEvent) => {
      if (callYourModalRef.current && !callYourModalRef.current.contains(e.target as Node)) {
        setCallYourModal(false);
      }
    };

    document.addEventListener("mousedown", outsideClickedCallYourModal);
    return () => document.removeEventListener("mousedown", outsideClickedCallYourModal);
  }, []);

  const { translations } = useTranslations();

  //catalog modal
  const catalogMenu = useRecoilValue(catalogState);

  // SEND CALL
  const [name, setName] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", telephone);

    try {
      const response = await axios.post(`${Baseurl}/call_order`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setTelephone("");
        setName("");
        toast.success("Zəng istəyiniz göndərildi. Sizinlə əlaqə saxlanılacaq", {
          position: "top-center",
        });
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
      toast.success("Bir problem oldu", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="app">
      {/* call your modal */}
      <div className={`call-your-modal-overlay ${callYourModal ? "active" : ""}`}>
        <ToastContainer transition={Zoom} />
        <div className="call-your-modal" ref={callYourModalRef}>
          <img src="../closebtn.svg" alt="close-btn" className="closebtn" onClick={() => setCallYourModal(false)} />
          <h1>{translations["zeng_sifaris_et"]}</h1>
          <form action="" className="form">
            <div className="field-input">
              <label htmlFor="name">Ad</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e?.target?.value);
                }}
              />
            </div>
            <div className="field-input">
              <label htmlFor="tel">Əlaqə nömrəsi</label>
              <input
                type="text"
                name="tel"
                id="tel"
                placeholder="+994 70 000 00 00"
                value={telephone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTelephone(e?.target?.value);
                }}
              />
            </div>
          </form>
          <button type="submit" onClick={submitForm}>
            {translations["gonder"]}
          </button>
        </div>
      </div>

      {/* show img modal */}
      <div className={`image-modal-overlay ${showedImg && showedImg?.length > 0 ? "active" : ""}`}>
        <CgClose className="close-modal-icon" onClick={() => setShowedImg([])} />
        <div className="image-modal">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {showedImg.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`product-image-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
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

      {/* CATALOG modal */}
      <div className={`catalog-toggle-menu-overlay ${catalogMenu ? "active" : ""}`}>
        <CatalogToggleMenu />
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
        <Route path="/catalog/:slugcategory" element={<CatalogPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/mybasket" element={<BasketPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/paymentdetails" element={<PaymentDetails />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/stores" element={<StorePage />} />
        <Route path="/credit" element={<CreditConditionsPage />} />
        <Route path="/profile/*" element={<Dashboard />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
