import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeQuantity,
  clearCart,
  removeFromCart,
} from "../../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Carts = () => {
  const { item, totalPrice, totalCount } = useSelector(
    (state) => state.cartReducer
  );
  const notify = (msg) => toast(msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIncrement = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(changeQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Cart Page</h1>
      {item && item.length === 0 ? (
        <>
          <div className="text-center">Your cart is empty</div>
        </>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Name</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
              <th className="py-2">Total</th>
              <th className="py-2">Remove</th>
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
                <td className="p-2 text-center">
                  <div className="flex items-center justify-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-l"
                      onClick={() => handleDecrement(itm._id, itm.quantity)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border">{itm.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-r"
                      onClick={() => handleIncrement(itm._id, itm.quantity)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-2 text-center">{itm.price}TK</td>
                <td className="p-2 text-center">
                  {itm.price * itm.quantity}TK
                </td>
                <td className="p-2 text-center">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemove(itm._id)}
                  >
                    Remove
                  </button>
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
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start justify-center">
            <h3 className="text-lg font-semibold">
              Total Price: {totalPrice}TK
            </h3>

            <h3 className="text-lg font-semibold">Total Items: {totalCount}</h3>
            <button
              onClick={() =>
                item.length == 0
                  ? toast.error(
                      "Your cart is empty. Please select products first."
                    )
                  : navigate("/checkout")
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
