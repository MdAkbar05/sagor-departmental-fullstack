import React from "react";

import "react-toastify/dist/ReactToastify.css";

import HeroSection from "../../components/hero-section";
import Features from "../../components/features";
import { useDispatch } from "react-redux";
import Companys from "../Companys";
import Maps from "../../components/maps/Maps";
import TestimonialSlider from "../Testimonials";
import Categories from "../Popular-Categories";
import ContactInfo from "../Contacts/ContactInfo";
import ContactForm from "../Contacts/ContactForm";
import BusinessHours from "../../components/BusinessHour";
import Category from "../../components/category";
import RecentProduct from "../../components/Recent-Products";
import PopularCategory from "../../components/Popular-category";
const Home = () => {
  return (
    <div className="container mx-auto ">
      <HeroSection />
      <Features />
      <Category />
      <RecentProduct />
      <Companys />
      <PopularCategory />
      <Categories />
      <TestimonialSlider />
      <BusinessHours />
      <ContactInfo />
      <Maps />
      <ContactForm />
    </div>
  );
};

export default Home;
