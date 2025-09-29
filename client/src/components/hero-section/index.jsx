import React from "react";
import Slider from "react-slick";
import banner1 from "./img/banner4.png";
import banner2 from "./img/banner4.png";
import banner3 from "./img/banner4.png";
// Importing required CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // Slider settings for react-slick
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite loop for the slider
    speed: 3000, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in ms
    arrows: true, // Show next/prev arrows
  };

  // Data for slides
  const sliderData = [
    {
      image: banner1,
      title: "Shop in Our Grossary Store",
      subtitle: "Start shopping and save your time and money",
      link: "/products",
    },
    {
      image: banner2,
      title: "Best Deals Everyday",
      subtitle: "Find your favorite products at unbeatable prices",
      link: "/products",
    },
    {
      image: banner3,
      title: "New Arrivals",
      subtitle: "Check out the latest in fashion, electronics, and more",
      link: "/products",
    },
  ];

  return (
    <div className="bg-white h-full  relative flex justify-center items-center">
      <Slider {...settings} className="w-full h-auto relative">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="bg-hero relative sm:h-72 md:h-[80vh] flex justify-center items-center"
          >
            <div className="flex justify-evenly sm:flex-col md:flex-row items-center  text-start p-12">
              <Link to={slide.link} className="space-y-6 md:pr-20">
                <h1 className="sm:text-2xl sm:text-center md:text-start md:text-7xl font-bold text-black ">
                  {slide.title}
                </h1>
                <p className="md:text-2xl sm:text-sm  md:font-semibold sm:font-medium text-black sm:text-center md:text-start">
                  {slide.subtitle}
                </p>
              </Link>

              <img
                src={slide.image}
                alt="banner"
                className=" md:w-1/2 h-auto "
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
