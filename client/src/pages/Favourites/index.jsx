import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFavourite,
  removeFromFavourite,
} from "../../features/favouriteSlice";
import { addToCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favourites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);
  const { item } = useSelector((state) => state.favouriteReducer);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Favourites Page
      </h1>
      {item && item.length === 0 ? (
        <>
          <div className="text-center">Your favourite list is empty</div>
        </>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Remove</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {item.map((itm) => (
              <tr key={itm._id} className="border-t">
                <td className="p-2">
                  <img
                    className="w-20 h-20 rounded"
                    src={itm.image}
                    alt={itm.name}
                  />
                </td>
                <td className="p-2 text-center">{itm.name}</td>

                <td className="p-2 text-center">{itm.price}TK</td>

                <td className="p-2 text-center">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => dispatch(removeFromFavourite(itm._id))}
                  >
                    Remove
                  </button>
                </td>
                <td
                  onClick={() => {
                    dispatch(addToCart(itm));
                    notify(`Added ${itm.name} to Cart`);
                  }}
                  className="p-2 text-center cursor-pointer "
                >
                  <span className="bg-red-300 text-red-600 py-1.5 px-2.5 rounded-md">
                    Add to Cart
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <div className="flex items-center justify-around mx-16 mt-10 ">
          <div className="flex gap-4 ">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Continue Shopping
            </button>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  dispatch(clearFavourite());
                  notify("List clear successfully");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Clear favourite list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
