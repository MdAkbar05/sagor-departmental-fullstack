import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa"; // Importing icons for metrics
import RevenueChart from "./components/RevenueChart ";
import OrdersByRegionChart from "./components/OrdersByRegionChart";
import CustomerDemographicsChart from "./components/CustomerDemographicsChart ";
import MonthlyGrowthChart from "./components/MonthlyGrowthChart ";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../../../../features/usersSlice";
import { getProducts } from "../../../../features/productSlice";
import { getOrders } from "../../../../features/orderSlice";

const Analytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const { users } = useSelector((state) => state.usersReducer);
  const { products } = useSelector((state) => state.productsReducer);
  const { orders } = useSelector((state) => state.orderReducer);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers()).then(() => {
      setTotalUsers(users?.length);
    });
    dispatch(getProducts()).then(() => {
      setTotalProducts(products?.length);
      let renvue = 0;
      products?.forEach((product) => {
        console.log(product.price);
        renvue += product.price;
      });
      setTotalRevenue(renvue);
    });
    dispatch(getOrders()).then(() => {
      setTotalOrders(orders?.length);
    });
  }, [dispatch, navigate, location]);
  return (
    <div className="sm:p-2 md:p-4 lg:p-6 w-full">
      <h2 className="text-3xl font-semibold mb-6">Analytics Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Revenue */}
        <div
          onClick={() => navigate("/dashboard/products")}
          className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
        >
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold">{totalRevenue} TK</h3>
          </div>
          <FaDollarSign className="text-3xl text-green-500" />
        </div>

        {/* Total Orders */}
        <div
          onClick={() => navigate("/dashboard/orders")}
          className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
        >
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold">{totalOrders}</h3>
          </div>
          <FaShoppingCart className="text-3xl text-blue-500" />
        </div>

        {/* Total Customers */}
        <div
          onClick={() => navigate("/dashboard/users")}
          className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
        >
          <div>
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{totalUsers}</h3>
          </div>
          <FaUsers className="text-3xl text-purple-500" />
        </div>

        {/* Monthly Growth */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500">Monthly Growth</p>
            <h3 className="text-2xl font-bold">+15%</h3>
          </div>
          <FaChartLine className="text-3xl text-red-500" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Revenue Trend</h4>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            {/* Placeholder for Revenue Chart */}
            <p className="text-gray-400">
              <RevenueChart />
            </p>
          </div>
        </div>

        {/* Orders by Region Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Orders by Region</h4>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            {/* Placeholder for Orders by Region Chart */}
            <p className="text-gray-400">
              <OrdersByRegionChart />
            </p>
          </div>
        </div>
      </div>

      {/* Customer Demographics Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">Customer Demographics</h4>
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
          {/* Placeholder for Demographics Chart */}
          <p className="text-gray-400">
            <CustomerDemographicsChart />
          </p>
        </div>
      </div>

      {/* Customer Demographics Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">
          Customer Monthly Growth Chart
        </h4>
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
          {/* Placeholder for Demographics Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <MonthlyGrowthChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
