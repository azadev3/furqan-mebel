import { useRecoilState } from 'recoil';
import { FavouriteItemType } from './components/productpageuitils/filteruitils/productmainuitils/PaginationProducts';
import { favouriteItemsState } from './recoil/Atoms';
import { toast } from 'react-toastify';

// Custom hook to handle adding/removing favourites
export const useAddFavourite = () => {
  const [favouriteItems, setFavouriteItems] = useRecoilState(favouriteItemsState);

  const addFavourite = (favItems: FavouriteItemType, e: React.MouseEvent, id: any) => {
    e.preventDefault();

    setFavouriteItems((prevItems: any) => {
      const isFavorite = prevItems[id] !== undefined;
      let updatedItems;

      if (isFavorite) {
        // remove
        updatedItems = { ...prevItems };
        delete updatedItems[id];
        toast.warning(`${favItems?.title}, sevimlilər kateqoriyasından çıxarıldı!`, {
          position: 'top-center',
        });
      } else {
        // add
        updatedItems = { ...prevItems, [id]: favItems };
        toast.success(`${favItems?.title}, sevimlilər kateqoriyasına əlavə olundu!`, {
          position: 'top-center',
        });
      }

      localStorage.setItem('favourites', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return { addFavourite, favouriteItems };
};
