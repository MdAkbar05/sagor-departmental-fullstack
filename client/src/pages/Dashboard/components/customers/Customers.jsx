import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../features/orderSlice";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Importing icons for arrow

const Customers = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orderReducer);
  const [expanded, setExpanded] = useState(null); // To handle expanded details
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Filter and sort orders based on search and sort criteria
  const filteredOrders = orders?.filter((order) =>
    order.shippingDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = filteredOrders?.sort((a, b) => {
    if (sortOption === "name") {
      return a.shippingDetails.name.localeCompare(b.shippingDetails.name);
    }
    if (sortOption === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === "price") {
      return b.totalPrice - a.totalPrice;
    }
    return 0;
  });

  const toggleExpand = (orderId) => {
    setExpanded(expanded === orderId ? null : orderId); // Toggle expansion
  };

  return (
    <div className="sm:p-2 md:p-4 lg:p-6 w-full">
      <h2 className="text-3xl font-semibold mb-4">Customers</h2>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by customer name or email"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="name">Name</option>
          <option value="date">Order Date</option>
          <option value="price">Total Price</option>
        </select>
      </div>

      {/* Customer Listing */}
      <div className="space-y-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : sortedOrders?.length ? (
          sortedOrders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-md shadow transition-all"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(order._id)}
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {order.shippingDetails.name}
                  </h3>
                  <p className="text-gray-500">
                    {order.user?.email || order.shippingDetails.phoneNumber}
                  </p>
                </div>
                <div>
                  {expanded === order._id ? (
                    <FiChevronUp className="text-xl" />
                  ) : (
                    <FiChevronDown className="text-xl" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                  expanded === order._id ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="pt-4">
                  <p>
                    <strong>Phone:</strong> {order.shippingDetails.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingDetails.address},{" "}
                    {order.shippingDetails.city},{" "}
                    {order.shippingDetails.country} -{" "}
                    {order.shippingDetails.postalCode}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
