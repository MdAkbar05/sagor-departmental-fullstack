import React from "react";
import { FaClock } from "react-icons/fa";
import title from "./imgs/title.png";

const BusinessHours = () => {
  const hours = [
    { day: "Monday", time: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
    { day: "Thursday", time: "9:00 AM - 6:00 PM" },
    { day: "Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 5:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <section className="bg-white mt-4 py-12 space-y-6">
      {/* Title  */}
      <img
        className="sm:hidden md:flex w-fit"
        src={title}
        alt="Business Hours"
      />
      <h2 className="sm:block md:hidden text-3xl font-bold text-primary text-center mb-8">
        Business Hours
      </h2>
      {/* Horizontal Line */}
      <hr className="sm:block md:hidden w-24 mx-auto border-primary border-2 mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hours.map((hour, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-primary transform hover:scale-105 transition-transform duration-300"
          >
            <FaClock size={36} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{hour.day}</h3>
            <p
              className={`text-lg ${
                hour.time === "Closed" ? "main-color" : "text-gray-600"
              }`}
            >
              {hour.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessHours;
