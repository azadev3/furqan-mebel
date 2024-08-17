import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import { CiHeart } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import Loader from "../../uitils/Loader";
import { IoMdHeart } from "react-icons/io";
import { useAddFavourite } from "../../useAddFavourite";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useTranslations } from "../../TranslateContext";

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
  const { addFavourite, favouriteItems } = useAddFavourite();

  // filtered items according to category names
  const [selectedCategory, setSelectedCategory] = React.useState<number>();
  const [popularProducts, setPopularProducts] = React.useState<ProductsInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  // FETCH CATEGORIES
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: CategoryProductsData } = useQuery({
    queryKey: ["categoryProductsKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/categories`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.categories;
    },
    staleTime: 1000000,
  });

  //set first category mounted component
  React.useEffect(() => {
    if (CategoryProductsData && CategoryProductsData.length > 0) {
      const firstCategory = CategoryProductsData[0]?.id;
      setSelectedCategory(firstCategory);
      getPopularProductForCategory(firstCategory);
    }
  }, [CategoryProductsData]);

  // FETCH PRODUCTS for CATEGORY_ID PARAMS
  const getPopularProductForCategory = async (category_id: number | string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}/popular_products`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
        params: {
          category_id: category_id,
        },
      });

      if (response.data) {
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

  // filtering
  const filteredItems = popularProducts.filter((item: ProductsInterface) => {
    return item.parent_category_id === selectedCategory;
  });

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

  const calculatePercentage = (item: ProductsInterface) => {
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
          <div className="categories-swiper">
            <Swiper
              breakpoints={{
                268: {
                  slidesPerView: 2.5,
                  spaceBetween: 12,
                },
                568: {
                  slidesPerView: 4.3,
                },
                968: {
                  slidesPerView: 6.6,
                },
              }}
              spaceBetween={14}
              slidesPerView={6.6}
              className="mySwiper">
              {CategoryProductsData && CategoryProductsData.length > 0
                ? CategoryProductsData.map((item: CategoriesInterface) => (
                    <SwiperSlide
                      className={`${selectedCategory === item.id ? "active" : ""}`}
                      key={item.id}
                      onClick={() => {
                        getPopularProductForCategory(item.id);
                        setSelectedCategory(item.id);
                      }}>
                      {item.title}
                    </SwiperSlide>
                  ))
                : ""}
            </Swiper>
          </div>

          {mobile ? (
            <div className="categories-filtering-items">
              <Swiper spaceBetween={12} slidesPerView={1.2}>
                {loading ? (
                  <Loader />
                ) : (
                  <React.Fragment>
                    {filteredItems.map((item: ProductsInterface) => (
                      <SwiperSlide key={item.id}>
                        <Link
                          to={`/products/${item?.slug.toLowerCase()}`}
                          className={`subitem ${selectedCategory === item?.parent_category_id ? "addanim" : ""}`}>
                          <img className="shop-bag" src="../shopbag.svg" alt="show" title="Səbət" />
                          <div
                            className="add-favourites"
                            onClick={(e) => {
                              addFavourite(
                                {
                                  title: item?.title,
                                  price: item?.price,
                                  discounted_price: item?.discounted_price,
                                  content: item?.content,
                                  id: item?.id,
                                  img: item?.img,
                                  images: item?.images,
                                  is_favorite: item?.is_favorite,
                                  is_in_cart: item?.is_in_cart,
                                  is_popular: item?.is_popular,
                                  is_stock: item?.is_stock,
                                  parent_category_id: item?.parent_category_id,
                                  slug: item?.slug,
                                  modules: item?.modules,
                                  options: item?.options,
                                  category_name: item?.category_name,
                                },
                                e,
                                item?.id
                              );
                            }}>
                            {favouriteItems[item?.id] ? (
                              <IoMdHeart className="fav-icon-fill" />
                            ) : (
                              <CiHeart className="fav-icon" />
                            )}
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
                                <span>{calculatePercentage(item)?.split(".00")}</span>
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
                              <span>{item.price} AZN</span>
                              <article className="discountprice">{item.discounted_price} AZN</article>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
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
                  {filteredItems.slice(0, 4).map((item: ProductsInterface) => (
                    <Link
                      to={`/products/${item?.slug.toLowerCase()}`}
                      key={item.id}
                      className={`subitem ${selectedCategory === item.parent_category_id ? "addanim" : ""}`}>
                      <div className="add-basket">
                        <HiOutlineShoppingBag className="shopping-bag" />
                      </div>
                      <div
                        className="add-favourites"
                        onClick={(e) => {
                          addFavourite(
                            {
                              title: item?.title,
                              price: item?.price,
                              discounted_price: item?.discounted_price,
                              content: item?.content,
                              id: item?.id,
                              img: item?.img,
                              images: item?.images,
                              is_favorite: item?.is_favorite,
                              is_in_cart: item?.is_in_cart,
                              is_popular: item?.is_popular,
                              is_stock: item?.is_stock,
                              parent_category_id: item?.parent_category_id,
                              slug: item?.slug,
                              modules: item?.modules,
                              options: item?.options,
                              category_name: item?.category_name,
                            },
                            e,
                            item?.id
                          );
                        }}>
                        {favouriteItems[item?.id] ? (
                          <IoMdHeart className="fav-icon-fill" />
                        ) : (
                          <CiHeart className="fav-icon" />
                        )}
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
                          <span>{item.price} AZN</span>
                          <article className="discountprice">{item.discounted_price} AZN</article>
                        </div>
                      </div>
                    </Link>
                  ))}
                </React.Fragment>
              )}
            </div>
          )}

          <div className="all-products">
            <Link to="/products">
              <span>Bütün məhsullara bax</span>
              <img src="../linearrowgreen.svg" alt="right" title="Bütün məhsullar" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInterface;
