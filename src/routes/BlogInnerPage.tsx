import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import { useParams } from "react-router-dom";
import { BlogsType } from "../components/homepageuitils/Blog";
import { SelectedLanguageState } from "../components/header/SelectedLanguage";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Baseurl } from "../api/Baseurl";
import { Helmet } from "react-helmet";

const BlogInnerPage: React.FC = () => {
  const { slug } = useParams();

  const activeLanguage = useRecoilValue(SelectedLanguageState);

  //Fetch blogs
  const { data: BlogData } = useQuery({
    queryKey: ["blogDataKey", activeLanguage],
    queryFn: async () => {
      const response = await axios.get(`${Baseurl}/blogs`, {
        headers: {
          "Accept-Language": activeLanguage,
        },
      });
      return response.data?.blogs;
    },
    staleTime: 1000000,
  });

  const blogItem =
    BlogData &&
    BlogData.length > 0 &&
    BlogData.find((item: BlogsType) => {
      return item?.slug.toLowerCase() === slug?.toLowerCase();
    });

  return (
    <div className="blog-inner-page-wrapper">
      <Helmet>
        <title>{blogItem && blogItem?.meta_title}</title>
        <meta name="keywords" content={blogItem && blogItem?.meta_keywords} />
        <meta name="description" content={blogItem && blogItem?.meta_description} />
      </Helmet>
      <div className="inner-page-blog">
        <NavigationShower prevpage={blogItem && blogItem.title.toString() ? blogItem.title : ""} />

        <div className="top-description-blog">
          <h1>{blogItem?.title}</h1>
          <div className="author-and-views">
            <span>by Joanna Wellick</span>
            <span className="dot"></span>
            <div className="view">
              <img src="../viewicon.svg" alt="view" title="Views" />
              <span>1.6K views</span>
            </div>
          </div>
        </div>
        <div className="image-blog">
          <img src={blogItem?.img} alt={`${blogItem?.id}-image`} title={blogItem?.title} />
        </div>

        <div className="descriptions" dangerouslySetInnerHTML={{ __html: blogItem?.content }} />
      </div>
    </div>
  );
};

export default BlogInnerPage;
