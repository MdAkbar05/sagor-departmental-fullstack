import React, { useEffect } from "react";
import title from "./imgs/title.png";
import cooking from "./imgs/cate1.svg";
import Beverages from "./imgs/cate2.svg";
import HomeCleaning from "./imgs/cate3.svg";
import PestControl from "./imgs/cate4.svg";
import StationeryOffice from "./imgs/cate5.svg";

const PopularCategory = () => {
  const data = [
    { title: "Cooking", img: cooking, item: 220, bg: "bg-[#E7A97F]" },
    { title: "Beverages", img: Beverages, item: 33, bg: "bg-[#FFECB4]" },
    {
      title: "Home & Cleaning",
      img: HomeCleaning,
      item: 70,
      bg: "bg-[#E7A97F]",
    },
    { title: "Pest & Control", img: PestControl, item: 46, bg: "bg-[#E0D8C9]" },
    {
      title: "Stationery & Office",
      img: StationeryOffice,
      item: 67,
      bg: "bg-[#E7A97F]",
    },
  ];
  return (
    <div className="bg-white py-16 mt-8 space-y-8">
      {/* Title  */}
      <img
        className="sm:hidden md:flex w-fit"
        src={title}
        alt="Popular Categories"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Popular Categories
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />
      <div className="grid sm:grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 justify-center px-6 mx-auto items-center">
        {/* map the data  */}
        <div className="mx-10 flexCenter flex-col p-2 gap-4text-black">
          <h2 className="text-black text-5xl font-bold text-center">
            Popular Categories
          </h2>
        </div>
        {data.map((d) => (
          <div
            className={`mx-10 flexCenter flex-col px-4 py-8 rounded-xl gap-4 ${d.bg} text-black cursor-pointer`}
          >
            <div className="p-2 rounded-full border border-dashed border-gray-500">
              <img src={d.img} alt={d.title} className="w-full h-full" />
            </div>
            <h2 className="text-black">{d.title}</h2>
            <p>{d.item} item</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
