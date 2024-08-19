import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import { Baseurl } from "../../api/Baseurl";
import axios from "axios";
import { ImagesPopularProducts, OptionsPopularProducts, ProductsInterface } from "../homepageuitils/PopularProducts";
import { showImgState, UserIsAuthState } from "../../recoil/Atoms";
import Loader from "../../uitils/Loader";
import { FaSearch } from "react-icons/fa";
import { addBasketFunction, addBasketFunctionStorage } from "../../features/AddBasket/AddBasket";
import getCookie from "../../getCookie";

const ImageSection: React.FC = () => {
  const { slugproduct } = useParams();

  const isAuth = useRecoilValue(UserIsAuthState);
  const token = getCookie("accessToken");

  //FETCH ALL PRODUCTS
  const activeLanguage = useRecoilValue(SelectedLanguageState);
  const { data: allProductsData } = useQuery({
    queryKey: ["allProductKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/all_products`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.products;
    },
    staleTime: 1000000,
  });

  const productInner =
    allProductsData &&
    allProductsData?.length > 0 &&
    allProductsData.find((item: ProductsInterface) => {
      return item?.slug.toLowerCase() === slugproduct?.toLowerCase();
    });

  //selected item small image
  const [smallImgSelected, setSmallImgSelected] = React.useState<number>(1);

  const handleSelectSmallImage = (id: number) => {
    setSmallImgSelected(id);
  };

  const ColorsMaterialComponent = () => {
    return (
      <div className="colors-material">
        <div className="material-container">
          {productInner && productInner.options && productInner.options.length > 0 ? (
            productInner.options.map((item: OptionsPopularProducts) => (
              <div className="grid-material" key={item?.id}>
                {item.filter && <h4>{item.filter?.title}</h4>}
                <div className="options">{item.icon ? <img src={item.icon} alt="" /> : <span>{item.title}</span>}</div>
              </div>
            ))
          ) : (
            <p style={{ color: "#909090", marginTop: "40px", marginBottom: "40px" }}>Bu məhsula aid material yoxdur.</p>
          )}
        </div>
      </div>
    );
  };

  //SHOW OTHER IMAGE NAVIGATIONS
  const OtherImageNavigationComponent = () => {
    return (
      <div className="show-other-image-navigator">
        {productInner &&
          productInner.images &&
          productInner.images.map((item: ImagesPopularProducts) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectSmallImage(item.id)}
              key={item.id}
              className={`image-small-item ${smallImgSelected === item.id ? "selected" : ""}`}>
              <img src={item.img} alt={`${item.id}-image`} title={item.img} />
            </div>
          ))}
      </div>
    );
  };

  //IMAGE AREA PRODUCT INNER
  const ProductImageWrapperComponent: React.FC = () => {
    const [_, setShowedImg] = useRecoilState(showImgState);

    const selectedImage =
      productInner &&
      productInner.images &&
      productInner.images.find((item: ImagesPopularProducts) => item.id === smallImgSelected);

    const showImageModal = (img: string) => {
      setShowedImg(img);
    };

    return (
      <div className="image-wrapper"  onClick={() => showImageModal(selectedImage?.img || productInner?.img || "")}>
        {productInner && productInner.img.length > 0 ? (
          <>
              <img
                src={selectedImage ? selectedImage.img : productInner?.img || ""}
                alt={selectedImage ? `${selectedImage.id}-image` : `${productInner?.id}-image`}
                title={selectedImage ? selectedImage.img : productInner?.title || ""}
              />

            <FaSearch className="zoom" />
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  };

  const [isAdded, setIsAdded] = React.useState<number | null>(null);

  return (
    <section className="image-section">
      <ProductImageWrapperComponent />
      <OtherImageNavigationComponent />
      <ColorsMaterialComponent />
      <button className={isAdded === productInner?.id ? "remove-basket" : "add-basket"}
      onClick={() => {
        if(isAuth && token) {
          addBasketFunction(productInner?.id, productInner, activeLanguage, token);
          setIsAdded(productInner?.id);
        } else {
          addBasketFunctionStorage(productInner);
        setIsAdded(productInner?.id);
        }
      }}
      >
        {isAdded ? "Məhsul səbəttədir" : "Səbətə əlavə et"}
      </button>
    </section>
  );
};

export default ImageSection;
