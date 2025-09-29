// BottomBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const menu = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/products",
      display: "Categories",
    },
    {
      path: "/offers",
      display: "Offers",
    },
    {
      path: "/contact",
      display: "Contact",
    },
  ];
  const location = useLocation();
  return (
    <div className=" bg-secondary/60 backdrop-blur-md text-black">
      <div className="container mx-auto    flex items-center md:gap-6 sm:gap-2 ">
        <div className="flexCenter flex-1  md:gap-6 sm:gap-2">
          {menu.map((m) => (
            <Link
              to={m.path}
              className={`flexCenter  px-3 py-1 hover:text-white  transition-all duration-500 ${
                location.pathname === m.path ? " text-white " : "text-gray-900"
              }`}
              title={m.display}
            >
              {m.display}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
