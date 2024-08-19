import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";

export const sendFavouritesToDB = async (favitems: CatProductType[], token: string, lang: string) => {
  try {
    const response = await axios.post(`${Baseurl}/favorites/addAll`, favitems, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });

    if (response.data) {
      console.log(response.data, "going");
    } else {
      console.log(response.status);
    }
  } catch (error) {}
};
