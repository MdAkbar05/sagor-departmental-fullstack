import React, { useEffect } from "react";
import title from "./imgs/title.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../features/productSlice";

const Categories = () => {
  const { categories, error, status } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading")
    return <div className="flex justify-center text-xl my-12">Loading...</div>;
  if (error)
    return (
      <div className="text-center font-semibold text-red-500 p-4 bg-white mt-4">
        {error} <br /> Your server maybe down
      </div>
    );

  return (
    <section className="bg-white py-16 mt-8 space-y-6">
      {/* Title  */}
      <img
        className="sm:hidden md:flex w-fit"
        src={title}
        alt="Explore Categories"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Explore Categories
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />

      {/* Categories List */}
      <ul className="flexCenter flex-col sm:flex-row flex-wrap gap-8">
        {categories.map((category) => (
          <li
            key={category._id}
            onClick={() => {
              dispatch(getProductsByCategory(category.slug));
              navigate(`/products?category=${category.slug}`);
            }}
            className="bg-coffe shadow-lg rounded-lg p-6 text-center border-t-4 border-secondary transform hover:scale-105 transition-transform duration-300 flexCenter flex-col    text-primary  text-lg font-semibold   cursor-pointer lg:w-3/12 md:w-3/5 sm:w-4/5 h-44"
          >
            <BiCategory size={36} className="mb-2" />
            {category.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
