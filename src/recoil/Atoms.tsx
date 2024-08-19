import { atom } from "recoil";
import { FavouriteItemType } from "../components/productpageuitils/filteruitils/productmainuitils/PaginationProducts";
import { ProductsInterface } from "../components/homepageuitils/PopularProducts";

//user is auth state
export const UserIsAuthState = atom<boolean>({
  key: "useIsAuthState",
  default: false,
});

//products page states for filters
export const selectedCategoryStateProductPage = atom<number | null>({
  key: "selectedCategoryState",
  default: null,
});

//checkbox state
export const checkboxCheckedState = atom<number | null>({
  key: "checkboxCheckedState",
  default: null,
});

//range min max input state
export const rangeMinMaxInputState = atom<{ [key: number]: string }>({
  key: "rangeMinMaxInputState",
  default: {},
});

//profile dropdown menu state
export const profileDropdownState = atom<boolean>({
  key: "profileDropdownState",
  default: false,
});

//dashboard links active - deactive state
export const dashboarLinksActiveState = atom<number | null>({
  key: "dashboardLinksActiveState",
  default: 1,
});

//scroll header state
export const scrollHeaderState = atom<boolean>({
  key: "scrollHeaderStateKey",
  default: false,
});

//login-register menu state
export const LoginMenuState = atom<boolean>({
  key: "loginMenuStateKey",
  default: false,
});

//actived register page
export const ActiveRegisterPageState = atom<boolean>({
  key: "activeRegisterPageKey",
  default: false,
});
//actived login page
export const ActiveLoginPageState = atom<boolean>({
  key: "activeLoginPageKey",
  default: false,
});

//fav items
export const favouriteItemsState = atom<FavouriteItemType[]>({
  key: "favouriteItemsState",
  default: JSON.parse(localStorage.getItem("favourites") || "{}"),
});
//if user added favourites on the item (boolean)
export const userAddedFavourite = atom<boolean>({
  key: 'userAddedFavKey',
  default: false,
})

//basket items
export const basketItemState = atom<ProductsInterface[]>({
  key: 'basketItemState',
  default: JSON.parse(localStorage.getItem("baskets") || "{}"),
});
//if user added basket on the item (boolean)
export const userAddBasket = atom<boolean>({
  key: 'userAddedBasketKey',
  default: false,
})

//show product inner image modal
export const showImgState = atom<string>({
  key: "showImgModalStateKey",
  default: "",
});

// catalog state
export const catalogState = atom<boolean>({
  key: "catalogstate",
  default: false,
})

//loading state 
export const LoadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});