import React from "react";
// import { useLocation } from "react-router-dom";

type CardRepitionTypes = {
  id: number;
  processName: string;
  icon: any;
};

const CardRepition: React.FC = () => {
  const Repitions: CardRepitionTypes[] = [
    {
      id: 1,
      processName: "Çatdırılma",
      icon: "../catdirilma.svg",
    },
    {
      id: 2,
      processName: "Ödəniş detalları",
      icon: "../odenisdetallari.svg",
    },
    {
      id: 3,
      processName: "Uğurlu ödəniş",
      icon: "../ugurluodenis.svg",
    },
  ];

  // const [active, setActive] = React.useState<number | null>(null);
  // const location = useLocation();

  return (
    <div className="card-repition">
      <div className="process">
        {Repitions.map((item: CardRepitionTypes) => (
          <div key={item.id} className="item-process">
            {item.id === 1 && <img className="steptrail1" src="../steptrail.svg" />}

            {item.id === 2 && <img className="steptrail2" src="../steptrail.svg" />}
            <div className="icon">
              <img src={item.icon} alt={`${item.id}-icon`} />
            </div>
            <span>{item.processName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardRepition;
