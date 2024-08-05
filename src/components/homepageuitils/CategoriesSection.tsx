import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

type CategorySectionType = {
  id: string;
  title: string;
  image: string;
};

const CategoriesSection: React.FC = () => {
  const CategoriesSectionItems: CategorySectionType[] = React.useMemo(
    () => [
      {
        id: uuidv4(),
        title: "Ev",
        image: "../img1.jpeg",
      },
      {
        id: uuidv4(),
        title: "Qapılar",
        image: "../3.jpeg",
      },
      {
        id: uuidv4(),
        title: "Wood",
        image: "../ofis.jpeg",
      },
      {
        id: uuidv4(),
        title: "Ofis",
        image: "../4.jpeg",
      },
      {
        id: uuidv4(),
        title: "Otel",
        image: "../44.jpeg",
      },
      {
        id: uuidv4(),
        title: "Restoran & kafe",
        image: "../55.jpeg",
      },
      {
        id: uuidv4(),
        title: "Ev",
        image: "../4.jpeg",
      },
      {
        id: uuidv4(),
        title: "Ofis",
        image: "../44.jpeg",
      },
      {
        id: uuidv4(),
        title: "Otel",
        image: "../3.jpeg",
      },
      {
        id: uuidv4(),
        title: "Ev",
        image: "../img1.jpeg",
      },
      {
        id: uuidv4(),
        title: "Restoran",
        image: "../44.jpeg",
      },
      {
        id: uuidv4(),
        title: "Kafe",
        image: "../55.jpeg",
      },
    ],
    []
  );
  

  return (
    <section className="categories-wrapper">
      <div className="categories">
        <h1>Kateqoriyalar</h1>

        <div className="grid-categories-section">
          <Swiper spaceBetween={24}
          breakpoints={{
            268: {
              slidesPerView: 1.5,
              spaceBetween: 12
            },
            568: {
              slidesPerView: 4.3,
            },
            968: {
              slidesPerView: 6,
            }
          }}
          navigation={true} modules={[Navigation]} className="mySwiper">
            {CategoriesSectionItems.map((category) => (
              <SwiperSlide className="grid-item" key={category.id}>
                <img src={category.image} alt={category.title} />
                <h2>{category.title}</h2>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
