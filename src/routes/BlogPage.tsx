import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import TopTwoCards from "../components/blogpageuitils/TopTwoCards";
import Blogs from "../components/blogpageuitils/Blogs";
import { Helmet } from "react-helmet";
import { useSeo } from "../useSeo";

const BlogPage: React.FC = () => {
  const seoData = useSeo("blog_page");

  return (
    <div className="blog-page-wrapper">
      <Helmet>
        <title>{seoData?.title || "Furqan Mebel | Bloqlar"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
      </Helmet>
      <div className="blog-page">
        <NavigationShower prevpage="Blog" />
        <TopTwoCards />
        <Blogs />
      </div>
    </div>
  );
};

export default BlogPage;
