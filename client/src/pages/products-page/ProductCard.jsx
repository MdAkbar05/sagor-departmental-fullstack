import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

import { toast } from "react-toastify";
import { addToFavourite } from "../../features/favouriteSlice";
import { getProductBySlug } from "../../features/productSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-around gap-y-2   sm:w-64 md:w-68 lg:w-68 h-auto border rounded-3xl shadow-lg shadow-green-100 border-secondary py-2 px-4 bg-white hover:scale-105 transition-transform cursor-pointer">
      <div
        onClick={() => {
          dispatch(getProductBySlug(product.slug));
          navigate("/current-product");
        }}
        className="h-48 w-full p-4 object-cover relative"
      >
        <img
          src={product.image}
          alt={product.name}
          className=" h-full mx-auto object-cover mb-4 shadow-2xl shadow-coffe"
        />
      </div>
      <span className="text-sm border text-center  px-2 py-1 rounded-xl">
        {product.category.name}
      </span>
      <div className="flex justify-between">
        <div className=" text-lg font-semibold">{product.name}</div>
        <div
          onClick={() => {
            dispatch(addToFavourite(product));
            notify("Product added to favourites");
          }}
        >
          ❤️
        </div>
      </div>

      <div className="flex justify-between">
        <span className="flex ">
          {Array.from({ length: product.ratings }, (_, i) => (
            <span key={i} className="text-lg">
              ⭐
            </span>
          ))}{" "}
        </span>
        <span className="font-semibold">{product.ratings.toFixed(2)}</span>
      </div>
      <div className="text-lg font-bold text-center ">${product.price}</div>
      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success("Product added successfully");
        }}
        className="w-full flexCenter gap-x-2 bg-hightlight text-white py-2 px-4 rounded hover:bg-green-600"
      >
        <MdOutlineShoppingCart size={24} />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
