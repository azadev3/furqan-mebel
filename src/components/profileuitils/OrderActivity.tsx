import React from "react";

type OrderActivityTypes = {
  id: number;
  title: string;
  date: string;
  time: string;
  icon: string;
};

const OrderActivity: React.FC = () => {
  const OrderActivity: OrderActivityTypes[] = [
    {
      id: 1,
      title: "Məhsulunuz təhvil verildi. Furqan mebeldən alış veriş etdiyiniz üçün təşəkkürlər.",
      date: "23 Yanvar, 2025",
      time: "7:32 PM",
      icon: "../Checks.svg",
    },
    {
      id: 2,
      title: "Kuryer sifarişi götürdü",
      date: "23 Yanvar, 2025",
      time: "2:00 PM",
      icon: "../two.svg",
    },
    {
      id: 3,
      title: "Your order on the way to (last mile) hub.",
      date: "23 Yanvar, 2025",
      time: "5:32 PM",
      icon: "../MapTrifold.svg",
    },
    {
      id: 4,
      title: "Sifarişiniz təsdiqləndi.",
      date: "20 Yanvar, 2025",
      time: "7:32 PM",
      icon: "../checktwo.svg",
    },
    {
      id: 5,
      title: "Sifarişiniz qeydə alındı",
      date: "19 Yanvar, 2025",
      time: "2:61 PM",
      icon: "../Notepad.svg",
    },
  ];

  return (
    <div className="order-activity">
      <span className="title">Sifariş aktivliyi</span>

      <div className="activities">
        {OrderActivity.map((item: OrderActivityTypes) => (
          <div key={item?.id} className="item-activity">
            <div className="icon">
              <img src={item?.icon} alt={`${item?.id}-icon`} title={item?.title} />
            </div>
            <div className="descriptions-activity">
              <span>{item?.title}</span>
              <article>
                <span>{item?.date}</span>
                <span>{item?.time}</span>
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderActivity;
