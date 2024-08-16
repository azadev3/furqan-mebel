import React from "react";
import "../../styles/footer.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { ContactItemsType } from "../contactpageuitils/RightContact";
import Loader from "../../uitils/Loader";
import { CategoriesInterface } from "../homepageuitils/PopularProducts";
import { selectedCategoryStateProductPage } from "../../recoil/Atoms";
import { useTranslations } from "../../TranslateContext";

interface Socials {
  id: number;
  title: string;
  link: string;
  icon: string;
}

type FooterNavType = {
  id: number;
  title: string;
  to: string;
};

const Footer: React.FC = () => {

  const { translations } = useTranslations();

  const FooterNavItem: FooterNavType[] = [
    {
      id: 1,
      title: `${translations['nav_anasehife'] || 'Ana Səhifə'}`,
      to: "/",
    },
    {
      id: 2,
      title: `${translations['nav_haqqimizda'] || 'Haqqımızda'}`,
      to: "/about",
    },
    {
      id: 3,
      title: `${translations['nav_mehsullar'] || 'Məhsullar'}`,
      to: "/products",
    },
    {
      id: 4,
      title: `${translations['nav_blog'] || 'Blog'}`,
      to: "/blog",
    },
    {
      id: 5,
      title: `${translations['nav_kredit'] || 'Kredit'}`,
      to: "/credit",
    },
    {
      id: 6,
      title: `${translations['magazalar'] || 'Mağazalar'}`,
      to: "/stores",
    },
    {
      id: 7,
      title: `${translations['vakansiyalar'] || 'Vakansiyalar'}`,
      to: "/vacations",
    },
    {
      id: 8,
      title: `${translations['bizimle_elaqe'] || 'Əlaqə'}`,
      to: "/contact",
    },
  ];
  // subscribtion email send
  const [email, setEmail] = React.useState<string>("");

  const handleSubmitSubscribe = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post(`${Baseurl}/subscribe`, formData);
      if (response.data) {
        toast.success("Abunəlik müvəffəqiyyətlə tamamlandı!", {
          position: "top-center",
        });
        setEmail("");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          toast.error("Lütfən bir email daxil edin.", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Bir problem oldu, yenidən yoxlayın.", {
          position: "top-center",
        });
      }
      console.log(error, "subscribtion api error");
    }
  };

  // fetch contact information items for footer
  const activelanguage = useRecoilValue(SelectedLanguageState);

  const { data: contactItemsDataFooter } = useQuery({
    queryKey: ["contactitemsFooterKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/contact_footer`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.contact_items;
    },
    staleTime: 1000000,
  });

  // fetch socials
  const { data: SocialsData } = useQuery({
    queryKey: ["socialsDataKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/socials`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.socials;
    },
    staleTime: 1000000,
  });

  // FETCH CATEGORIES
  const { data: CategoryProductsData } = useQuery({
    queryKey: ["categoryProductsKey", activelanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/categories`, {
        headers: {
          "Accept-Language": activelanguage,
        },
      });
      return response.data?.categories;
    },
    staleTime: 1000000,
  });

  // redirect subitem according to selected category
  const navigate = useNavigate();
  const [__, setCategoryTitle] = useRecoilState(selectedCategoryStateProductPage);
  const handleSelectedCategory = (categoryId: number | null) => {
    navigate("/products");
    setCategoryTitle(categoryId);
  };

  return (
    <footer className="footer-wrapper">
      <footer className="footer">
        <div className="footer-contents">
          <div className="left-footer">
            <Link to="/" className="toplogo">
              <img src="../logofooterr.svg" alt="logo" title="Furqan Mebel" />
            </Link>

            <div className="links-foot">
              {contactItemsDataFooter && contactItemsDataFooter.length > 0 ? (
                contactItemsDataFooter.map((item: ContactItemsType, i: number) => (
                  <Link
                    to={i === 0 ? `mailto:${item.title}` : i === 1 ? `tel:${item.title}` : ""}
                    className="link-item"
                    key={item.id}>
                    <img src={item?.icon} alt={`${item.id}-icon`} />
                    <span>{item?.value}</span>
                  </Link>
                ))
              ) : (
                <Loader />
              )}

              <div className="socials">
                {SocialsData && SocialsData?.length > 0 ? (
                  SocialsData.map((item: Socials) => (
                    <Link target="_blank" to={item.link ? item.link : ""} className="social-item" key={item.id}>
                      <img src={item?.icon} alt={`${item.id}-logo`} title={item?.link} />
                    </Link>
                  ))
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>

          <div className="right-footer">
            <nav className="categories-top">
              <div className="left-links">
                {CategoryProductsData && CategoryProductsData.length > 0
                  ? CategoryProductsData.slice(0, 4).map((item: CategoriesInterface) => (
                      <span
                        onClick={() => handleSelectedCategory(item?.id)}
                        key={item.id}
                        className="link"
                        style={{ textDecoration: "none", cursor: "pointer" }}>
                        {item?.title}
                      </span>
                    ))
                  : []}
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCategoryTitle(null);
                  navigate("/products");
                }}
                className="show-all-products">
                <span>Bütün məhsullara bax</span>
                <img src="../rightarrow.svg" alt="rightarrow" />
              </div>
            </nav>
            <nav className="links-navigation-footer">
              {FooterNavItem.map((item: FooterNavType) => (
                <Link to={item.to ? item.to : ""} key={item.id} className="link-footer">
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="subscribe-button">
              <div className="buttonsub">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <button type="submit" onClick={handleSubmitSubscribe}>
                  {translations['abone_ol']}
                </button>
              </div>
              <p>Kampaniyalar haqqında məlumat əldə etmək üçün.</p>
            </div>
          </div>
        </div>

        <p className="footer-title">© Bütün hüquqlar qorunur </p>
      </footer>
    </footer>
  );
};

export default Footer;
