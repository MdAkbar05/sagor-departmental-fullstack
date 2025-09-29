import React from "react";
import Slider from "react-slick";

// Importing required CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { categories } from "./categoryData";
import { useDispatch } from "react-redux";
import { getProductsByCategory } from "../../features/productSlice";

const Category = () => {
  const dispatch = useDispatch();
  // Slider settings for react-slick
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite loop for the slider
    speed: 1000, // Transition speed in ms
    slidesToShow: 6, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in ms
    arrows: false, // Show next/prev arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white h-full relative py-4">
      <div className="flex justify-between items-center border border-gray-50 p-1 flex-wrap">
        <Link
          to="/products"
          className="  text-[#323C64] mx-4 md:text-3xl sm:text-xl sm:text-center font-semibold"
        >
          {" "}
          Categories
        </Link>
        <ul className="flex gap-3">
          <li className="sm:text-lg md:text-xl font-medium text-[#323C64] cursor-pointer text-center">
            All
          </li>
          <li className="sm:text-lg md:text-xl font-medium text-gray-600 cursor-pointer text-center">
            Fruits
          </li>
          <li className="sm:text-lg md:text-xl font-medium text-gray-600 cursor-pointer text-center">
            Rice
          </li>
          <li className="sm:text-lg md:text-xl font-medium text-gray-600 cursor-pointer text-center">
            Frozen
          </li>
        </ul>
      </div>
      <Slider {...settings} className="w-full h-auto relative space-x-4 ">
        {categories.map((data, index) => (
          <div
            key={index}
            className=" flex justify-center items-center  px-4 py-8"
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover -mb-1"
            />
            <Link
              to={data.link}
              onClick={() =>
                dispatch(getProductsByCategory(data.link.slice(19)))
              }
              className="text-center flexCenter border text-lg text-white font-medium px-3 py-1.5 bg-hightlight rounded-2xl "
            >
              {data.title}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
