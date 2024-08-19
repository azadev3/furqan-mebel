import axios from "axios";
import { Baseurl } from "../../api/Baseurl";
import { CatProductType } from "../../components/productpageuitils/filteruitils/CategoriesForFilter";

export const addFavouriteFunction = async (favid: any, items: CatProductType[], lang: string, token: string) => {
     try {
          const response = await axios.post(`${Baseurl}/favorites/add/${favid}`, items, {
               headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept-Language": lang,
               }
          });

          if(response.data) {
               console.log(response.data, 'getdi');
          } else { 
               console.log(response.status);
          }
     } catch (error) {
          console.log(error);
     }
}