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

const Homepage: React.FC = () => {
  return (
    <div className="homepage-wrapper">
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
