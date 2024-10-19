import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import Loader from "../../uitils/Loader";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useTranslations } from "../../TranslateContext";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";

export type ChildrenCategory = {
  id: number;
  title: string;
  img: string | null;
};

export type filterType = {
  id: number;
  title: string;
};

export interface CategoriesInterface {
  id: number;
  title: string;
  img?: string | null;
  children?: ChildrenCategory[];
}

export type OptionsPopularProducts = {
  id: number;
  title: string;
  icon: string | null;
  filter: filterType;
};

export type ImagesPopularProducts = {
  id: number;
  img: string;
};

export type ModulesProducts = {
  id: number;
  title: string;
  price: string;
};

export interface ProductsInterface {
  id: number;
  title: string;
  content: string;
  parent_category_id: number;
  img: string;
  price: string;
  discounted_price: string;
  is_favorite: boolean;
  is_in_cart: boolean;
  is_stock: boolean;
  is_new: boolean;
  is_popular: boolean;
  slug: string;
  category_name: string;
  images?: ImagesPopularProducts[];
  modules?: [];
  options?: OptionsPopularProducts[];
  quantity?: number;
}

const ProductsInterface: React.FC = () => {
  const activeLanguage = useRecoilValue(SelectedLanguageState);

  // filtered items according to category names
  const [popularProducts, setPopularProducts] = React.useState<CatProductType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  // FETCH PRODUCTS
  const getPopularProductForCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}/popular_products`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });

      if (response.data) {
        console.log(response.data?.popular_products, 'ssssss')
        setPopularProducts(response.data?.popular_products);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //set first category mounted component
  React.useEffect(() => {
    getPopularProductForCategory();
  }, []);

  // if mobile, convert swiper on the filtered items div
  const [mobile, setMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mobileResize = () => {
      if (window.innerWidth <= 568) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener("resize", mobileResize);
    return () => window.removeEventListener("resize", mobileResize);
  }, []);

  const calculatePercentage = (item: CatProductType) => {
    const price = item?.price;
    const discounted_price = item?.discounted_price;

    if (price && discounted_price) {
      const discountPercentage = ((parseInt(price) - parseInt(discounted_price)) / parseInt(price)) * 100;
      return discountPercentage.toFixed(2);
    }
    return null;
  };

  const { translations } = useTranslations();

  return (
    <div className="popular-products-wrapper">
      <div className="popular-products">
        <h1>{translations["populyar_mehsullar"]}</h1>
        <div className="container-with-popular-products">
          {mobile ? (
            <div className="categories-filtering-items">
              <Swiper spaceBetween={12} slidesPerView={1.2}>
                {loading ? (
                  <Loader />
                ) : (
                  <React.Fragment>
                    {popularProducts && popularProducts?.length > 0
                      ? popularProducts.map((item: CatProductType) => (
                          <SwiperSlide key={item.id}>
                            <Link to={`/popular_product_single/${item?.slug}`} className="subitem">
                              <img className="shop-bag" src="../shopbag.svg" alt="show" title="Səbət" />

                              <div className="punts">
                                {item?.is_new ? (
                                  <div className="new-punt">
                                    <span>Yeni</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {item?.discounted_price ? (
                                  <div className="discount-punt">
                                    <span>{Math.round(parseFloat(item?.discounted_price))}</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="product-image">
                                <img src={item?.img} alt={`${item?.id}-image`} title={item?.title} />
                              </div>
                              <div className="item-details">
                                <span className="category-name">{item?.category_name}</span>
                                <span className="product-name">{item?.title}</span>
                                <div className="prices">
                                  <span className="price">
                                    {item.discounted_price ? `${item.discounted_price} AZN` : `${item.price} AZN`}
                                  </span>
                                  {item.discounted_price && <span className="discountprice">{item.price} AZN</span>}
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        ))
                      : ""}
                  </React.Fragment>
                )}
              </Swiper>
            </div>
          ) : (
            <div className="categories-filtering-items">
              {loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  {popularProducts && popularProducts?.length > 0
                    ? popularProducts?.slice(0, 4).map((item: CatProductType) => (
                        <Link to={`/popular_product_single/${item?.slug}`} key={item.id} className="subitem">
                          <div className="add-basket">
                            <HiOutlineShoppingBag className="shopping-bag" />
                          </div>

                          <div className="punts">
                            {item?.is_new ? (
                              <div className="new-punt">
                                <span>Yeni</span>
                              </div>
                            ) : (
                              ""
                            )}
                            {item?.discounted_price ? (
                              <div className="discount-punt">
                                <span>{calculatePercentage(item)?.split(".00")}%</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="product-image">
                            <img src={item.img} alt={`${item.id}-image`} title={item.title} />
                          </div>
                          <div className="item-details">
                            <span className="category-name">{item.category_name}</span>
                            <span className="product-name">{item.title}</span>
                            <div className="prices">
                              <span className="price">
                                {item.discounted_price ? `${item.discounted_price} AZN` : `${item.price} AZN`}
                              </span>
                              {item.discounted_price && <span className="discountprice">{item.price} AZN</span>}
                            </div>
                          </div>
                        </Link>
                      ))
                    : ""}
                </React.Fragment>
              )}
            </div>
          )}

          <div className="all-products">
            <Link to="/products">
              <span>{translations['butun_mehsullara_bax']}</span>
              <img src="../linearrowgreen.svg" alt="right" title="Bütün məhsullar" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInterface;
