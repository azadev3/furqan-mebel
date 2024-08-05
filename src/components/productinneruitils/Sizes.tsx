import React from "react";

type ProductSizeType = {
  id: number;
  description: string;
};

const Sizes: React.FC = () => {
  const Productsizes: ProductSizeType[] = [
    {
      id: 1,
      description: "Dolab 6 qapılı: En-2700 mm, hündürlük-2130 mm, dərinlik-600 mm",
    },
    {
      id: 2,
      description: "Dolab 6 qapılı: En-2700 mm, hündürlük-2130 mm, dərinlik-600 mm",
    },
    {
      id: 3,
      description: "Dolab 6 qapılı: En-2700 mm, hündürlük-2130 mm, dərinlik-600 mm",
    },
    {
      id: 4,
      description: "Dolab 6 qapılı: En-2700 mm, hündürlük-2130 mm, dərinlik-600 mm",
    },
    {
      id: 5,
      description: "Dolab 6 qapılı: En-2700 mm, hündürlük-2130 mm, dərinlik-600 mm",
    },
  ];

  return (
    <section className="sizes-content">
      <h3>Ölçülər</h3>

      <div className="grid-item-sizes">
        {Productsizes.map((item: ProductSizeType) => (
          <div key={item?.id} className="product-size">
            <p>{item?.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sizes;
