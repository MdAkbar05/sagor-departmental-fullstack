import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../features/orderSlice";

const Sales = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orderReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Filter orders for 'delivered' status
  const filteredOrders = orders
    ?.filter((order) => order.status === "Delivered")
    ?.filter((order) =>
      order.shippingDetails.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  // Sort orders based on sortOption
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

  return (
    <div className="sm:p-2 md:p-4 lg:p-6 w-full">
      <h2 className="text-3xl font-semibold mb-4">Sales</h2>

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

      {/* Sales Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Email/Phone</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : sortedOrders?.length ? (
              sortedOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2 border">
                    {order.shippingDetails.name}
                  </td>
                  <td className="px-4 py-2 border">
                    {order.user?.email || order.shippingDetails.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
