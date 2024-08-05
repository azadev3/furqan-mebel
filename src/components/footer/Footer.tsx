import React from "react";
import "../../styles/footer.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { ContactItemsType } from "../contactpageuitils/RightContact";
import Loader from "../../uitils/Loader";

interface Socials {
  id: number;
  title: string;
  link: string;
  icon: string;
}

type CategoryTypeTop = {
  id: number;
  title: string;
  to: string;
};

type FooterNavType = {
  id: number;
  title: string;
  to: string;
};

const Footer: React.FC = () => {
  const CategoryTopItem: CategoryTypeTop[] = [
    {
      id: 1,
      title: "Yataq",
      to: "/products",
    },
    {
      id: 2,
      title: "Qonaq",
      to: "/products",
    },
    {
      id: 3,
      title: "Yumşaq",
      to: "/products",
    },
    {
      id: 4,
      title: "Uşaq & Gənc",
      to: "/products",
    },
    {
      id: 5,
      title: "Dəhliz",
      to: "/products",
    },
    {
      id: 6,
      title: "Mətbəx",
      to: "/products",
    },
  ];

  const FooterNavItem: FooterNavType[] = [
    {
      id: 1,
      title: "Ana Səhifə",
      to: "/",
    },
    {
      id: 2,
      title: "Haqqımızda",
      to: "/about",
    },
    {
      id: 3,
      title: "Məhsullar",
      to: "/products",
    },
    {
      id: 4,
      title: "Blog",
      to: "/blog",
    },
    {
      id: 5,
      title: "Kredit",
      to: "/credit",
    },
    {
      id: 6,
      title: "Mağazalar",
      to: "/stores",
    },
    {
      id: 7,
      title: "Vakansiyalar",
      to: "/vacations",
    },
    {
      id: 8,
      title: "Əlaqə",
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
                  <Link to={i === 0 ? `mailto:${item.title}` : i === 1 ? `tel:${item.title}` : ""} className="link-item" key={item.id}>
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
                {CategoryTopItem.map((item: CategoryTypeTop) => (
                  <Link key={item.id} to={item.to ? item.to : ""} className="link">
                    {item.title}
                  </Link>
                ))}
              </div>

              <Link to="/products" className="show-all-products">
                <span>Bütün məhsullara bax</span>
                <img src="../rightarrow.svg" alt="rightarrow" />
              </Link>
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
                  Abonə ol
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
