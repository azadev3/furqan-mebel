import React from "react";
import "../styles/homepage.scss";
import Hero from "../components/homepageuitils/Hero";
import CategoriesSection from "../components/homepageuitils/CategoriesSection";
import PopularProducts from "../components/homepageuitils/PopularProducts";
import SpecialOffers from "../components/homepageuitils/SpecialOffers";
import AboutAndServices from "../components/homepageuitils/AboutAndServices";
import CustomersComment from "../components/homepageuitils/CustomersComment";
import Blog from "../components/homepageuitils/Blog";
import Contact from "../components/homepageuitils/Contact";
import { Helmet } from "react-helmet";
import { useSeo } from "../useSeo";

const Homepage: React.FC = () => {
  const seoData = useSeo("home_page");

  return (
    <div className="homepage-wrapper">
      <Helmet>
        <title>{seoData?.seo_title || "Furqan Mebel | Ana səhifə"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="description" content={seoData?.seo_description || "Welcome to Furqan Mebel - Your destination for stylish and modern furniture."} />
        <meta name="keywords" content={seoData?.seo_keywords || "furniture, home, design, modern"} />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <div className="homepage">
        <Hero />
        <CategoriesSection />
        <PopularProducts />
        <SpecialOffers />
        <AboutAndServices />
        <CustomersComment />
        <Blog />
        <Contact />
      </div>
    </div>
  );
};

export default Homepage;
