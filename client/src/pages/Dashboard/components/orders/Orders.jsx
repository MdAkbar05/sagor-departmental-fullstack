import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../../../../features/orderSlice";
import OrderDetailsModal from "./orderDetailsModel";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orderReducer);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // order by data picker
  useEffect(() => {
    let filtered = [...orders]; // Create a copy of the orders array

    if (selectedDate) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt).toDateString() ===
          new Date(selectedDate).toDateString()
      );
    }

    // Filter by search query (customer name)
    if (searchQuery) {
      filtered = filtered.filter((order) =>
        order.shippingDetails.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredOrders(filtered);
  }, [selectedDate, sortOrder, searchQuery, orders]);

  //  for Handle Model Popup
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    setStatusDropdown({}); // Close the dropdown after status update
  };

  const handleOpenDropdown = (orderId) => {
    setStatusDropdown({ [orderId]: true });
  };

  const handleCloseDropdown = () => {
    setStatusDropdown({});
  };

  return (
    <div className="container mx-auto p-4 h-fit min-h-[100vh]">
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>
      {status === "loading" && (
        <div className="text-center text-2xl">Loading...</div>
      )}
      {status === "failed" && (
        <div className="text-center text-2xl">Failed to load orders.</div>
      )}

      <div className="flex space-x-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by customer name"
          className="border px-2 py-1 rounded"
        />
      </div>
      <div className="flex">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Order ID
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Customer
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Total Price
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t border-gray-200">
                <td className="py-2 px-4 text-sm text-gray-700">{order._id}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.shippingDetails.name}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.totalPrice.toFixed(2)}TK
                </td>
                <td className="py-2 px-4 text-sm">
                  <span
                    className={`inline-block px-2 py-1 font-semibold text-sm rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => handleOpenDropdown(order._id)}
                      className="ml-4 text-green-500 hover:underline"
                    >
                      Update Status
                    </button>
                    {statusDropdown[order._id] && (
                      <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {[
                            "Pending",
                            "Processing",
                            "Delivered",
                            "Cancelled",
                          ].map((statusOption) => (
                            <button
                              key={statusOption}
                              onClick={() =>
                                handleStatusChange(order._id, statusOption)
                              }
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {statusOption}
                            </button>
                          ))}
                          <button
                            onClick={handleCloseDropdown}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for order details */}
      {isModalOpen && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Orders;
