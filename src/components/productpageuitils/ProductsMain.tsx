import React from "react";
import Categories from "./filteruitils/productmainuitils/Categories";
import { v4 as uuidv4 } from "uuid";
import PaginationProductsPage from "./filteruitils/productmainuitils/PaginationProducts";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkboxCheckedState, rangeMinMaxInputState, selectedCategoryStateProductPage } from "../../recoil/Atoms";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { ProductsInterface } from "../homepageuitils/PopularProducts";

export type ProductsPageProductsType = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  discountPrice: string;
  image: string;
};

export const ProductsPageProducts: ProductsPageProductsType[] = [
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "120.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "8390.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "23.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "8290.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "1230.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "84390.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "190.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "20.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "230.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "2300.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "8390.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "3890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "31890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yataq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "qonaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "qonaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "qonaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "qonaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "qonaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "qonaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },

  {
    id: uuidv4(),
    slug: "yumşaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "yumşaq",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "dehliz",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "dehliz",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "uşaqvəgənc",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "herbi",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
  {
    id: uuidv4(),
    slug: "diger",
    title: "Daddy Kreslo",
    category: "Ev mebelləri",
    discountPrice: "1228.00",
    price: "890.00",
    image: "../glory.jpeg",
  },
];

const ProductsMain: React.FC = () => {


  const activeLanguage = useRecoilValue(SelectedLanguageState);

  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryStateProductPage);

  // // FETCH CATEGORIES
  // const { data: CategoryProductsData } = useQuery({
  //   queryKey: ["categoryProductsKey", activeLanguage],
  //   queryFn: async () => {
  //     const response = await axios.get(`${Baseurl}/categories`, {
  //       headers: {
  //         "Accept-Language": activeLanguage,
  //       },
  //     });
  //     return response.data?.categories;
  //   },
  //   staleTime: 1000000,
  // });

  // //set first category mounted component
  // React.useEffect(() => {
  //   if (CategoryProductsData && CategoryProductsData.length > 0) {
  //     const firstCategory = CategoryProductsData[0]?.id;
  //     setSelectedCategory(firstCategory);
  //   }
  // }, [CategoryProductsData]);

  //FETCH ALL PRODUCTS
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

  const handleSelect = (id: number | null) => {
    setSelectedCategory(id);
  };

  // Filter items

  //eger chekcbox secilibse (if selected checkbox)
  const isChecked = useRecoilState(checkboxCheckedState);

  //min - max inputs
  const inputValue = useRecoilValue(rangeMinMaxInputState);

  const filterForRangesMinMax = (products: ProductsInterface[]) => {
    const minPrice = Number(inputValue[1] || 0);
    const maxPrice = Number(inputValue[2] || Infinity);

    return products && products.length > 0
      ? products.filter((item: ProductsInterface) => {
          const price = Number(item.price);
          return price >= minPrice && price <= maxPrice;
        })
      : [];
  };

  //return by filter controls
  const controlFilterSystemFunction = (products: ProductsInterface[], isChecked: number | null) => {
    let filteredProducts = products ? products : [];

    // Filter by categories
    if (selectedCategory) {
      filteredProducts =
        filteredProducts && filteredProducts.filter((item: ProductsInterface) => selectedCategory === item.parent_category_id);
    }

    // Filter by price range
    filteredProducts = filterForRangesMinMax(filteredProducts);

    // Sort by checkbox state
    switch (isChecked) {
      case 1:
        return filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
      case 2:
        return filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
      case 3:
      case 4:
        return filteredProducts; // Return as is for cases 3 and 4
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = controlFilterSystemFunction(
    allProductsData && allProductsData.length > 0 ? allProductsData : [],
    isChecked[0]
  );

  return (
    <div className="products-main">
      <span className="title">Məhsullar</span>
      <div className="container-product-main">
        <Categories
          selectedCategory={selectedCategory}
          handleSelect={handleSelect}
          setSelectedCategory={setSelectedCategory}
        />
        <PaginationProductsPage
          data={allProductsData && allProductsData?.length > 0 ? filteredProducts : []}
          itemsPerPage={12}
        />
      </div>
    </div>
  );
};

export default ProductsMain;
