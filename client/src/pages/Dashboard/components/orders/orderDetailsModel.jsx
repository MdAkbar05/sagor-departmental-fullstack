import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="mb-2">
          <strong>Order ID:</strong> {order._id}
        </p>
        <p className="mb-2">
          <strong>Customer Name:</strong> {order.shippingDetails.name}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {order.shippingDetails.address},{" "}
          {order.shippingDetails.city}, {order.shippingDetails.postalCode},{" "}
          {order.shippingDetails.country}
        </p>
        <p className="mb-2">
          <strong>Phone Number:</strong> {order.shippingDetails.phoneNumber}
        </p>
        <p className="mb-4">
          <strong>Total Price:</strong> {order.totalPrice.toFixed(2)}TK
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Items:</h3>
          <ul>
            {order.cartItems.map((item, index) => (
              <li key={index} className="mt-2">
                <span className="font-semibold">{item.name}</span> - Quantity:{" "}
                {item.quantity} - Price: {item.price.toFixed(2)}TK
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
