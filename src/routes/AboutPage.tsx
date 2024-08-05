import React from "react";
import NavigationShower from "../uitils/NavigationShower";

type AboutType = {
  id: number;
  title: string;
  image: string;
  paragraph: string;
};

type ServiceType = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const AboutPage: React.FC = () => {
  const aboutMockParagraph: string =
    "Lorem ipsum dolor sit amet consectetur. Purus fames blandit rhoncus molestie amet pulvinar eget porttitor. Dignissim amet bibendum vitae egestas. Dolor magnis arcu ac mattis fringilla diam fames eu. Amet varius vitae volutpat urna. Auctor mauris adipiscing habitant magna. Volutpat ut morbi at tempor eu odio. Eu tincidunt nisl pellentesque proin suscipit hendrerit. In placerat et hac egestas massa leo nunc amet non. Amet sit at at ultrices neque diam. Amet eget suspendisse egestas id urna eu turpis. Placerat rhoncus a dictum scelerisque libero vestibulum in id ullamcorper. Aliquet donec risus dui purus et pharetra ut. Diam in nisl risus consequat sed scelerisque. Semper bibendum eu cursus nisl libero etiam integer. Eget risus tellus imperdiet venenatis suspendisse. Lacus tellus enim ut nunc pharetra enim metus elit. Enim turpis bibendum nam quam. Eget non nulla metus massa euismod quam vitae facilisis malesuada. Purus eleifend iaculis lacinia nisl venenatis varius lectus. Sit mi pretium molestie suscipit at ac neque. Ac elementum et dis etiam. Phasellus amet turpis cras nisl commodo. Elit vitae montes ipsum amet ipsum tempus sollicitudin amet iaculis. Lobortis elementum ut mollis quam turpis adipiscing. Pretium quam amet ullamcorper arcu ut tellus tortor at. Nec at sit pretium hendrerit sed nulla morbi velit hendrerit. Leo integer enim habitasse ultrices tristique sodales. A enim lectus in vitae adipiscing laoreet dignissim ut eget. Id ipsum feugiat vitae tincidunt morbi scelerisque nisl aliquam aenean. A tristique molestie pulvinar id. Viverra ut viverra vestibulum a pellentesque. Ullamcorper convallis risus in posuere. In in tempus posuere eget adipiscing in. Interdum magna condimentum sit a sed nam. Duis hendrerit sem blandit lacus nunc risus et. Est bibendum et sapien faucibus non. Amet nibh feugiat pharetra euismod rhoncus massa turpis. Morbi molestie vel nulla adipiscing elit netus in molestie. Elit vel lobortis elementum lectus lacinia et gravida. Adipiscing at est nec ipsum aenean facilisis in. Interdum justo sed arcu adipiscing. Dictum viverra ligula libero ut. Sit habitasse tortor eu id vitae. Diam nisl lacus pharetra ligula vel sed amet nec. Velit in pellentesque diam a urna id. Quis est id tristique lectus pellentesque eget sit elementum hendrerit. Viverra ac aliquam ut a ridiculus mattis pretium viverra hendrerit. Volutpat diam sit diam mattis in volutpat sit nibh. Molestie non velit semper aenean in diam eu tempor in. Sit eu sit nam a sagittis eu nunc porttitor sodales. Enim duis vel scelerisque aliquet adipiscing viverra.";
  const AboutItems: AboutType = {
    id: 1324234,
    title: "Haqqımızda",
    image: "../aboutimg.jpeg",
    paragraph: aboutMockParagraph,
  };

  const ServicesItems: ServiceType[] = [
    {
      id: 1,
      title: "2 il Qarantiya",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../certificate 1.svg",
    },

    {
      id: 2,
      title: "Sərfəli Qiymət",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../moneybag.svg",
    },

    {
      id: 3,
      title: "Pulsuz Çatdırılma",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../truck.svg",
    },

    {
      id: 4,
      title: "Lux Mebellər",
      description: "Lorem ipsum dolor sit amet consectetur. Sed amet pulvinar cursus volutpat dolor.",
      icon: "../arn.svg",
    },
  ];

  return (
    <div className="about-page-wrapper">
      <div className="about-page">
        <NavigationShower prevpage="Haqqımızda" />

        <div className="about-content">
          <div className="backg-image">
            <img src={AboutItems?.image} alt={`${AboutItems.id}-image`} title={AboutItems?.title} />
            <h1>{AboutItems?.title}</h1>
          </div>
          <div className="paragraphs">
            <p>{AboutItems?.paragraph}</p>
          </div>
        </div>

        <div className="services-us">
          <h2>Xidmətlərimiz</h2>
          <div className="grid-services">
            {ServicesItems.map((item: ServiceType, index: number) => (
              <div className="item-service" key={item.id}>
                <div className="icon">
                  {index === 0 && (
                    <img
                      style={{ borderRadius: "100px" }}
                      src="https://s3-alpha-sig.figma.com/img/f040/4de0/332e2ef09e264a526edf21e5bf2b826f?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=lX0O4L-LQQR7~KXQG8vxIeRVl4aCtAemX6xu0ztfJz24wX55ojO9Qx6vChNsp6ZuSxC1-47Yovzm~BKxMo1umPB5gwDuQmITUVwTWz~LXXqDRhoIC9DPZ5A0btl7UUC8xr27K9Eagr1J~NajebwitWUpqoIecBnNeCD386lp01ugVJwnge1emPSi2HZmx4cIU23KiHTj7S8~9Vh5HjohpmRswqwOOe~3Y4cbckO-ax7HmVTnX932tzQJicI0R4O24i89Gwg89p9R8Aoa-AQLGz~4~S~Sv7ciJ6JsuFyEL8aRN0vRaN3FnslFbeH4EabGDjy80f9TVmgxXAKeWF4CGw__"
                      width="633"
                      height="633"
                    />
                  )}
                  {index === 1 && (
                    <img
                      style={{ borderRadius: "100px" }}
                      src="https://s3-alpha-sig.figma.com/img/bb01/3b18/6302cbc49889c842e8795603fde5d064?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=OoMoJsO6kQFtxW62d4yuHlxanmh-ZgjRyF6NtCwsyTn2zQXx86fugBTuXp3d9dfWcfs~NXMdixkIulowdtUVbBcX01dEtfJdDPEhkt6U0WcGtDrQWkwUyQYITPH0cHP47GPAX~USCyUgu1DUyJ0Nh79USE889IrpdefO97peVmlg90hSGOt3POc46MG7Ye0VGSm2~Gyhk-fduMGSLdn1uIeCjZAILfbO1~uG-zwcvP~w81wjRxYkspzO5SPZKFPuVqpVkvPwHnA2SU8tnE-9W9S3sLfiWD45CyRzV6CAWSJLADTGFbphGHGDydOcoTEtQ3rYpXs2B3D~5WZM5oVuMQ__"
                      width="633"
                      height="633"
                    />
                  )}
                  {index === 2 && (
                    <img
                      src="https://s3-alpha-sig.figma.com/img/8a17/db3f/e79bde9090d7c9ede880705d1d96fa3a?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=jomuSvClArVdvqSlb9ZLmJ~lHsY~yjBOMRPbGQPkFt2nSlsjytkkW-tzCOX-T6o1XhS1ZgrGrJyNnxlySUn4T4Y7P6esV0Rq85U97IpHrtCovFBflg52qd8AZgc6taWBY5rb3AJHqYpUTSGNBm4qkGARuSmAUQ5LnRKB63y~-DCF1Fv3-fwsFxDaiw-oQtCKoNU3e00-SbwPi0pMMJK~S6uvG4lmUAx5HkFn5Ylb3uqTF3oGNSpG~~UEsLcDbW8-52-URtNIl~1LUcvN5L1nqJIyAR9DlKOvOBdgI-ji4U4YV3dJ7Br6XIqbmtgtsClMu8RhNmGMLTzF3D199PTe9Q__"
                      style={{ borderRadius: "100px" }}
                      width="633"
                      height="633"></img>
                  )}
                  {index === 3 && (
                    <img
                      style={{ borderRadius: "100px" }}
                      src="https://s3-alpha-sig.figma.com/img/1f46/a866/4c338f45748e1130a2c5dae8f93fbbfa?Expires=1722816000&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=Urq7da85PLBduZu73oklXLgcxkZzDhWa3WULJSlTmGzDJkpbkaMQxMhdRHDaOvOm~xVIxltOHEkpXzcIdmlxAgCN78EQzNfdRG6TVOrYOjelELkqRxD~n0-qKtgmdaRrxXu3huqSP7v~cFJNLCXUFshqQ6wQJUkOMwU5hcnowPn8Aqj7NAs2TWVw0Xu97g111ZBUdMaPi7kM1yM9EMrp1vSvgffGMN02b61urGxZhdBfQ2KFa13Hmnmv~Iz0eqwG8kmfcQiJS6usgIF607a01CH5xbx-WpDiaKfIaMiHjZmP192hFJ0V6JtEmU0YGIpNZw5Y02uVEoCiGjwhm15TWA__"
                      width="633"
                      height="633"
                    />
                  )}
                </div>

                <div className="titles-bottom">
                  <span>{item?.title}</span>
                  <p>{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
