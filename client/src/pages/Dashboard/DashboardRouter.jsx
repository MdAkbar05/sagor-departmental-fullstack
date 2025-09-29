import React from "react";
import {
  MdDashboard,
  MdAnalytics,
  MdProductionQuantityLimits,
  MdPeopleAlt,
  MdCategory,
  MdCircleNotifications,
  MdAdminPanelSettings,
  MdMessage,
} from "react-icons/md";
import { GiBuyCard } from "react-icons/gi";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { FaSellsy } from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardRouter = () => {
  // get active loaction from use location
  const location = useLocation();

  const menu = [
    {
      label: "Dashboard",
      path: "/dashboard/dash",
      icon: <MdDashboard />,
    },
    {
      label: "Analytics",
      path: "/dashboard/analytics",
      icon: <MdAnalytics />,
    },
    {
      label: "Sales",
      path: "/dashboard/sales",
      icon: <FaSellsy />,
    },
  ];

  const management = [
    {
      label: "Users",
      path: "/dashboard/users",
      icon: <IoPeopleCircleOutline />,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <MdProductionQuantityLimits />,
    },
    {
      label: "Customers",
      path: "/dashboard/customers",
      icon: <MdPeopleAlt />,
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <GiBuyCard />,
    },
    {
      label: "Categories",
      path: "/dashboard/categories",
      icon: <MdCategory />,
    },
  ];

  const preperences = [
    {
      label: "Transactions",
      path: "/dashboard/transactions",
      icon: <AiOutlineTransaction />,
    },
    {
      label: "Notifications",
      path: "/dashboard/notifications",
      icon: <MdCircleNotifications />,
    },
    {
      label: "Messages",
      path: "/dashboard/messages",
      icon: <MdMessage />,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <MdAdminPanelSettings />,
    },
  ];

  return (
    <div className="container mx-auto bg-dashBG flex">
      <div className="min-w-44 min-h-fit bg-white m-4 text-dashText rounded-xl flex flex-col gap-6 float-left py-8 px-6 border-[0.4px] border-dashBorder overflow-hidden">
        {/* Menu Section  */}

        <div className="space-y-2">
          <h2 className="text-lg font-bold border-b">Menu</h2>
          {menu.map((nav) => (
            <Link
              key={nav.path}
              to={nav.path}
              className={`flex justify-start items-center gap-2 px-2 py-1 rounded-lg text-sm  font-sans font-semibold hover:bg-gray-200 ${
                location.pathname === nav.path
                  ? "  bg-dashActive hover:bg-slate-950  text-white"
                  : " text-gray-400 text-sm "
              }`}
            >
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          ))}
        </div>

        {/* Management Menu Section  */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold border-b">Management</h2>
          {management.map((nav) => (
            <Link
              key={nav.path}
              to={nav.path}
              className={`flex justify-start items-center gap-2 px-2 py-1 rounded-lg text-sm  font-sans font-semibold hover:bg-gray-200${
                location.pathname === nav.path
                  ? "  bg-dashActive hover:bg-black  text-white"
                  : " text-gray-400 text-sm "
              }`}
            >
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          ))}
        </div>

        {/* Preperences Menu Section  */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold border-b">Notifications</h2>
          {preperences.map((nav) => (
            <Link
              key={nav.path}
              to={nav.path}
              className={`flex justify-start items-center gap-2 px-2 py-1 rounded-lg text-sm  font-sans font-semibold hover:bg-gray-200${
                location.pathname === nav.path
                  ? "  bg-dashActive hover:bg-black  text-white"
                  : " text-gray-400 text-sm "
              }`}
            >
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardRouter;
