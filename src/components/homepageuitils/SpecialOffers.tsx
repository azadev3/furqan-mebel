import React from "react";
import { Link } from "react-router-dom";
import { useTranslations } from "../../TranslateContext";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SelectedLanguageState } from "../header/SelectedLanguage";
import axios from "axios";
import { CatProductType } from "../productpageuitils/filteruitils/CategoriesForFilter";
import moment from "moment";

export interface CampaignsInterface {
  id: number;
  title: string;
  campaign_price: string;
  campaign_end_time: string;
  product: CatProductType[];
}

const SpecialOffers: React.FC = () => {

  const activeLang = useRecoilValue(SelectedLanguageState);

  const { translations } = useTranslations();

  const { data: Campaigns } = useQuery<CampaignsInterface[]>({
    queryKey: ["campaignDataKey", activeLang],
    queryFn: async () => {
      const response = await axios.get("https://admin.furqanmebel.az/api/campaigns", {
        headers: {
          "Accept-Language": activeLang,
        },
      });
      console.log(response.data?.blogs);
      return response.data?.blogs;
    },
    staleTime: 1000000,
  });

  const hasCampaigns = Campaigns && Campaigns?.length > 0;

  return (
    <div className="special-offers-wrapper">
      <div className="special-offers">
        <h1>{translations["xususi_teklifler"]}</h1>

        <div className="gridoffer">
          <div className="left">
            {hasCampaigns &&
              Campaigns?.map((item: CampaignsInterface) => {
                const product: any = item?.product;
                if (product && Object.keys(product).length > 0) {
                  return (
                    <React.Fragment key={item.id}>
                      <img src={product.img} alt={`${product.id}-image`} title={product.title} />
                      <div className="text-for-left">
                        <div className="discount">
                          <span>xüsusi təklif</span>
                          <span className="discount-count">{product.discounted_price || product.price} AZN</span>
                        </div>
                        <h1>{product.title}</h1>
                        <Link to={`/product_single/${product?.slug}`} className="formore">
                          <span>Daha çox</span>
                          <img src="../rightorange.svg" alt="right" title="Daha çox" />
                        </Link>
                      </div>
                    </React.Fragment>
                  );
                } else {
                  return <p>Bu kampanyada məhsul yoxdur.</p>;
                }
              })}
          </div>

          <div className="right">
            {hasCampaigns &&
              Campaigns?.map((item: CampaignsInterface) => (
                <React.Fragment key={item.id}>
                  <span>{translations["muntezem_teklif"]}</span>
                  <span style={{ fontSize: "24px", padding: "12px 0px", fontWeight: "600" }}>
                    {moment(item?.campaign_end_time).format("DD.MM.YYYY")}
                  </span>
                  <h1>{item.title}</h1>
                  <div className="cash-and-code">
                    <span>{item?.campaign_price} AZN</span>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
