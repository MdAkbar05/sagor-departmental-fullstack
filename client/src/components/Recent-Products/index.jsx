import React, { useEffect } from "react";
import title from "./imgs/title.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/productSlice";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { MdOutlineShoppingCart } from "react-icons/md";

const RecentProduct = () => {
  const { products } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  // Sort products by createdAt field in descending order
  const sortedProducts = products
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 15);
  return (
    <div className="bg-white py-16 mt-8 space-y-8">
      {/* Title  */}
      <img
        className="sm:hidden md:flex w-fit"
        src={title}
        alt="Recent Products"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Recent Products
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />
      <div className="grid sm:grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-5 justify-center px-6 mx-auto items-center">
        {/* design card using image, category, name  rating, price and add to cart  */}
        {/* Design card using image, category, name, rating, price and add to cart */}
        {sortedProducts?.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow-md border-secondary bg-coffe space-y-2"
          >
            <div className="h-56 w-full p-4 object-cover relative">
              <img
                src={product.image}
                alt={product.name}
                className=" h-full mx-auto object-cover mb-4 shadow-2xl shadow-coffe"
              />
            </div>
            <div className="text-sm border inline-flex  px-2 py-1 rounded-xl mb-2">
              {product.category.name}
            </div>
            <h3 className="text-lg font-semibold ">{product.name}</h3>

            <div className="flex justify-between">
              <span className="flex ">
                {Array.from({ length: product.ratings }, (_, i) => (
                  <span key={i} className="text-lg">
                    ⭐
                  </span>
                ))}{" "}
              </span>
              <span className="font-semibold">
                {product.ratings.toFixed(2)}
              </span>
            </div>
            <div className="text-lg font-bold ">${product.price}</div>
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
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;
