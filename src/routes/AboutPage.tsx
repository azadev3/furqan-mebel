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
                        src="https://s3-alpha-sig.figma.com/img/f040/4de0/332e2ef09e264a526edf21e5bf2b826f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YTtg00tNWraN72IWwi6g9zOcDt6KjGk-vF2u5DpfIlYdEXn9dfx1MxY~v0eNiJFosc8pGSBSnY8HWo9bEMxeq2kF743ygasmL~7R8ra-s-a20eK1vIkTmUPrbwivlclAXMVBfmV6mGW4k2I0UebV8aOTgJOcw8cCJOmjJc5pneQ-gcVoB9t6LTA0NmWTiRNetkRrtk~5wQnJ-NEQ6hdW~ILb8VcGP5eczdZZlNPNGmR-jwhFxLdGA-sSN8~tr1fqKIamukXVsaB8aaj9J2dwDMJ5kJOCMb5PEwVaZRRLnnhMWbYAnU0Lp9nJ5Qf222yxxO-3EPwIoMFQBYemcO3QEg__"
                        width="633"
                        height="633"
                      />
                    )}
                    {index === 1 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/bb01/3b18/6302cbc49889c842e8795603fde5d064?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nB9oKEDTQt5Ri1qsmHoJVgTlR~C9tCskeaG8p8ZylaPIRn7AcxVhbLQiBhvyD4HQsA8AP2jPFMk9ScIV0jcgI7mJL8CeBD5vUMjVAVuw-MsCpaiDxHmGjibG9MlnY~VzzG7hvFI1WjIeDr0fex0tmq~cVsXvGEWJEbEq-Wp7NcQd7kQSlNdonejhfDm2MbL7enlsln78uetxntycR9fnNUUAiiRnm6HKorFtbKSEu8ffhc-aLeZjiqsYMMlgTeNW6B7SYkngno7sIozorTE3XMZHs2w08TMMLxmgZkfxyeKiDL7vMwHrtAD6xZ1nOmM~Y9O1ITkTEZLptN2Q-2j4Ow__"
                        width="633"
                        height="633"
                      />
                    )}
                    {index === 2 && (
                      <img
                        src="https://s3-alpha-sig.figma.com/img/8a17/db3f/e79bde9090d7c9ede880705d1d96fa3a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m~YHyiMZ39XOdT~idgbshtiRSxwHuj8Ectsv3oUHv2TWJ4hRdsx7CyMC44Z6yetGkUkfPMC5fc0BdcC-z9OYCrG5VvEgCNbu7uRUSYvodue3yrLcL0mtpo4qwruAz1yX47t9uIuu1u4S9zYrT4CbZ5qqVE2U5OEOuxMoBAYnWRJNjghT~2zm4DYbopNF5eLEu5QGpfjMQGMxEbwAv~5r-aZUphf0Bx~0ecoyR4hdvcGBms3cGRnV7tOoeR1ZqVwm6JLSLb5iPpBXhbRNnLSXJH43eQvIznNMtIn3bkAYp~I5PyVOE8P3XNJQGxg4wtCDyBAy1zUzXLvdnS5QED3SsQ__"
                        style={{ borderRadius: "100px" }}
                        width="633"
                        height="633"></img>
                    )}
                    {index === 3 && (
                      <img
                        style={{ borderRadius: "100px" }}
                        src="https://s3-alpha-sig.figma.com/img/1f46/a866/4c338f45748e1130a2c5dae8f93fbbfa?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nkx1vh4z8OHK6FUqKpGERCuf0C~qmcS3Ys1I1lL48wK750vfMwmNIPuuYD9UryUIRAngAdy2SZ6baY2wk2E7CiNHKTAqgc9AozhTf3zZOWiRbcvNuf0oDTMweev3b5VSiq3BQhgt1ZAmOU9DCDs6Z5zvbV8Y3ajxzZ20TazUX-3i1ijFA5JJIqx7LZ02WmJYJ-pcYNkUxpVgZ71~oRwrqzGKtCkMGkCw1gZnlBaW3BKcPkMdzsrMeJQeBIL5TWoMgyx5omXJPZeFV4TbmY89rfYIHJVOd8cl3LFr8UzsgHoAtAZQTG0tZ9DazORchSKRvuIEV2fXjrrbwv6~HJQZDg__"
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
