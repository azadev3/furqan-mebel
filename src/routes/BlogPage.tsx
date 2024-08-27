import React from "react";
import NavigationShower from "../uitils/NavigationShower";
import TopTwoCards from "../components/blogpageuitils/TopTwoCards";
import Blogs from "../components/blogpageuitils/Blogs";
import { Helmet } from "react-helmet";

const BlogPage: React.FC = () => {
  return (
    <div className="blog-page-wrapper">
      <Helmet>
        <title>Furqan Mebel | Bloqlar</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="theme-color" content="#ffffff" />
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
