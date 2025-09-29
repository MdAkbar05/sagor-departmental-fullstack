import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../features/usersSlice";
import { getProducts } from "../../../../features/productSlice";
import Charts from "./components/Charts";
import { getOrders } from "../../../../features/orderSlice";

const DashboardHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

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
    });
    dispatch(getOrders()).then(() => {
      setTotalOrders(orders?.length);
    });
  }, [dispatch, navigate, location]);

  return (
    <div className="p-4 md:p-8 lg:p-12 h-fit flex flex-col gap-8 w-full">
      <div className="text-center text-4xl font-semibold mb-8">
        E-commerce <span className="text-red-500">Dashboard</span> Panel
      </div>

      {/* Stats Boxes */}
      <div className="flex gap-8 flex-wrap">
        {/* Total Users */}
        <div className="bg-slate-50 p-6 rounded-lg shadow-md shadow-orange-200 text-lg">
          <div className="text-orange-600 mb-4 text-xl font-semibold">
            Total Users
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-3xl font-medium border-2 border-orange-500 rounded-full size-14 flexCenter p-4">
              {totalUsers}
            </span>
            <span className="text-gray-600">Total Registered accounts</span>
          </div>
          <Link to="/dashboard/users" className="text-orange-500 underline">
            View Details
          </Link>
        </div>

        {/* Stock Products */}
        <div className="bg-slate-50 p-6 rounded-lg shadow-md shadow-green-200 text-lg">
          <div className="text-green-600 mb-4 text-xl font-semibold">
            Stock Products
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500 text-3xl font-medium border-2 border-green-500 rounded-full size-14 flexCenter p-4">
              {totalProducts}
            </span>
            <span className="text-gray-600">
              Total stored products right now
            </span>
          </div>
          <Link to="/dashboard/products" className="text-green-500 underline">
            View Details
          </Link>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-50 p-6 rounded-lg shadow-md shadow-blue-200 text-lg">
          <div className="text-blue-600 mb-4 text-xl font-semibold">
            Total Orders
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 text-3xl font-medium border-2 border-blue-500 rounded-full size-14 flexCenter p-4">
              {totalOrders}
            </span>
            <span className="text-gray-600">Total orders from customers</span>
          </div>
          <Link to="/dashboard/orders" className="text-blue-500 underline">
            View Details
          </Link>
        </div>
      </div>

      {/* Charts */}
      <Charts />
    </div>
  );
};

export default DashboardHome;
