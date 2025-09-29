import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitOrder } from "../../features/orderSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cartReducer);
  const profile = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    name: profile.userName || "",
    address: profile.address || "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    dispatch(submitOrder({ cart, shippingDetails }));
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6 lg:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Shipping Details
          </h3>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingDetails.name}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingDetails.city}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingDetails.postalCode}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingDetails.country}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={shippingDetails.phoneNumber}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>
          <ul className="space-y-4">
            {cart.item.map((itm) => (
              <li key={itm.id} className="flex justify-between text-gray-700">
                <span>
                  {itm.name}{" "}
                  <span className="text-sm text-gray-500">
                    (x{itm.quantity})
                  </span>
                </span>
                <span>${(itm.price * itm.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold text-gray-700">
              <span>Total:</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
